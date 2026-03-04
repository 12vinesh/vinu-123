(function () {
  'use strict';

  async function hydrateBundlePairs(cartItemEl) {
    const pairItems = cartItemEl.querySelectorAll('.bundle-pair-item[data-variant-id]');

    for (const pairItem of pairItems) {
      const variantId = pairItem.dataset.variantId;
      if (!variantId) continue;

      try {
        const response = await fetch(`/variants/${variantId}.js`);
        const variant = await response.json();

        const imgWrap = pairItem.querySelector('[data-pair-img-wrap]');
        if (imgWrap && variant.featured_image?.src) {
          const img = document.createElement('img');
          img.src = variant.featured_image.src;
          img.alt = variant.title || '';
          img.width = 40;
          img.height = 40;
          img.loading = 'lazy';
          img.className = 'bundle-pair-item__img';
          imgWrap.appendChild(img);
        }
      } catch (err) {
        console.error('Failed to fetch variant', variantId, err);
      }
    }
  }

  function initToggle(cartItemEl) {
    const toggleBtn = cartItemEl.querySelector('[data-bundle-toggle]');
    const pairsList = cartItemEl.querySelector('[data-bundle-pairs-list]');
    if (!toggleBtn || !pairsList) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      const pairCount = pairsList.querySelectorAll('.bundle-pair-item').length;

      if (isExpanded) {
        pairsList.style.display = 'none';
        toggleBtn.textContent = `Show ${pairCount} items ▼`;
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        pairsList.style.display = '';
        toggleBtn.textContent = `Hide ${pairCount} items ▲`;
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  function initBundleCartItems() {
    const bundleItems = document.querySelectorAll('.cart-item--bundle');
    bundleItems.forEach((item) => {
      hydrateBundlePairs(item);
      initToggle(item);
    });
  }

  document.addEventListener('DOMContentLoaded', initBundleCartItems);

  // Re-run when Dawn updates cart drawer
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.classList?.contains('cart-item--bundle')) {
          hydrateBundlePairs(node);
          initToggle(node);
        }
        node.querySelectorAll?.('.cart-item--bundle')?.forEach((item) => {
          hydrateBundlePairs(item);
          initToggle(item);
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();