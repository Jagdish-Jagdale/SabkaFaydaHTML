/* Render Checkout Page */
document.addEventListener("DOMContentLoaded", function () {
    // Render Delivery Address
    function renderDeliveryAddress() {
        const deliveryContainer = document.getElementById('delivery-address-container');
        if (deliveryContainer && checkoutData.delivery) {
            deliveryContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-dark mb-0" style="font-size: 1.1rem; font-family: 'Montserrat', sans-serif;">Deliver to :</h5>
                    <button class="btn btn-outline-primary btn-sm px-3 fw-semibold" style="border-radius: 4px; font-size: 0.85rem; border-color: #bfdbfe; color: #0087F6;" data-bs-toggle="modal" data-bs-target="#changeAddressModal">Change</button>
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
                <div class="bg-white rounded-3 p-3 mb-4 shadow-sm position-relative" style="border: 1px solid #eef2f5;">

                    <div class="row g-3">
                        <!-- Product Image Column -->
                        <div class="col-4 col-md-3 d-flex flex-column align-items-center">
                            <div class="border rounded-3 p-2 bg-white d-flex align-items-center justify-content-center mb-2" style="width: 100%; max-width: 140px; aspect-ratio: 1; height: auto;">
                                <img src="${product.image}" alt="${product.title}" class="img-fluid object-fit-contain" style="max-height: 100%;">
                            </div>
                        </div>
                        <!-- Product Details Column -->
                        <div class="col-8 col-md-9">
                            <h5 class="fw-bold text-dark mb-1" style="font-family: 'Montserrat', sans-serif; font-size: 1.05rem; line-height: 1.4;">
                                ${product.title}
                            </h5>
                            <!-- Size label -->
                            <div class="text-secondary mb-2" style="font-size: 0.85rem; font-weight: 500;">
                                Size: <strong class="text-dark">${product.size}</strong> <span class="mx-2 text-muted">|</span> Qty: <strong class="text-dark">${product.quantity}</strong>
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
                                <span class="text-muted text-decoration-line-through" style="font-size: 0.95rem;">₹ ${product.originalPrice}</span>
                                <span class="text-dark fw-bold" style="font-size: 1.15rem;">₹ ${product.price}</span>
                            </div>

                            <!-- Delivery timeline -->
                            <div class="text-secondary" style="font-size: 0.82rem; font-weight: 500;">
                                Delivery at <span class="text-dark fw-semibold">${product.deliveryDate}</span>
                            </div>
                        </div>
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
                    <span class="fw-medium">You saved total ${ps.savings} ₹ with this order</span>
                </div>
                <div class="d-flex align-items-center gap-3 bg-light rounded-3 p-3 border mb-3" style="border-color: #eef2f5 !important; font-size: 0.8rem;">
                    <i class="fas fa-shield-halved text-success fs-3"></i>
                    <div class="text-secondary fw-medium">
                        Safe & Secure Payments with<br>
                        <span class="text-dark fw-bold">Trusted Checkout Protection</span>
                    </div>
                </div>
                <div class="border-top pt-3 mb-3">
                    <h6 class="fw-bold mb-2 text-dark" style="font-size: 0.95rem;">Payment Method</h6>
                    <div class="d-flex flex-column gap-2">
                        <label class="d-flex align-items-center cursor-pointer payment-option online-payment m-0 pb-1">
                            <input type="radio" name="payment_method" value="online" class="form-check-input mt-0 me-2" checked onchange="document.getElementById('cod-hint').classList.add('d-none');">
                            <span class="fw-semibold text-dark" style="font-size: 0.9rem;">Pay Online</span>
                        </label>
                        <label class="d-flex align-items-center cursor-pointer payment-option cod-payment m-0 pt-1">
                            <input type="radio" name="payment_method" value="cod" class="form-check-input mt-0 me-2" onchange="document.getElementById('cod-hint').classList.remove('d-none');">
                            <span class="fw-semibold text-dark" style="font-size: 0.9rem;">Cash on Delivery</span>
                        </label>
                    </div>
                    <div id="cod-hint" class="text-muted mt-2 d-none" style="font-size: 0.8rem; line-height: 1.4; font-weight: 500;">
                        <i class="fas fa-info-circle me-1"></i> A small handling fee of ₹29 applies for Cash on Delivery. Save this extra charge by securely paying online!
                    </div>
                </div>
                <div class="border-top pt-3 d-none d-lg-block">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted text-decoration-line-through d-block" style="font-size: 0.75rem;">₹ ${ps.productPrice - ps.discount}</span>
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
                            <button class="btn border-0 position-absolute opacity-0 product-wishlist-btn card-icon-wishlist" title="Add to Wishlist" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 8px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; z-index: 5;">
                                <i class="far fa-heart text-secondary"></i>
                            </button>
                            <button class="btn border-0 position-absolute opacity-0 product-share-btn card-icon-share" title="Share" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 45px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; z-index: 5;">
                                <i class="fa-regular fa-paper-plane text-secondary"></i>
                            </button>
                            <div class="product-card-overlay position-absolute bottom-0 start-0 end-0 p-2 d-none d-md-flex gap-2 opacity-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); transition: opacity 0.3s;">
                                <button class="btn btn-success flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #198754; border: none; color: #ffffff;">
                                    <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                                </button>
                                <button class="btn btn-primary flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #0087F6; border: none; color: #ffffff;">
                                    <i class="fas fa-bolt me-1"></i>Buy Now
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2 p-sm-3 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                                <div class="d-flex flex-wrap gap-1 mb-2">
                                    <span class="custom-badge badge-refer">Refer ${product.refer}</span>
                                    <span class="custom-badge badge-earn">Earn ${product.earn}</span>
                                </div>
                                <h6 class="product-name text-dark mb-1" style="font-size: 0.85rem; font-weight: 500; line-height: 1.4; height: 2.8em; overflow: hidden;">${product.title}</h6>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="text-warning me-2" style="font-size: 0.8rem;">
                                        ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star text-warning"></i>').join('')}
                                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
                                        ${Array(5 - Math.ceil(product.rating)).fill('<i class="far fa-star text-warning"></i>').join('')}
                                    </div>
                                    <span class="text-muted" style="font-size: 0.75rem; font-weight: 500;">(${product.reviews} Reviews)</span>
                                </div>
                            </div>
                            <div class="mt-auto">
                                <div class="d-flex align-items-center flex-wrap gap-2 mb-1">
                                    <span class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">₹${product.originalPrice}</span>
                                    <span class="text-dark fw-bold" style="font-size: 1.05rem;">₹${product.price}</span>
                                    <span class="text-success fw-bold" style="font-size: 0.75rem;">50% off</span>
                                </div>
                                <div class="text-success fw-semibold" style="font-size: 0.75rem;">
                                    Rs 500 with UPI offer
                                </div>
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
                            <button class="btn border-0 position-absolute opacity-0 product-wishlist-btn card-icon-wishlist" title="Add to Wishlist" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 8px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; z-index: 5;">
                                <i class="far fa-heart text-secondary"></i>
                            </button>
                            <button class="btn border-0 position-absolute opacity-0 product-share-btn card-icon-share" title="Share" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 45px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; z-index: 5;">
                                <i class="fa-regular fa-paper-plane text-secondary"></i>
                            </button>
                            <div class="product-card-overlay position-absolute bottom-0 start-0 end-0 p-2 d-none d-md-flex gap-2 opacity-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); transition: opacity 0.3s;">
                                <button class="btn btn-success flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #198754; border: none; color: #ffffff;">
                                    <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                                </button>
                                <button class="btn btn-primary flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #0087F6; border: none; color: #ffffff;">
                                    <i class="fas fa-bolt me-1"></i>Buy Now
                                </button>
                            </div>
                        </div>
                        <div class="card-body p-2 p-sm-3 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                                <div class="d-flex flex-wrap gap-1 mb-2">
                                    <span class="custom-badge badge-refer">Refer ${product.refer}</span>
                                    <span class="custom-badge badge-earn">Earn ${product.earn}</span>
                                </div>
                                <h6 class="product-name text-dark mb-1" style="font-size: 0.85rem; font-weight: 500; line-height: 1.4; height: 2.8em; overflow: hidden;">${product.title}</h6>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="text-warning me-2" style="font-size: 0.8rem;">
                                        ${Array(Math.floor(product.rating)).fill('<i class="fas fa-star text-warning"></i>').join('')}
                                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt text-warning"></i>' : ''}
                                        ${Array(5 - Math.ceil(product.rating)).fill('<i class="far fa-star text-warning"></i>').join('')}
                                    </div>
                                    <span class="text-muted" style="font-size: 0.75rem; font-weight: 500;">(${product.reviews} Reviews)</span>
                                </div>
                            </div>
                            <div class="mt-auto">
                                <div class="d-flex align-items-center flex-wrap gap-2 mb-1">
                                    <span class="text-muted text-decoration-line-through" style="font-size: 0.75rem;">₹${product.originalPrice}</span>
                                    <span class="text-dark fw-bold" style="font-size: 1.05rem;">₹${product.price}</span>
                                    <span class="text-success fw-bold" style="font-size: 0.75rem;">50% off</span>
                                </div>
                                <div class="text-success fw-semibold" style="font-size: 0.75rem;">
                                    Rs 500 with UPI offer
                                </div>
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
                    <span class="text-muted text-decoration-line-through d-block" style="font-size: 0.72rem;">₹ ${ps.productPrice - ps.discount}</span>
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
