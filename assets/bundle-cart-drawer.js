(function () {
  'use strict';

  function handleBundleRemove() {
    document.addEventListener('click', async (e) => {
      const removeBtn = e.target.closest('cart-remove-button[data-bundle-key]');
      if (!removeBtn) return;

      const bundleKey = removeBtn.dataset.bundleKey;
      if (!bundleKey) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      try {
        const res = await fetch('/cart.js');
        const cart = await res.json();

        const updates = {};
        cart.items.forEach(item => {
          if (item.properties && item.properties._bundleKey === bundleKey) {
            updates[item.key] = 0;
          }
        });

        await fetch('/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates }),
        });

        // Force reload the drawer to show changes
        if (window.location.pathname.includes('cart')) {
          window.location.reload();
        } else {
          // Standard Dawn/Sense refresh logic
          const drawer = document.querySelector('cart-drawer');
          if (drawer) drawer.renderContents(await (await fetch('/cart.js')).json());
          else window.location.reload();
        }
      } catch (err) {
        console.error('Bundle removal failed:', err);
      }
    }, true);
  }

  document.addEventListener('DOMContentLoaded', handleBundleRemove);
})();