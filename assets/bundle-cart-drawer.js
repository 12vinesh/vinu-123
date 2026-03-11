(function () {
  'use strict';

  const variantCache = {};
  let isHydrating = false;
  let hydrateTimer = null;

  // --- 1. HELPERS ---
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

  // --- 2. HYDRATION (The Core Fix) ---
  async function hydrateBundleItems() {
    // Stop if already running
    if (isHydrating) return;
    
    const bundleParents = document.querySelectorAll('[data-bundle-key]');
    if (!bundleParents.length) return;

    isHydrating = true;
    
    // Stop the observer so we don't trigger ourselves
    if (window.bundleObserver) window.bundleObserver.disconnect();

    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();

      for (const parentEl of bundleParents) {
        const bundleKey = parentEl.dataset.bundleKey;
        const pairsList = parentEl.querySelector('[data-bundle-pairs-list]');
        if (!pairsList || !bundleKey) continue;

        // Find the parent data
        const parentItem = cart.items.find(item => 
          item.properties?._bundleKey === bundleKey && item.properties?._isParent === 'true'
        );
        if (!parentItem) continue;

        // FIX: Wipe the list immediately before fetching variants
        pairsList.innerHTML = '<li class="loading-bundles" style="list-style:none; font-size:12px; opacity:0.6;">Updating items...</li>';

        const children = parseBundlePairs(parentItem.properties._bundle_pairs);
        const parentQty = parentItem.quantity || 1;
        const variants = await Promise.all(children.map(c => fetchVariant(c.variantId)));

        // Clear the "Updating..." message
        pairsList.innerHTML = '';

        children.forEach((child, index) => {
          const variant = variants[index];
          const li = document.createElement('li');
          li.className = 'bundle-pair-item';
          li.innerHTML = `
            <div class="bundle-pair-item__inner" style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
              <div class="bundle-pair-item__img-wrap">
                ${variant?.featured_image?.src ? `<img src="${variant.featured_image.src}" width="40" height="40" style="object-fit:cover;">` : ''}
              </div>
              <div class="bundle-pair-item__info">
                <div style="font-weight:bold; font-size:13px;">${child.quantity * parentQty} × ${variant?.product_title || 'Item'}</div>
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
      // Restart the observer
      const cartDrawer = document.querySelector('cart-drawer');
      if (cartDrawer && window.bundleObserver) {
        window.bundleObserver.observe(cartDrawer, { childList: true, subtree: true });
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
      btn.style.pointerEvents = 'none';

      try {
        const cart = await fetch('/cart.js').then(r => r.json());
        const item = cart.items.find(i => i.properties?._bundleKey === bundleKey && i.properties?._isParent === 'true');
        
        if (item) {
          await fetch('/cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: item.key, quantity: 0 })
          });
          
          // Force Dawn to update the drawer
          if (document.querySelector('cart-drawer')) {
             // This tells the Dawn theme to refresh itself
             document.querySelector('cart-drawer').classList.add('is-loading');
             window.location.reload(); // Simplest way to ensure clean state on remove
          }
        }
      } catch (err) { window.location.reload(); }
    });
  }

  // --- 4. INIT ---
  const debouncedHydrate = () => {
    clearTimeout(hydrateTimer);
    hydrateTimer = setTimeout(hydrateBundleItems, 400);
  };

  window.bundleObserver = new MutationObserver(debouncedHydrate);

  document.addEventListener('DOMContentLoaded', () => {
    handleBundleRemove();
    hydrateBundleItems();
    const drawer = document.querySelector('cart-drawer');
    if (drawer) window.bundleObserver.observe(drawer, { childList: true, subtree: true });
  });

  document.addEventListener('cart:updated', debouncedHydrate);
})();