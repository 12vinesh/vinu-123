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
      // Step 1: get cart
      const cart = await fetch('/cart.js').then(r => r.json());

      // Step 2: build updates
      const updates = {};
      cart.items.forEach(item => {
        if (item.properties?._bundleKey === bundleKey) {
          updates[item.key] = 0;
        }
      });

      // Step 3: remove and wait for confirmed response
      const updatedCart = await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      }).then(r => r.json());

      console.log('items remaining:', updatedCart.item_count);

      // Step 4: rebuild drawer from confirmed cart data
      refreshDrawer(updatedCart);

    } catch (err) {
      console.error('Bundle removal failed:', err);
      window.location.reload();
    }
  });

  function refreshDrawer(cart) {
    const cartDrawer = document.querySelector('cart-drawer');
    const drawerItems = document.querySelector('cart-drawer-items');
    const checkoutBtn = document.querySelector('#CartDrawer-Checkout');

    // Update cart count badge
    const bubbles = document.querySelectorAll('.cart-count-bubble span:not(.visually-hidden)');
    bubbles.forEach(b => b.textContent = cart.item_count || '');
    const cartBubble = document.querySelector('.cart-count-bubble');
    if (cartBubble) cartBubble.style.display = cart.item_count > 0 ? '' : 'none';

    if (cart.item_count === 0) {
      cartDrawer?.classList.add('is-empty');
      drawerItems?.classList.add('is-empty');
      if (checkoutBtn) checkoutBtn.disabled = true;
      const wrapper = document.querySelector('.drawer__cart-items-wrapper');
      if (wrapper) wrapper.innerHTML = '';
      return;
    }

    // Filter parents and children
   const parentItems = cart.items.filter(item =>
  item.properties?._isChild !== 'true'
);
    const childItems = cart.items.filter(item =>
      item.properties?._isChild === 'true'
    );

    // Build rows
    const rows = parentItems.map(item => {
      const bKey = item.properties?._bundleKey;
      const isParent = item.properties?._isParent === 'true';

      let childHTML = '';
      if (isParent && bKey) {
        const children = childItems.filter(c => c.properties?._bundleKey === bKey);
        const childRows = children.map(child => `
          <li style="display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:13px;">
            <img src="${child.image}" width="30" height="30" style="border-radius:4px;">
            <span>${child.properties?._pairLabel || ''}: ${child.variant_title || ''}</span>
          </li>
        `).join('');

        childHTML = `
          <div class="bundle-expansion-wrapper" style="margin-top:10px;">
            <button class="bundle-toggle" type="button"
              onclick="this.nextElementSibling.classList.toggle('hidden')"
              style="background:none;border:none;text-decoration:underline;cursor:pointer;font-size:12px;padding:0;color:#666;">
              Hide items ▴
            </button>
            <ul class="bundle-child-list" style="list-style:none;padding-left:15px;border-left:2px solid #eee;margin-top:10px;">
              ${childRows}
            </ul>
            <button
              type="button"
              class="cart-bundle-remove"
              data-bundle-key="${bKey}"
              style="margin-top:8px;background:none;border:none;padding:0;cursor:pointer;color:#999;"
              aria-label="Remove bundle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                <path d="M14 3h-3.53a3.001 3.001 0 00-5.94 0H1V4h1v11a1 1 0 001 1h10a1 1 0 001-1V4h1V3zM6.5 3a1 1 0 011.97 0H6.5zM12 15H4V4h8v11z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        `;
      }

      const removeBtn = isParent ? '' : `
        <cart-remove-button data-index="${item.index}">
          <a href="/cart/change?line=${item.index}&quantity=0"
            class="button button--tertiary"
            style="display:flex;align-items:center;justify-content:center;min-width:32px;min-height:32px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
              <path d="M14 3h-3.53a3.001 3.001 0 00-5.94 0H1V4h1v11a1 1 0 001 1h10a1 1 0 001-1V4h1V3zM6.5 3a1 1 0 011.97 0H6.5zM12 15H4V4h8v11z" fill="currentColor"></path>
            </svg>
          </a>
        </cart-remove-button>
      `;

      return `
        <tr class="cart-item" role="row">
          <td class="cart-item__media" role="cell">
            <img src="${item.image}" alt="${item.title}" width="70" height="70" loading="lazy">
          </td>
          <td class="cart-item__details" role="cell">
            <a href="${item.url}" class="cart-item__name h4 break">${item.product_title}</a>
            <div class="cart-item__price-wrapper">${formatMoney(item.final_line_price)}</div>
            ${childHTML}
          </td>
          <td class="cart-item__totals right" role="cell">
            ${removeBtn}
          </td>
        </tr>
      `;
    }).join('');

    // Update total
    const total = document.querySelector('.totals__total-value');
    if (total) total.textContent = formatMoney(cart.total_price);

    // Swap tbody
    const tbody = document.querySelector('.cart-items tbody');
    if (tbody) {
      tbody.innerHTML = rows;
    } else {
      window.location.reload();
      return;
    }

    cartDrawer?.classList.remove('is-empty');
    drawerItems?.classList.remove('is-empty');
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  function formatMoney(cents) {
    const symbol = window.Shopify?.currency?.active === 'INR' ? '₹' : 'Rs.';
    return symbol + ' ' + (cents / 100).toFixed(2);
  }

})();