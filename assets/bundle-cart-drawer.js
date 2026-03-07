(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', async (e) => {
      // Target the anchor/button inside cart-remove-button that has a bundle key
      const removeBtn = e.target.closest('cart-remove-button');
      if (!removeBtn) return;

      const bundleKey = removeBtn.dataset.bundleKey;
      if (!bundleKey) return; // Let Dawn handle non-bundle removes normally

      e.preventDefault();
      e.stopImmediatePropagation();

      try {
        // 1. Fetch current cart
        const cartRes = await fetch('/cart.js');
        const cart = await cartRes.json();

        // 2. Build updates object - zero out all items sharing this bundleKey
        const updates = {};
        cart.items.forEach(item => {
          if (item.properties && item.properties._bundleKey === bundleKey) {
            updates[item.key] = 0;
          }
        });

        // 3. Remove all bundle items
        await fetch('/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates }),
        });

        // 4. Re-render drawer using Shopify's Section Rendering API
        await refreshDrawer();

      } catch (err) {
        console.error('Bundle removal failed:', err);
        window.location.reload();
      }

    }, true); // <-- capture phase: fires BEFORE Dawn's bubble-phase listener
  });

  async function refreshDrawer() {
    const sectionId = 'cart-drawer'; // Must match your section file name
    const url = `${window.location.origin}/?sections=${sectionId}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data[sectionId]) {
      window.location.reload();
      return;
    }

    // Parse the returned HTML and swap the inner drawer content
    const parser = new DOMParser();
    const doc = parser.parseFromString(data[sectionId], 'text/html');

    const newDrawer = doc.querySelector('#CartDrawer');
    const currentDrawer = document.querySelector('#CartDrawer');

    if (newDrawer && currentDrawer) {
      currentDrawer.innerHTML = newDrawer.innerHTML;
    }

    // Also update the cart count bubble if present
    const newCount = doc.querySelector('.cart-count-bubble');
    const currentCount = document.querySelector('.cart-count-bubble');
    if (newCount && currentCount) {
      currentCount.innerHTML = newCount.innerHTML;
    }
  }

})();