function renderCart(cart) {
    const container = document.getElementById('cartItemsList');
    if (!container) {
        return;
    }
    
    if (!cart || cart.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    cart.forEach((item, index) => {
        const isLastItem = index === cart.length - 1;
        const borderClass = isLastItem ? '' : 'border-bottom';
        
        // Get size from item.size field or extract from ID for backward compatibility
        const sizeDisplay = item.size || (item.id.includes('_') ? item.id.split('_').pop() : '');
        
        const specsHtml = item.specs && item.specs.length > 0 
            ? item.specs.map((s, i) => i === item.specs.length - 1 
                ? `<span class="text-success fw-bold">${s}</span>` 
                : `<span>${s}</span><br>`).join('')
            : '';

        html += `
        <div class="row align-items-center py-2 ${borderClass} cart-item" data-price="${item.price.replace(/,/g, '')}" data-original-price="${item.originalPrice.replace(/,/g, '')}" data-id="${item.id}">
            <div class="col-auto d-flex align-items-center justify-content-center">
                <input type="checkbox" class="form-check-input cart-checkbox" checked style="width: 14px; height: 14px; cursor: pointer;" onchange="calculateTotals()">
            </div>
            <div class="col-auto">
                <a href="product-details.html?id=${item.id}" class="text-decoration-none">
                    <div class="border rounded bg-white p-1 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                        <img src="${item.image}" alt="${item.productName}" class="img-fluid object-fit-contain" style="max-height: 100%; max-width: 100%;">
                    </div>
                </a>
            </div>
            <div class="col px-2">
                <div class="d-flex justify-content-between align-items-start gap-2 w-100 mb-1">
                    <div class="flex-grow-1">
                        <a href="product-details.html?id=${item.id}" class="text-decoration-none text-dark">
                            <h6 class="fw-bold text-dark mb-1" style="font-size: 0.85rem; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${item.productName}</h6>
                        </a>
                        <div class="text-muted" style="font-size: 0.7rem; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            ${specsHtml}
                        </div>
                        ${sizeDisplay ? `<div class="text-muted" style="font-size: 0.65rem; margin-top: 2px;">Size: <span class="fw-bold text-dark">${sizeDisplay}</span></div>` : ''}
                    </div>
                    <div class="flex-shrink-0">
                        <div class="d-flex align-items-center border rounded bg-light" style="width: fit-content;">
                            <button class="btn btn-sm btn-light border-0 px-2 py-1 btn-minus fw-bold" type="button" onclick="updateQty(this, -1)" style="font-size: 0.75rem;">-</button>
                            <span class="px-2 fw-bold qty-val" style="font-size: 0.8rem; min-width: 20px; text-align: center;">${item.qty}</span>
                            <button class="btn btn-sm btn-light border-0 px-2 py-1 btn-plus fw-bold" type="button" onclick="updateQty(this, 1)" style="font-size: 0.75rem;">+</button>
                        </div>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-between w-100 mt-1">
                    <div class="d-flex align-items-center gap-2">
                        <h6 class="fw-bold text-dark mb-0 item-current-price" style="font-size: 0.9rem;">₹${item.price}</h6>
                        <span class="text-muted text-decoration-line-through style-original-price" style="font-size: 0.7rem;">₹ ${item.originalPrice}</span>
                        <span class="badge bg-success bg-opacity-10 text-success px-1 py-0.5" style="font-size: 0.6rem;">${item.discount}</span>
                    </div>
                    <div>
                        <button class="btn btn-link text-danger p-0 border-0 btn-remove d-flex align-items-center gap-1" type="button" style="text-decoration: none;" onclick="removeCartItem(this, '${item.id}')">
                            <i class="fa-solid fa-trash-can" style="font-size: 0.8rem;"></i>
                            <span class="d-none d-md-inline" style="font-size: 0.7rem; font-weight: 700;">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}
