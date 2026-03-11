(function () {
  'use strict';

  const variantCache = {};
  let isHydrating = false;
  let hydrateTimer = null;
  let cartDrawer = null; // FIX 1: declare here, assign in DOMContentLoaded

  // FIX 2: Safe observer helpers to avoid ReferenceError on first run
  function safeObserverDisconnect() {
    try { observer.disconnect(); } catch (e) {}
  }
  function safeObserverReconnect() {
    try {
      if (cartDrawer) observer.observe(cartDrawer, { childList: true, subtree: true });
    } catch (e) {}
  }

  async function fetchVariant(variantId) {
    if (variantCache[variantId]) return variantCache[variantId];
    try {
      const res = await fetch(`/variants/${variantId}.js`);
      const data = await res.json();
      variantCache[variantId] = data;
      return data;
    } catch (e) {
      return null;
    }
  }

  async function preloadAllBundleImages() {
    try {
     
      cart.items.forEach(item => {
        if (item.properties?._isParent === 'true' && item.properties?._bundle_pairs) {
          const pairs = parseBundlePairs(item.properties._bundle_pairs);
          pairs.forEach(pair => fetchVariant(pair.variantId));
        }
      });
    } catch (e) {}
  }

  function getPairSortIndex(label) {
    if (!label) return 999;
    const lower = label.toLowerCase();
    if (lower.includes('free')) return 998;
    const match = lower.match(/(\d+)/);
    return match ? parseInt(match[1]) : 997;
  }

  function parseBundlePairs(raw) {
    if (!raw) return [];
    return raw
      .split('|')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => {
        const gidMatch = part.match(/^(gid:\/\/shopify\/ProductVariant\/\d+):(\d+):(.+)$/);
        if (!gidMatch) return null;
        const fullGid = gidMatch[1];
        const quantity = parseInt(gidMatch[2]) || 1;
        const label = gidMatch[3];
        const numericId = fullGid.split('/').pop();
        return {
          variantId: numericId,
          quantity,
          label,
          sortIndex: getPairSortIndex(label)
        };
      })
      .filter(Boolean);
  }

  async function hydrateBundleItems() {
  if (isHydrating) return;

  const bundleParents = document.querySelectorAll('[data-bundle-key]');
  if (!bundleParents.length) return;

  isHydrating = true;
 

  try {
    for (const parentEl of bundleParents) {
      const bundleKey = parentEl.dataset.bundleKey;
      if (!bundleKey) continue;

      // ✅ Read everything from DOM — zero fetches
      const rawPairs = parentEl.dataset.bundlePairs;
      const parentQty = parseInt(parentEl.dataset.bundleQty) || 1;
      const children = parseBundlePairs(rawPairs || '');

      const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
      const toggleBtn = parentEl.querySelector('[data-bundle-toggle]');
      if (!pairsList) continue;

      pairsList.innerHTML = '';

      if (toggleBtn) {
        toggleBtn.textContent = `Hide ${children.length} items ▲`;
        toggleBtn.setAttribute('aria-expanded', 'true');
      }

      // ✅ Only fetch variant images — these are cached after first load
      const variants = await Promise.all(
        children.map(child => child.variantId ? fetchVariant(child.variantId) : null)
      );

      children.forEach((child, index) => {
        const variant = variants[index];
        const li = document.createElement('li');
        li.className = 'bundle-pair-item';

        const inner = document.createElement('div');
        inner.className = 'bundle-pair-item__inner';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'bundle-pair-item__img-wrap';

        if (variant?.featured_image?.src) {
          const img = document.createElement('img');
          img.src = variant.featured_image.src;
          img.alt = variant.title || '';
          img.width = 40;
          img.height = 40;
          img.loading = 'eager';
          img.className = 'bundle-pair-item__img';
          imgWrap.appendChild(img);
        }

        const info = document.createElement('div');
        info.className = 'bundle-pair-item__info';

        const labelEl = document.createElement('span');
        labelEl.className = 'bundle-pair-item__label';
        labelEl.textContent = `${child.quantity * parentQty} × ${variant?.product_title || 'Stepzz Grip Socks'}`;

        const value = document.createElement('span');
        value.className = 'bundle-pair-item__value';
        value.textContent = variant?.title || '';

        info.appendChild(labelEl);
        info.appendChild(value);
        inner.appendChild(imgWrap);
        inner.appendChild(info);
        li.appendChild(inner);
        pairsList.appendChild(li);
      });

      initToggle(parentEl);
    }
  } finally {
    isHydrating = false;

  }
}
  // FIX 5: Extract listener logic into standalone helper
  function attachToggleListener(btn, pairsList) {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const pairCount = pairsList.querySelectorAll('.bundle-pair-item').length;
      if (isExpanded) {
        pairsList.style.display = 'none';
        btn.textContent = `Show ${pairCount} items ▼`;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        pairsList.style.display = '';
        btn.textContent = `Hide ${pairCount} items ▲`;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // FIX 5: Clone button to strip stale listeners after DOM re-renders
  function initToggle(cartItemEl) {
    let toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
    const pairsList = cartItemEl.querySelector('[data-bundle-pairs-list]');

    if (!toggleBtn || !pairsList) return;

    if (toggleBtn.dataset.toggleInitialized === 'true') {
      // Replace with a fresh clone to strip any stale event listeners
      const fresh = toggleBtn.cloneNode(true);
      fresh.removeAttribute('data-toggle-initialized');
      toggleBtn.replaceWith(fresh);
      toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
      if (!toggleBtn) return;
    }

    toggleBtn.dataset.toggleInitialized = 'true';
    attachToggleListener(toggleBtn, pairsList);
  }

  function handleBundleRemove() {
    document.addEventListener('click', async (e) => {
      const removeBtn = e.target.closest('.cart-bundle-remove[data-bundle-key]');
      if (!removeBtn) return;

      const bundleKey = removeBtn.dataset.bundleKey;
      if (!bundleKey) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      removeBtn.innerHTML = '<span style="opacity:0.4">⏳</span>';
      removeBtn.disabled = true;

      try {
        const cart = await fetch('/cart.js').then(r => r.json());

        // FIX 4: Remove ALL items belonging to this bundle (parent + children)
        const bundleItems = cart.items.filter(
          item => item.properties?._bundleKey === bundleKey
        );

        if (!bundleItems.length) return;

        const updates = {};
        bundleItems.forEach(item => {
          updates[item.key] = 0;
        });

        await fetch('/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates }),
        });

        const html = await fetch('/?section_id=cart-drawer').then(r => r.text());
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newInner = doc.querySelector('.drawer__inner');
        const oldInner = document.querySelector('.drawer__inner');
        if (newInner && oldInner) oldInner.innerHTML = newInner.innerHTML;

        const newCount = doc.querySelector('.cart-count-bubble');
        const oldCount = document.querySelector('.cart-count-bubble');
        if (newCount && oldCount) oldCount.innerHTML = newCount.innerHTML;
        else if (oldCount) oldCount.innerHTML = '';

        const cartDrawerEl = document.querySelector('cart-drawer');
        const isEmpty = !doc.querySelector('.cart-item');

        if (isEmpty && cartDrawerEl) {
          cartDrawerEl.classList.add('is-empty');
        } else {
          cartDrawerEl?.classList.remove('is-empty');
          hydrateBundleItems();
        }

      } catch (err) {
        console.error('Bundle remove error:', err);
        window.location.reload();
      }
    }, true);
  }

  // FIX 3: Removed `isHydrating = false` from here — only `finally` block should reset it
  function debouncedHydrate() {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(() => {
      hydrateBundleItems();
    }, 150);
  }

  // FIX 3: Removed `isHydrating = false` resets from event listeners
  document.addEventListener('cart:updated', () => {
    debouncedHydrate();
  });

  document.addEventListener('drawer:open', () => {
    debouncedHydrate();
  });
   
  document.addEventListener('cart:rendered', () => {
  debouncedHydrate();
   });
   //CHANGE:
  // FIX 1: All DOM-dependent setup moved inside DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
  preloadAllBundleImages();
  hydrateBundleItems();
  handleBundleRemove();

  cartDrawer = document.querySelector('cart-drawer');
  if (cartDrawer) {
    observer.observe(cartDrawer, { childList: true, subtree: true });
  } else {
    // Fallback: watch for cart-drawer being added later
    const bodyObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.matches?.('cart-drawer')) {
            cartDrawer = node;
            observer.observe(cartDrawer, { childList: true, subtree: true });
            bodyObserver.disconnect();
            debouncedHydrate();
            return;
          }
        }
      }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
});

  // Declare observer at module level (used by safe helpers above), but attach in DOMContentLoaded
  const observer = new MutationObserver((mutations) => {
  if(isHydrating) return;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      debouncedHydrate();
      break;
    }
  }
});
})();