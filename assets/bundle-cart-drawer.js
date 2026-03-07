(function () {
  'use strict';

  // 1. Handle the "Hide/Show items" Toggle
  // This works with the Liquid code to collapse the list of pairs
  function initBundleToggles() {
    document.querySelectorAll('.bundle-toggle').forEach(button => {
      // Avoid double-binding if the drawer refreshes
      if (button.dataset.initialized) return;
      
      button.addEventListener('click', (e) => {
        const list = button.nextElementSibling;
        const isHidden = list.classList.toggle('hidden');
        const itemCount = list.querySelectorAll('li').length;
        
        button.textContent = isHidden 
          ? `Show ${itemCount} items ▾` 
          : `Hide items ▴`;
      });

      button.dataset.initialized = "true";
    });
  }

  // 2. Handle the "Remove Bundle" Logic
  // When one item is removed, all items with the same _bundleKey are removed
  function handleBundleRemove() {
    document.addEventListener('click', async (e) => {
      const removeBtn = e.target.closest('cart-remove-button[data-bundle-key]');
      if (!removeBtn) return;

      const bundleKey = removeBtn.dataset.bundleKey;
      if (!bundleKey || bundleKey === "") return; // Fallback for normal items

      e.preventDefault();
      e.stopImmediatePropagation();

      try {
        // Fetch current cart state
        const res = await fetch('/cart.js');
        const cart = await res.json();

        // Identify all items belonging to this specific bundle
        const updates = {};
        cart.items.forEach(item => {
          if (item.properties && item.properties._bundleKey === bundleKey) {
            updates[item.key] = 0;
          }
        });

        // Update the cart (removes all lines in one request)
        await fetch('/cart/update.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates }),
        });

        // Refresh the Drawer content to show the item is gone
        // This uses the standard Shopify theme fetch pattern
        const sectionRes = await fetch(`${window.location.pathname}?section_id=cart-drawer`);
        const html = await sectionRes.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const oldInner = document.querySelector('.drawer__inner');
        const newInner = doc.querySelector('.drawer__inner');
        
        if (oldInner && newInner) {
          oldInner.innerHTML = newInner.innerHTML;
          // Re-run toggle initialization for the new HTML
          initBundleToggles();
        }

      } catch (err) {
        console.error('Bundle removal failed:', err);
      }
    }, true);
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    initBundleToggles();
    handleBundleRemove();
  });

  // Re-initialize if the cart drawer is dynamically updated (Mutation Observer)
  const observer = new MutationObserver(() => {
    initBundleToggles();
  });
  observer.observe(document.body, { childList: true, subtree: true });

})();