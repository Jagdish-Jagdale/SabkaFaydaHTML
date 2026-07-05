function renderCart(cart) {
    console.log('renderCart function called with cart:', cart);
    const container = document.getElementById('cartItemsList');
    if (!container) {
        console.error('Error: #cartItemsList element not found in the DOM.');
        return;
    }
    
    if (!cart || cart.length === 0) {
        console.log('Cart is empty inside renderCart, not rendering any items.');
        container.innerHTML = '';
        return;
    }

    let html = '';
    cart.forEach(item => {
        console.log('Rendering item:', item);
        const specsHtml = item.specs && item.specs.length > 0 
            ? item.specs.map((s, i) => i === item.specs.length - 1 
                ? `<span class="text-success fw-bold">${s}</span>` 
                : `<span>${s}</span><br>`).join('')
            : '';

        html += `
        <div class="row align-items-center py-3 border-bottom cart-item" data-price="${item.price.replace(/,/g, '')}" data-original-price="${item.originalPrice.replace(/,/g, '')}" data-id="${item.id}">
            <div class="col-auto">
                <input type="checkbox" class="form-check-input cart-checkbox" checked style="width: 20px; height: 20px; cursor: pointer;" onchange="calculateTotals()">
            </div>
            <div class="col-auto">
                <div class="border rounded bg-white p-2 d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
                    <img src="${item.image}" alt="${item.productName}" class="img-fluid object-fit-contain" style="max-height: 100%;">
                </div>
            </div>
            <div class="col px-3">
                <h6 class="fw-bold text-dark mb-1" style="font-size: 0.95rem;">${item.productName}</h6>
                <div class="text-muted" style="font-size: 0.72rem; line-height: 1.4;">
                    ${specsHtml}
                </div>
            </div>
            <div class="col-auto px-2">
                <div class="d-flex align-items-center border rounded bg-light" style="width: fit-content;">
                    <button class="btn btn-sm btn-light border-0 px-2 py-1 btn-minus fw-bold" type="button" onclick="updateQty(this, -1)">-</button>
                    <span class="px-2 fw-bold qty-val" style="font-size: 0.85rem; min-width: 24px; text-align: center;">${item.qty}</span>
                    <button class="btn btn-sm btn-light border-0 px-2 py-1 btn-plus fw-bold" type="button" onclick="updateQty(this, 1)">+</button>
                </div>
            </div>
            <div class="col-auto text-end px-3" style="min-width: 110px;">
                <h6 class="fw-bold text-dark mb-0 item-current-price">₹${item.price}</h6>
                <span class="text-muted text-decoration-line-through style-original-price" style="font-size: 0.75rem;">₹${item.originalPrice}</span>
                <span class="badge bg-success bg-opacity-10 text-success ms-1 px-1.5 py-0.5" style="font-size: 0.62rem;">${item.discount}</span>
            </div>
            <div class="col-auto text-center ps-2">
                <button class="btn btn-link text-danger p-0 border-0 btn-remove" type="button" style="text-decoration: none;" onclick="removeCartItem(this, '${item.id}')">
                    <i class="fa-solid fa-trash-can fs-5 d-block mb-1"></i>
                    <span style="font-size: 0.65rem; font-weight: 700;">Remove</span>
                </button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
    console.log('Cart HTML rendered successfully. Container innerHTML length:', container.innerHTML.length);
}
