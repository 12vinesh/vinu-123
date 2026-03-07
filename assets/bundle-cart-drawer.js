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
      const cart = await fetch('/cart.js').then(r => r.json());

      const updates = {};
      cart.items.forEach(item => {
        if (item.properties?._bundleKey === bundleKey) {
          updates[item.key] = 0;
        }
      });

      // Wait for update AND use its response — no race condition
      const updatedCart = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      }).then(r => r.json());

      console.log('items remaining:', updatedCart.item_count);

      // Fetch section AFTER update is confirmed
      const sectionRes = await fetch(`/?sections=cart-drawer&t=${Date.now()}`);
      const sectionData = await sectionRes.json();
      const html = sectionData['cart-drawer'];

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const newInner = doc.querySelector('.drawer__inner');
      const curInner = document.querySelector('.drawer__inner');

      if (newInner && curInner) {
        curInner.innerHTML = newInner.innerHTML;
      }

      // Update cart count bubble in header
      const newBubble = doc.querySelector('.cart-count-bubble');
      const curBubble = document.querySelector('.cart-count-bubble');
      if (newBubble && curBubble) curBubble.innerHTML = newBubble.innerHTML;
      if (!newBubble && curBubble) curBubble.innerHTML = '';

    } catch (err) {
      console.error('Bundle removal failed:', err);
    }
  });

})();