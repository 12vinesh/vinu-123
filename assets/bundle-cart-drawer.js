(function () {
  'use strict';

  const variantCache = {};
  let isHydrating = false;
  let hydrateTimer = null;

  // --- 1. SET UP THE OBSERVER EARLY ---
  // We define it here so we can disconnect/reconnect it easily
  const debouncedHydrate = () => {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(() => {
      hydrateBundleItems();
    }, 400);
  };

  const observer = new MutationObserver(debouncedHydrate);
  const cartDrawer = document.querySelector('cart-drawer');

  // --- 2. HELPER FUNCTIONS ---
  async function fetchVariant(variantId) {
    if (variantCache[variantId]) return variantCache[variantId];
    try {
      const res = await fetch(`/variants/${variantId}.js`);
      const data = await res.json();
      variantCache[variantId] = data;
      return data;
    } catch (e) { return null; }
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
    return raw.split('|').map(part => part.trim()).filter(Boolean).map(part => {
      const gidMatch = part.match(/^(gid:\/\/shopify\/ProductVariant\/\d+):(\d+):(.+)$/);
      if (!gidMatch) return null;
      return {
        variantId: gidMatch[1].split('/').pop(),
        quantity: parseInt(gidMatch[2]) || 1,
        label: gidMatch[3],
        sortIndex: getPairSortIndex(gidMatch[3])
      };
    }).filter(Boolean);
  }

  async function getCartBundleChildren() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      const groups = {};
      cart.items.forEach(item => {
        if (item.properties?._isParent === 'true' && item.properties?._bundleKey) {
          const children = parseBundlePairs(item.properties._bundle_pairs);
          children.sort((a, b) => a.sortIndex - b.sortIndex);
          groups[item.properties._bundleKey] = { children, parentQty: item.quantity };
        }
      });
      return groups;
    } catch (e) { return {}; }
  }

  // --- 3. THE CORE FIX: HYDRATION ---
  async function hydrateBundleItems() {
    // If we are already busy, don't start again
    if (isHydrating) return;
    
    const bundleParents = document.querySelectorAll('[data-bundle-key]');
    if (!bundleParents.length) return;

    isHydrating = true;

    // IMPORTANT: Stop the observer while we modify the DOM
    // This prevents the "Infinite Loop" and the multiplying products
    if (observer) observer.disconnect();

    try {
      const groups = await getCartBundleChildren();

      for (const parentEl of bundleParents) {
        const bundleKey = parentEl.dataset.bundleKey;
        const groupData = groups[bundleKey];
        if (!groupData) continue;

        const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
        if (!pairsList) continue;

        // FIX: Always clear the list before adding items
        pairsList.innerHTML = '';

        const variants = await Promise.all(
          groupData.children.map(child => fetchVariant(child.variantId))
        );

        groupData.children.forEach((child, index) => {
          const variant = variants[index];
          const li = document.createElement('li');
          li.className = 'bundle-pair-item';
          
          // Generate the HTML for the child product
          li.innerHTML = `
            <div class="bundle-pair-item__inner">
              <div class="bundle-pair-item__img-wrap">
                ${variant?.featured_image?.src ? `<img src="${variant.featured_image.src}" width="40" height="40" class="bundle-pair-item__img">` : ''}
              </div>
              <div class="bundle-pair-item__info">
                <span class="bundle-pair-item__label">${child.quantity * groupData.parentQty} × ${variant?.product_title || 'Product'}</span>
                <span class="bundle-pair-item__value">${variant?.title || ''}</span>
              </div>
            </div>
          `;
          pairsList.appendChild(li);
        });

        initToggle(parentEl);
      }
    } finally {
      isHydrating = false;
      // RESTART the observer now that we are done cleaning
      if (cartDrawer) {
        observer.observe(cartDrawer, { childList: true, subtree: true });
      }
    }
  }

  function initToggle(cartItemEl) {
    const toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
    const pairsList = cartItemEl.querySelector('[data-bundle-pairs-list]');
    if (!toggleBtn || !pairsList || toggleBtn.dataset.toggleInitialized === "true") return;

    toggleBtn.dataset.toggleInitialized = "true";
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      const pairCount = pairsList.querySelectorAll('.bundle-pair-item').length;
      
      pairsList.style.display = isExpanded ? 'none' : '';
      toggleBtn.textContent = isExpanded ? `Show ${pairCount} items ▼` : `Hide ${pairCount} items ▲`;
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // --- 4. EVENT LISTENERS ---
  document.addEventListener('DOMContentLoaded', () => {
    hydrateBundleItems();
    
    // Start observing the drawer for changes
    if (cartDrawer) {
      observer.observe(cartDrawer, { childList: true, subtree: true });
    }
  });

  // Listen for Shopify Dawn events
  document.addEventListener('cart:updated', () => {
    isHydrating = false; // Reset guard to allow a fresh update
    debouncedHydrate();
  });
})();