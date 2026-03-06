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
        if (item.properties?._isChild === 'true') {
          fetchVariant(item.variant_id);
        }
      });
    } catch(e) {}
  }

  async function getCartBundleChildren() {
    const res = await fetch('/cart.js');
    const cart = await res.json();
    const groups = {};

    cart.items.forEach(item => {
      const bundleKey = item.properties?._bundleKey;
      const isChild = item.properties?._isChild === 'true';
      if (!bundleKey || !isChild) return;
      if (!groups[bundleKey]) groups[bundleKey] = { children: [] };
      groups[bundleKey].children.push({
        variantId: item.variant_id,
        pairLabel: item.properties?._pairLabel || '',
        title: item.title,
      });
    });

    return groups;
  }

  async function hydrateBundleItems() {
    // Prevent concurrent runs
    if (isHydrating) return;

    const bundleParents = document.querySelectorAll('.cart-item--bundle');
    if (!bundleParents.length) return;

    // Check if already hydrated — skip if all parents already have children rendered
    const alreadyDone = Array.from(bundleParents).every(el =>
      el.querySelector('.bundle-pair-item') !== null
    );
    if (alreadyDone) return;

    isHydrating = true;

    try {
      const groups = await getCartBundleChildren();

      for (const parentEl of bundleParents) {
        const bundleKey = parentEl.dataset.bundleKey;
        if (!bundleKey) continue;

        // Skip if already hydrated
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
          children.map(child => fetchVariant(child.variantId))
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

          const label = document.createElement('span');
          label.className = 'bundle-pair-item__label';
          label.textContent = `${child.pairLabel}:`;

          const value = document.createElement('span');
          value.className = 'bundle-pair-item__value';
          value.textContent = ` ${variant?.title || child.title}`;

          info.appendChild(label);
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

  function debouncedHydrate() {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(() => {
      hydrateBundleItems();
    }, 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    preloadAllBundleImages();
    hydrateBundleItems();
  });

  // Debounced observer — prevents multiple rapid fires
  const observer = new MutationObserver(debouncedHydrate);
  observer.observe(document.body, { childList: true, subtree: true });

})();