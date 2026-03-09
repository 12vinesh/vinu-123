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

        if (parentEl.querySelector('.bundle-pair-item')) continue;

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
        labelEl.textContent = `${child.quantity * parentQty} × Stepzz Grip Socks`;

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

  function initToggle(cartItemEl) {
    const toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
    const pairsList = cartItemEl.querySelector('[data-bundle-pairs-list]');
    if (!toggleBtn || !pairsList) return;

    const newBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newBtn, toggleBtn);

    newBtn.addEventListener('click', () => {
      const isExpanded = newBtn.getAttribute('aria-expanded') === 'true';
      const pairCount = pairsList.querySelectorAll('.bundle-pair-item').length;
      if (isExpanded) {
        pairsList.style.display = 'none';
        newBtn.textContent = `Show ${pairCount} items ▼`;
        newBtn.setAttribute('aria-expanded', 'false');
      } else {
        pairsList.style.display = '';
        newBtn.textContent = `Hide ${pairCount} items ▲`;
        newBtn.setAttribute('aria-expanded', 'true');
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

  function debouncedHydrate() {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(() => hydrateBundleItems(), 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    preloadAllBundleImages();
    hydrateBundleItems();
    handleBundleRemove();
  });

  const observer = new MutationObserver(debouncedHydrate);
  observer.observe(document.body, { childList: true, subtree: true });

})();