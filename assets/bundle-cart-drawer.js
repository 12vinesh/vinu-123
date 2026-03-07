(function () {
  'use strict';

  // Intercept customElements.define to patch CartRemoveButton before it registers
  const originalDefine = customElements.define.bind(customElements);

  customElements.define = function (name, constructor, options) {
    if (name === 'cart-remove-button') {
      const PatchedClass = class extends constructor {
        constructor() {
          super(); // This runs Dawn's constructor + its click listener

          // Now add OUR listener — runs after Dawn's
          this.addEventListener('click', async (e) => {
            const bundleKey = this.dataset.bundleKey;
            if (!bundleKey) return; // Not a bundle, let Dawn handle it

            e.preventDefault();
            e.stopImmediatePropagation();

            try {
              await removeBundleItems(bundleKey);
              await refreshDrawer();
            } catch (err) {
              console.error('Bundle removal failed:', err);
              window.location.reload();
            }
          });
        }
      };

      return originalDefine(name, PatchedClass, options);
    }

    return originalDefine(name, constructor, options);
  };

  async function removeBundleItems(bundleKey) {
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
  }

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