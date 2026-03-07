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
    btn.style.opacity = '0.5';

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

      await refreshDrawer();

    } catch (err) {
      console.error('Bundle removal failed:', err);
      window.location.reload();
    }
  });

  async function refreshDrawer() {
    const res = await fetch('/?sections=cart-drawer');
    const data = await res.json();
    const html = data['cart-drawer'];
    if (!html) { window.location.reload(); return; }

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const newInner = doc.querySelector('.drawer__inner');
    const curInner = document.querySelector('.drawer__inner');
    if (newInner && curInner) curInner.innerHTML = newInner.innerHTML;

    const newBadge = doc.querySelector('.cart-count-bubble');
    const curBadge = document.querySelector('.cart-count-bubble');
    if (newBadge && curBadge) curBadge.innerHTML = newBadge.innerHTML;
  }

})();