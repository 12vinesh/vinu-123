(function () {
  'use strict';

  customElements.define('cart-remove-button', class extends HTMLElement {
    connectedCallback() {
      this.querySelector('a, button')?.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const bundleKey = this.dataset.bundleKey;

        if (bundleKey) {
          await removeBundleByKey(bundleKey);
        } else {
          // Fall back to default Dawn single-item removal
          const index = this.dataset.index;
          await fetch('/cart/change.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ line: index, quantity: 0 }),
          });
        }

        await refreshCartDrawer();
      });
    }
  });

  async function removeBundleByKey(bundleKey) {
    const res = await fetch('/cart.js');
    const cart = await res.json();

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

  async function refreshCartDrawer() {
    try {
      // Dawn's standard cart drawer refresh — triggers re-render via sections API
      const res = await fetch(`${window.Shopify.routes.root}?sections=cart-drawer`);
      const data = await res.json();
      const drawerEl = document.getElementById('CartDrawer');
      if (drawerEl && data['cart-drawer']) {
        const html = new DOMParser().parseFromString(data['cart-drawer'], 'text/html');
        drawerEl.innerHTML = html.querySelector('#CartDrawer').innerHTML;
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Cart refresh failed:', err);
      window.location.reload();
    }
  }
})();