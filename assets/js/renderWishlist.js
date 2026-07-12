function renderWishlist(wishlistData) {
    const container = document.getElementById('wishlistItemsList');
    const emptyState = document.getElementById('emptyWishlistState');
    if (!container) return;

    // Check if wishlist is empty
    if (!wishlistData || wishlistData.length === 0) {
        // Show empty state
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        container.innerHTML = '';
        return;
    }

    // Hide empty state and show items
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    let html = '';
    wishlistData.forEach((item, index) => {
        // Generate a stable timestamp for sorting (if not in data, use index-based offset)
        const timestamp = item.timestamp || (Date.now() - index * 86400000);
        html += `
        <article class="order-card bg-white shadow-sm wishlist-item position-relative" data-status="${item.statusClass}" data-price="${(item.price || '0').replace(/,/g, '')}" data-name="${item.productName}" data-timestamp="${timestamp}" onclick="window.location.href='product-details.html?product=' + encodeURIComponent('${item.productName.replace(/'/g, "\\'")}')" style="cursor: pointer;">
            <!-- Mobile top-right delete icon -->
            <button class="btn p-0 position-absolute top-0 end-0 m-3 border-0 bg-transparent wishlist-delete-btn d-md-none" onclick="event.stopPropagation(); removeWishlistItem(this);" style="z-index: 10;" title="Remove from Wishlist">
                <i class="fa-solid fa-trash-can text-danger fs-5"></i>
            </button>
            
            <div class="order-product">
                <div class="order-product-img position-relative">
                    <img src="${item.image}" alt="${item.productName}">
                    <span class="position-absolute top-0 end-0 m-1 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center d-none d-md-flex" style="width: 24px; height: 24px; z-index: 2;" title="Saved to Wishlist">
                        <i class="fa-solid fa-heart text-danger" style="font-size: 0.75rem;"></i>
                    </span>
                </div>
                <div>
                    <h3 class="product-title">${item.productName}</h3>
                    <span class="text-muted mb-1 d-none d-md-block" style="font-size: 0.72rem; font-weight: 500;">Current Price</span>
                    <b class="fs-5 text-dark">&#8377;${item.price}</b>
                </div>
            </div>
            <div class="order-info-column">
                <div class="order-meta">
                    <i class="fa-solid fa-box-open"></i>
                    <div>
                        <span>Stock Status</span>
                        <strong><span class="status-pill ${item.statusClass} m-0 px-2 py-1 text-uppercase" style="font-size: 0.65rem;">${item.status}</span></strong>
                    </div>
                </div>
            </div>
            <div class="order-status-panel">
                <span class="mt-2 text-muted" style="font-size: 0.7rem; font-weight: 600;">Added Date</span>
                <strong style="font-size: 0.75rem; color: #333;">${item.addedDate}</strong>
            </div>
            <div class="order-actions d-flex flex-column justify-content-center align-items-stretch p-2">
                <button class="btn btn-primary w-100 fw-bold py-2 text-nowrap btn-add-to-cart" style="box-shadow: 0 4px 10px rgba(0, 93, 255, 0.15);" onclick="event.stopPropagation(); addToCart('${item.productName.replace(/'/g, "\\'")}', 1, this)">
                    <i class="fa-solid fa-cart-shopping me-1"></i> Add to Cart
                </button>
                <a href="product-details.html?product=${encodeURIComponent(item.productName)}" class="btn btn-outline-primary w-100 fw-bold py-2 text-nowrap btn-view-product" onclick="event.stopPropagation();">View Product</a>
                <button class="btn btn-outline-danger w-100 fw-bold py-2 text-nowrap btn-remove-item" onclick="event.stopPropagation(); removeWishlistItem(this);">Remove Item</button>
            </div>
        </article>`;
    });
    container.innerHTML = html;
}
