function renderWishlist(wishlistData) {
    const container = document.getElementById('wishlistItemsList');
    const emptyState = document.getElementById('emptyWishlistState');
    if (!container) return;

    // Check if wishlist is empty
    if (!wishlistData || wishlistData.length === 0) {
        // Show empty state
        if (emptyState) {
            emptyState.classList.remove('d-none');
        }
        container.innerHTML = '';
        return;
    }

    // Hide empty state and show items
    if (emptyState) {
        emptyState.classList.add('d-none');
    }

    let html = '';
    wishlistData.forEach((item, index) => {
        // Generate a stable timestamp for sorting (if not in data, use index-based offset)
        const timestamp = item.timestamp || (Date.now() - index * 86400000);
        html += `
        <article class="order-card bg-white shadow-sm wishlist-item" data-status="${item.statusClass}" data-price="${(item.price || '0').replace(/,/g, '')}" data-name="${item.productName}" data-timestamp="${timestamp}">
            <div class="order-product">
                <div class="order-product-img position-relative">
                    <img src="${item.image}" alt="${item.productName}">
                    <span class="position-absolute top-0 end-0 m-1 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center" style="width: 24px; height: 24px; z-index: 2;" title="Saved to Wishlist">
                        <i class="fa-solid fa-heart text-danger" style="font-size: 0.75rem;"></i>
                    </span>
                </div>
                <div>
                    <h3 class="product-title">${item.productName}</h3>
                    <span class="text-muted mb-1 d-block" style="font-size: 0.72rem; font-weight: 500;">Current Price</span>
                    <b class="fs-5 text-dark">&#8377;${item.price}</b>
                </div>
            </div>
            <div class="order-info-column">
                <div class="order-meta">
                    <i class="fa-regular fa-calendar-days"></i>
                    <div>
                        <span>Order Date</span>
                        <strong>${item.orderDate}</strong>
                    </div>
                </div>
            </div>
            <div class="order-status-panel">
                <span class="status-pill ${item.statusClass} m-0 px-2 py-1 align-self-start text-uppercase" style="font-size: 0.65rem;">${item.status}</span>
                <span class="mt-2 text-muted" style="font-size: 0.7rem; font-weight: 600;">Added Date</span>
                <strong style="font-size: 0.75rem; color: #333;">${item.addedDate}</strong>
            </div>
            <div class="order-actions d-flex flex-column justify-content-center align-items-stretch p-2">
                <button class="btn btn-primary w-100 fw-bold py-2 text-nowrap" style="box-shadow: 0 4px 10px rgba(0, 93, 255, 0.15);" onclick="addToCart('${item.productName}')">
                    <i class="fa-solid fa-cart-shopping me-1"></i> Add to Cart
                </button>
                <a href="product-details.html" class="btn btn-outline-primary w-100 fw-bold py-2 text-nowrap">View Product</a>
                <button class="btn btn-outline-danger w-100 fw-bold py-2 text-nowrap" onclick="removeWishlistItem(this)">Remove Item</button>
            </div>
        </article>`;
    });
    container.innerHTML = html;
}
