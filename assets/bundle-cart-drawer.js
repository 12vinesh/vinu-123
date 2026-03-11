/**
 * Shopify Cart Bundle Hydrator
 * High-performance version: Listens to Dawn's internal render events.
 */
(function () {
  'use strict';

  const variantCache = {};
  let isHydrating = false;
  let hydrateTimer = null;

  // --- 1. DATA FETCHING ---
  async function fetchVariant(variantId) {
    if (variantCache[variantId]) return variantCache[variantId];
    try {
      const res = await fetch(`/variants/${variantId}.js`);
      const data = await res.json();
      variantCache[variantId] = data;
      return data;
    } catch (e) { return null; }
  }

  function parseBundlePairs(raw) {
    if (!raw) return [];
    return raw.split('|').map(p => p.trim()).filter(Boolean).map(part => {
      const match = part.match(/^(gid:\/\/shopify\/ProductVariant\/\d+):(\d+):(.+)$/);
      if (!match) return null;
      return {
        variantId: match[1].split('/').pop(),
        quantity: parseInt(match[2]) || 1,
        label: match[3]
      };
    }).filter(Boolean);
  }

  // --- 2. HYDRATION (THE BUILDER) ---
  async function hydrateBundleItems() {
    // Only allow one instance of this function to run at a time
    if (isHydrating) return;
    
    const bundleParents = document.querySelectorAll('[data-bundle-key]');
    if (!bundleParents.length) return;

    isHydrating = true;

    // Disconnect observer while we work to prevent the "Multiplying Socks" bug
    if (window.bundleObserver) window.bundleObserver.disconnect();

    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();

      for (const parentEl of bundleParents) {
        const bundleKey = parentEl.dataset.bundleKey;
        const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
        if (!pairsList || !bundleKey) continue;

        const parentItem = cart.items.find(item => 
          item.properties?._bundleKey === bundleKey && item.properties?._isParent === 'true'
        );
        if (!parentItem) continue;

        // Immediately clear to prevent duplicates
        pairsList.innerHTML = '';

        const children = parseBundlePairs(parentItem.properties._bundle_pairs);
        const parentQty = parentItem.quantity || 1;
        
        // Fetch variants in parallel (Fastest)
        const variants = await Promise.all(children.map(c => fetchVariant(c.variantId)));

        children.forEach((child, index) => {
          const variant = variants[index];
          const li = document.createElement('li');
          li.className = 'bundle-pair-item';
          li.style.listStyle = 'none';
          li.innerHTML = `
            <div class="bundle-pair-item__inner" style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <div class="bundle-pair-item__img-wrap" style="flex-shrink:0;">
                ${variant?.featured_image?.src 
                  ? `<img src="${variant.featured_image.src}" width="40" height="40" style="object-fit:cover; border-radius:4px;">` 
                  : ''}
              </div>
              <div class="bundle-pair-item__info">
                <div style="font-weight:600; font-size:12px;">${child.quantity * parentQty} × ${variant?.product_title || 'Item'}</div>
                <div style="font-size:11px; opacity:0.7;">${variant?.title || ''}</div>
              </div>
            </div>
          `;
          pairsList.appendChild(li);
        });

        initToggle(parentEl);
      }
    } catch (e) {
      console.error("Bundle Display Error:", e);
    } finally {
      isHydrating = false;
      // Re-enable the observer
      const drawer = document.querySelector('cart-drawer');
      if (drawer && window.bundleObserver) {
        window.bundleObserver.observe(drawer, { childList: true, subtree: true });
      }
    }
  }

  // --- 3. TOGGLE & REMOVE ---
  function initToggle(parentEl) {
    const btn = parentEl.querySelector('[data-bundle-toggle]');
    const list = parentEl.querySelector('[data-bundle-pairs-list]');
    if (!btn || !list || btn.dataset.bound === "true") return;

    btn.dataset.bound = "true";
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = list.style.display === 'none';
      list.style.display = isHidden ? '' : 'none';
      btn.textContent = isHidden ? 'Hide items ▲' : `Show items ▼`;
    });
  }

  function handleBundleRemove() {
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('.cart-bundle-remove[data-bundle-key]');
      if (!btn) return;

      e.preventDefault();
      const bundleKey = btn.dataset.bundleKey;
      btn.innerHTML = 'Removing...';

      try {
        const cart = await fetch('/cart.js').then(r => r.json());
        const item = cart.items.find(i => i.properties?._bundleKey === bundleKey && i.properties?._isParent === 'true');
        
        if (item) {
          await fetch('/cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.key, quantity: 0 })
          });
          // Reload page on removal to ensure everything is clean
          window.location.reload();
        }
      } catch (err) { window.location.reload(); }
    });
  }

  // --- 4. INITIALIZATION & RE-RENDER HOOKS ---
  const debouncedHydrate = () => {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(hydrateBundleItems, 100); // Shorter delay for snappier feel
  };

  window.bundleObserver = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0)) {
      debouncedHydrate();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    handleBundleRemove();
    hydrateBundleItems();

    const drawer = document.querySelector('cart-drawer');
    if (drawer) {
      window.bundleObserver.observe(drawer, { childList: true, subtree: true });
      
      /**
       * CRITICAL FIX: Dawn Theme Hook
       * This triggers when the cart drawer re-renders after an "Add to Cart" click
       */
      drawer.addEventListener('render-contents', () => {
        isHydrating = false; // Reset guard
        debouncedHydrate();
      });
    }
  });

  // Event listeners for theme-specific updates
  document.addEventListener('cart:updated', debouncedHydrate);
  document.addEventListener('drawer:open', debouncedHydrate);

})();