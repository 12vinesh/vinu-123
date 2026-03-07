(function () {
  'use strict';

  function patchCartRemoveButton() {
    const originalClass = customElements.get('cart-remove-button');
    if (!originalClass) {
      // Not defined yet, retry
      setTimeout(patchCartRemoveButton, 50);
      return;
    }

    // Patch the connectedCallback
    const originalConnected = originalClass.prototype.connectedCallback;

    originalClass.prototype.connectedCallback = function () {
      const bundleKey = this.dataset.bundleKey;

      if (bundleKey) {
        // Our own handler — skip Dawn's entirely
        this.querySelector('a')?.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          await removeBundleItems(bundleKey);
          await refreshDrawer();
        });
      } else {
        // Not a bundle item — run Dawn's original logic
        if (originalConnected) originalConnected.call(this);
      }
    };
  }

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
    try {
      const res = await fetch('/?sections=cart-drawer');
      const data = await res.json();

      const sectionHTML = data['cart-drawer'];
      if (!sectionHTML) { window.location.reload(); return; }

      const doc = new DOMParser().parseFromString(sectionHTML, 'text/html');

      // Swap drawer contents
      const newInner = doc.querySelector('.drawer__inner');
      const curInner = document.querySelector('.drawer__inner');
      if (newInner && curInner) curInner.innerHTML = newInner.innerHTML;

      // Update cart count badge
      const newBadge = doc.querySelector('.cart-count-bubble');
      const curBadge = document.querySelector('.cart-count-bubble');
      if (newBadge && curBadge) curBadge.innerHTML = newBadge.innerHTML;

    } catch (err) {
      console.error('Drawer refresh failed:', err);
      window.location.reload();
    }
  }

  // Run after DOM + custom elements are ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchCartRemoveButton);
  } else {
    patchCartRemoveButton();
  }

})();