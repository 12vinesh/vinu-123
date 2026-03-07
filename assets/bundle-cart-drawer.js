(function () {
  'use strict';

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.cart-bundle-remove');
    if (!btn) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    const bundleKey = btn.dataset.bundleKey;
    if (!bundleKey) return;

    btn.disabled = true;
    btn.style.opacity = '0.4';

    try {
      // Step 1: get all items with this bundle key
      const cart = await fetch('/cart.js').then(r => r.json());
      const updates = {};
      cart.items.forEach(item => {
        if (item.properties?._bundleKey === bundleKey) {
          updates[item.key] = 0;
        }
      });

      // Step 2: remove them and WAIT for confirmation
      const updated = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      }).then(r => r.json());

      console.log('cart after update:', updated.item_count, 'items');

      // Step 3: NOW refresh drawer with confirmed updated cart
      await refreshDrawer();

    } catch (err) {
      console.error('Bundle removal failed:', err);
      window.location.reload();
    }
  });

  async function refreshDrawer() {
    // Add timestamp to bust any cache
    const res = await fetch(`/?sections=cart-drawer&t=${Date.now()}`);
    const data = await res.json();
    const html = data['cart-drawer'];
    if (!html) { window.location.reload(); return; }

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const newInner = doc.querySelector('.drawer__inner');
    const curInner = document.querySelector('.drawer__inner');
    if (newInner && curInner) {
      curInner.innerHTML = newInner.innerHTML;
    } else {
      window.location.reload();
    }
  }

})();