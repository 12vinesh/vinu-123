(function () {
  'use strict';

  const variantCache = {};
  let isHydrating = false;
  let hydrateTimer = null;

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
      const res = await fetch('/cart.js');
      const cart = await res.json();
      cart.items.forEach(item => {
        if (item.properties?._isParent === 'true' && item.properties?._bundle_pairs) {
          const pairs = parseBundlePairs(item.properties._bundle_pairs);
          pairs.forEach(pair => fetchVariant(pair.variantId));
        }
      });
    } catch(e) {}
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

  async function getCartBundleChildren() {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    const groups = {};

    cart.items.forEach(item => {
      const isParent = item.properties?._isParent === 'true';
      const bundleKey = item.properties?._bundleKey;
      const rawPairs = item.properties?._bundle_pairs;
      if (!isParent || !bundleKey || !rawPairs) return;

      const children = parseBundlePairs(rawPairs);
      children.sort((a, b) => a.sortIndex - b.sortIndex);
      groups[bundleKey] = { children };
    });

    return groups;
  }

  async function hydrateBundleItems() {
    if (isHydrating) return;

    const bundleParents = document.querySelectorAll('[data-bundle-key]');
    if (!bundleParents.length) return;

    isHydrating = true;

    try {
      const groups = await getCartBundleChildren();

      for (const parentEl of bundleParents) {
        const bundleKey = parentEl.dataset.bundleKey;
        if (!bundleKey) continue;
      //CHANGE
      // If bundle items already exist, we still need to ensure the toggle works
      // because the cart drawer may have been re-rendered via AJAX
       if (parentEl.querySelector('.bundle-pair-item')) {
             initToggle(parentEl); // Reattach toggle click event
             continue; // Skip rebuilding bundle items again
        }

        const children = groups[bundleKey]?.children || [];
        const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
        const toggleBtn = parentEl.querySelector('[data-bundle-toggle]');

        if (!pairsList) continue;

        pairsList.innerHTML = '';

        if (toggleBtn) {
          toggleBtn.textContent = `Hide ${children.length} items ▲`;
          toggleBtn.setAttribute('aria-expanded', 'true');
        }

        const variants = await Promise.all(
          children.map(child => child.variantId ? fetchVariant(child.variantId) : null)
        );
        // Get parent cart quantity
        const res = await fetch('/cart.js').then(r => r.json());
        const parentCartItem = res.items.find(
           item => item.properties?._bundleKey === bundleKey && item.properties?._isParent === 'true'
           );
        const parentQty = parentCartItem?.quantity || 1;

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
       labelEl.textContent = `${child.quantity * parentQty} × ${variant?.product_title || 'Item'}`;//changed the hardcoded name to dynamic title fetching

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
  //CHANGE:
  function initToggle(cartItemEl) {
  const toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
  const pairsList = cartItemEl.querySelector('[data-bundle-pairs-list]');

  // Stop if required elements are missing
  if (!toggleBtn || !pairsList) return;

  // Prevent attaching the same event listener multiple times
  // because hydrateBundleItems() can run repeatedly
  if (toggleBtn.dataset.toggleInitialized === "true") return;

  // Mark toggle as initialized
  toggleBtn.dataset.toggleInitialized = "true";

  // Add click listener for show/hide behaviour
  toggleBtn.addEventListener('click', () => {

    // Check current state of toggle button
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

    // Count number of bundle items
    const pairCount = pairsList.querySelectorAll('.bundle-pair-item').length;

    if (isExpanded) {

      // Hide bundle items
      pairsList.style.display = 'none';

      // Update button text
      toggleBtn.textContent = `Show ${pairCount} items ▼`;

      // Update accessibility attribute
      toggleBtn.setAttribute('aria-expanded', 'false');

    } else {

      // Show bundle items
      pairsList.style.display = '';

      // Update button text
      toggleBtn.textContent = `Hide ${pairCount} items ▲`;

      // Update accessibility attribute
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });
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

        const parentItem = cart.items.find(
          item => item.properties?._bundleKey === bundleKey
            && item.properties?._isParent === 'true'
        );

        if (!parentItem) return;

        // Remove item and fetch new section in parallel — faster!
        await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: parentItem.key, quantity: 0 }),
        });

        // Single section fetch after removal
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

        // Check empty state from section HTML (no extra fetch needed)
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
//Changes
  function debouncedHydrate() {
  clearTimeout(hydrateTimer);
  hydrateTimer = setTimeout(() => {
    isHydrating = false; // ← ADD THIS: reset guard before each debounced call
    hydrateBundleItems();
  }, 400); // ← slightly longer to ensure drawer HTML is fully painted
}
// Listen for Dawn's custom cart update events
document.addEventListener('cart:updated', () => {
  isHydrating = false;
  debouncedHydrate();
});

// Also hook into drawer open — Dawn dispatches this
document.addEventListener('drawer:open', () => {
  isHydrating = false;
  debouncedHydrate();
});

  document.addEventListener('DOMContentLoaded', () => {
    preloadAllBundleImages();
    hydrateBundleItems();
    handleBundleRemove();
  });

  const observer = new MutationObserver(debouncedHydrate);
  observer.observe(document.body, { childList: true, subtree: true });

})();