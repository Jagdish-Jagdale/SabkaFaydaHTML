/* Render Checkout Page */
document.addEventListener("DOMContentLoaded", function () {
    // Render Delivery Address
    function renderDeliveryAddress() {
        const deliveryContainer = document.getElementById('delivery-address-container');
        if (deliveryContainer && checkoutData.delivery) {
            deliveryContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-dark mb-0" style="font-size: 1.1rem; font-family: 'Montserrat', sans-serif;">Deliver to :</h5>
                    <button class="btn btn-outline-primary btn-sm px-3 fw-semibold" style="border-radius: 4px; font-size: 0.85rem; border-color: #bfdbfe; color: #0087F6;">Change</button>
                </div>
                <p class="text-secondary mb-0" style="font-size: 0.9rem; line-height: 1.6; font-weight: 500; max-width: 600px;">
                    ${checkoutData.delivery.address}<br>
                    ${checkoutData.delivery.city}
                </p>
            `;
        }
    }

    // Render Product Items
    function renderProductItems() {
        const productsContainer = document.getElementById('products-container');
        if (productsContainer && checkoutData.products) {
            productsContainer.innerHTML = checkoutData.products.map(product => `
                <div class="bg-white rounded-3 p-3 mb-4 shadow-sm" style="border: 1px solid #eef2f5;">
                    <div class="row g-3">
                        <!-- Product Image Column -->
                        <div class="col-md-3 d-flex flex-column align-items-center">
                            <div class="border rounded-3 p-2 bg-white d-flex align-items-center justify-content-center mb-2" style="width: 140px; height: 140px;">
                                <img src="${product.image}" alt="${product.title}" class="img-fluid object-fit-contain" style="max-height: 100%;">
                            </div>
                            <!-- Quantity Dropdown -->
                            <div class="dropdown w-100" style="max-width: 140px;">
                                <button class="btn btn-outline-secondary w-100 btn-sm d-flex justify-content-between align-items-center px-3 py-1.5 bg-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 0.85rem; border-color: #cbd5e1; font-weight: 600; color: #475569; box-shadow: none;">
                                    <span>QTY: ${product.quantity}</span>
                                    <i class="fas fa-caret-down text-secondary"></i>
                                </button>
                                <ul class="dropdown-menu shadow-sm border" style="font-size: 0.85rem; min-width: 100px;">
                                    <li><a class="dropdown-item fw-bold" href="#">QTY: 1</a></li>
                                    <li><a class="dropdown-item" href="#">QTY: 2</a></li>
                                    <li><a class="dropdown-item" href="#">QTY: 3</a></li>
                                    <li><a class="dropdown-item" href="#">QTY: 4</a></li>
                                    <li><a class="dropdown-item" href="#">QTY: 5</a></li>
                                </ul>
                            </div>
                            <!-- On Sale Offer Tag -->
                            <span class="badge bg-transparent border py-1.5 px-3 fw-bold mt-2 d-inline-block text-success" style="font-size: 0.72rem; border-radius: 4px; border-color: #a7f3d0; background-color: #ecfdf5 !important; max-width: 140px; width: 100%; text-align: center;">
                                ${product.offerTag}
                            </span>
                        </div>
                        <!-- Product Details Column -->
                        <div class="col-md-9">
                            <h5 class="fw-bold text-dark mb-1" style="font-family: 'Montserrat', sans-serif; font-size: 1.05rem; line-height: 1.4;">
                                ${product.title}
                            </h5>
                            <!-- Size label -->
                            <div class="text-secondary mb-2" style="font-size: 0.85rem; font-weight: 500;">
                                Size: <strong class="text-dark">${product.size}</strong>
                            </div>
                            <!-- Status & Rating -->
                            <div class="d-flex align-items-center gap-3 mb-2 flex-wrap">
                                <span class="badge bg-danger px-2.5 py-1.5 fw-semibold" style="font-size: 0.75rem; border-radius: 4px;">${product.status}</span>
                                <div class="d-flex align-items-center">
                                    <div class="text-warning me-2" style="font-size: 0.85rem;">
                                        ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star text-warning"></i>').join('')}
                                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
                                        ${Array(5 - Math.ceil(product.rating)).fill('<i class="far fa-star text-warning"></i>').join('')}
                                    </div>
                                    <span class="text-muted" style="font-size: 0.8rem; font-weight: 500;">(${product.reviews} Reviews)</span>
                                </div>
                            </div>
                            <!-- Pricing -->
                            <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                <span class="text-success fw-bold" style="font-size: 1.1rem; font-family: 'Montserrat', sans-serif;">${product.discount}</span>
                                <span class="text-muted text-decoration-line-through" style="font-size: 0.95rem;">${product.originalPrice}</span>
                                <span class="text-dark fw-bold" style="font-size: 1.15rem;">₹ ${product.price}</span>
                            </div>
                            <!-- UPI OMC Banner -->
                            <div class="bg-primary text-white rounded-3 px-3 py-2 position-relative overflow-hidden mb-2" style="background-color: #0087F6 !important; font-size: 0.85rem;">
                                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="badge bg-dark text-white fw-bold fst-italic px-2 py-0.5" style="font-size: 0.75rem;">OMG!</span>
                                        <span class="fw-semibold">Buy this product for only <strong class="text-warning">₹${product.upiPrice}</strong> Using UPI</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Delivery timeline -->
                            <div class="text-secondary" style="font-size: 0.82rem; font-weight: 500;">
                                Delivery at <span class="text-dark fw-semibold">${product.deliveryDate}</span>
                            </div>
                        </div>
                    </div>
                    <!-- Card Action Buttons -->
                    <div class="d-flex gap-2 mt-4 pt-3 border-top" style="border-color: #f1f5f9 !important;">
                        <button class="btn btn-light flex-fill fw-bold py-2 border text-secondary" style="background-color: #f8fafc; border-color: #cbd5e1 !important; font-size: 0.85rem; border-radius: 6px;">
                            <i class="far fa-heart me-1"></i> Add to Wish list
                        </button>
                        <button class="btn btn-light flex-fill fw-bold py-2 border text-secondary" style="background-color: #f8fafc; border-color: #cbd5e1 !important; font-size: 0.85rem; border-radius: 6px;">
                            <i class="far fa-trash-can me-1"></i> Remove
                        </button>
                        <button class="btn btn-primary flex-fill fw-bold py-2" style="background-color: #0087F6; border: none; font-size: 0.85rem; border-radius: 6px;">
                            Buy Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Render Price Summary
    function renderPriceSummary() {
        const priceSummaryContainer = document.getElementById('price-summary-container');
        if (priceSummaryContainer && checkoutData.priceSummary) {
            const ps = checkoutData.priceSummary;
            priceSummaryContainer.innerHTML = `
                <h5 class="fw-bold text-dark border-bottom pb-2 mb-3" style="font-family: 'Montserrat', sans-serif; font-size: 1rem;">Price Summary</h5>
                <div class="d-flex justify-content-between align-items-center mb-2.5" style="font-size: 0.9rem;">
                    <span class="text-secondary fw-semibold">Total Items :</span>
                    <span class="text-dark fw-bold">${ps.totalItems.toString().padStart(2, '0')}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2.5" style="font-size: 0.9rem;">
                    <span class="text-secondary fw-semibold">Product price</span>
                    <span class="text-dark fw-bold">${ps.productPrice}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2.5" style="font-size: 0.9rem;">
                    <span class="text-secondary fw-semibold">Discount</span>
                    <span class="text-success fw-bold">-${ps.discount}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3" style="font-size: 0.9rem;">
                    <span class="text-secondary fw-semibold">Delivery charge</span>
                    <span class="text-dark fw-bold">${ps.deliveryCharge.toString().padStart(2, '0')}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center border-top pt-2.5 mb-3">
                    <span class="fw-bold text-dark" style="font-size: 0.95rem;">Sub Total</span>
                    <span class="fw-bold text-dark" style="font-size: 1rem;">${ps.subTotal}</span>
                </div>
                <div class="alert alert-success border-0 py-2.5 px-3 mb-4 d-flex align-items-center gap-2" style="background-color: #f0fdf4; color: #166534; font-size: 0.8rem; border-radius: 6px;">
                    <i class="fas fa-tags text-success fs-6"></i>
                    <span class="fw-medium">You saved total ${ps.savings} Rs with this order</span>
                </div>
                <div class="d-flex align-items-center gap-3 bg-light rounded-3 p-3 border mb-3" style="border-color: #eef2f5 !important; font-size: 0.8rem;">
                    <i class="fas fa-shield-halved text-success fs-3"></i>
                    <div class="text-secondary fw-medium">
                        Safe & Secure Payments with<br>
                        <span class="text-dark fw-bold">Trusted Checkout Protection</span>
                    </div>
                </div>
                <div class="border-top pt-3 d-none d-lg-block">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted text-decoration-line-through d-block" style="font-size: 0.75rem;">${ps.productPrice - ps.discount}</span>
                            <span class="fw-bold text-dark" style="font-size: 1.25rem;">₹ ${ps.subTotal}</span>
                        </div>
                        <button class="btn btn-primary px-5 py-2.5 fw-bold" style="background-color: #0087F6; border: none; font-size: 0.95rem; border-radius: 6px;">
                            Continue
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Render Similar Products
    function renderSimilarProducts() {
        const similarContainer = document.getElementById('similar-products-container');
        if (similarContainer && checkoutData.similarProducts) {
            similarContainer.innerHTML = checkoutData.similarProducts.map(product => `
                <div class="col">
                    <div class="card h-100 border product-card bg-white" style="border-color: #f0f3f6 !important; border-radius: 8px;">
                        <div class="position-relative bg-light overflow-hidden d-flex align-items-center justify-content-center product-image-container" style="padding-top: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <img src="${product.image}" alt="${product.title}" class="position-absolute start-50 top-50 translate-middle" style="max-width: 85%; max-height: 85%; object-fit: contain;">
                        </div>
                        <div class="card-body p-2 p-sm-3 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                                <div class="text-muted text-uppercase fw-bold mb-1" style="font-size: 0.7rem; letter-spacing: 0.5px;">${product.sponsored ? 'Sponsored' : ''}</div>
                                <h6 class="product-name text-dark mb-2" style="font-size: 0.82rem; font-weight: 500; line-height: 1.4; height: 3.6em; overflow: hidden;">${product.title}</h6>
                                <div class="d-flex flex-wrap gap-1 mb-2">
                                    <span class="custom-badge badge-rating">${product.rating} <i class="fas fa-star"></i> (${product.reviews})</span>
                                    <span class="custom-badge badge-refer">Refer ${product.refer}</span>
                                    <span class="custom-badge badge-earn">Earn ${product.earn}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-wrap gap-2 mt-2">
                                <span class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">${product.originalPrice}</span>
                                <span class="text-dark fw-bold" style="font-size: 0.95rem;">Rs ${product.price}</span>
                                <div class="w-100"></div>
                                <span class="text-primary fw-semibold" style="font-size: 0.72rem;">${product.offer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Render Peoples Products
    function renderPeoplesProducts() {
        const peoplesContainer = document.getElementById('peoples-products-container');
        if (peoplesContainer && checkoutData.similarProducts) {
            peoplesContainer.innerHTML = checkoutData.similarProducts.map(product => `
                <div class="col">
                    <div class="card h-100 border product-card bg-white" style="border-color: #f0f3f6 !important; border-radius: 8px;">
                        <div class="position-relative bg-light overflow-hidden d-flex align-items-center justify-content-center product-image-container" style="padding-top: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <img src="${product.image}" alt="${product.title}" class="position-absolute start-50 top-50 translate-middle" style="max-width: 85%; max-height: 85%; object-fit: contain;">
                        </div>
                        <div class="card-body p-2 p-sm-3 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                                <div class="text-muted text-uppercase fw-bold mb-1" style="font-size: 0.7rem; letter-spacing: 0.5px;">${product.sponsored ? 'Sponsored' : ''}</div>
                                <h6 class="product-name text-dark mb-2" style="font-size: 0.82rem; font-weight: 500; line-height: 1.4; height: 3.6em; overflow: hidden;">${product.title}</h6>
                                <div class="d-flex flex-wrap gap-1 mb-2">
                                    <span class="custom-badge badge-rating">${product.rating} <i class="fas fa-star"></i> (${product.reviews})</span>
                                    <span class="custom-badge badge-refer">Refer ${product.refer}</span>
                                    <span class="custom-badge badge-earn">Earn ${product.earn}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center flex-wrap gap-2 mt-2">
                                <span class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">${product.originalPrice}</span>
                                <span class="text-dark fw-bold" style="font-size: 0.95rem;">Rs ${product.price}</span>
                                <div class="w-100"></div>
                                <span class="text-primary fw-semibold" style="font-size: 0.72rem;">${product.offer}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Render Mobile Sticky Footer
    function renderMobileFooter() {
        const mobileFooterContainer = document.getElementById('mobile-footer-container');
        if (mobileFooterContainer && checkoutData.priceSummary) {
            const ps = checkoutData.priceSummary;
            mobileFooterContainer.innerHTML = `
                <div>
                    <span class="text-muted text-decoration-line-through d-block" style="font-size: 0.72rem;">${ps.productPrice - ps.discount}</span>
                    <span class="fw-bold text-dark" style="font-size: 1.15rem;">₹ ${ps.subTotal}</span>
                </div>
                <button class="btn btn-primary px-4 py-2 fw-bold" style="background-color: #0087F6; border: none; font-size: 0.9rem; border-radius: 6px;">
                    Continue
                </button>
            `;
        }
    }

    // Initialize all renders
    renderDeliveryAddress();
    renderProductItems();
    renderPriceSummary();
    renderSimilarProducts();
    renderPeoplesProducts();
    renderMobileFooter();
});
