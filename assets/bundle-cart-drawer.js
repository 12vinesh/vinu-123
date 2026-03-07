(function () {
  'use strict';

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.cart-bundle-remove');
    if (!btn) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const bundleKey = btn.dataset.bundleKey;
    if (!bundleKey) return;

    btn.textContent = 'Removing...';
    btn.disabled = true;

    try {
      const cart = await fetch('/cart.js').then(r => r.json());

      const updates = {};
      cart.items.forEach(item => {
        if (item.properties?._bundleKey === bundleKey) {
          updates[item.key] = 0;
        }
      });

      await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });

      // Simple reload — no race conditions, no DOM swapping
      window.location.reload();

    } catch (err) {
      console.error('Bundle removal failed:', err);
      window.location.reload();
    }
  });

})();