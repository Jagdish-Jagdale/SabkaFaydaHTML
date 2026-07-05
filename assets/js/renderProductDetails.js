/* Render Product Details Page */
document.addEventListener("DOMContentLoaded", function () {
    // Render Product Info
    function renderProductInfo() {
        const productInfoContainer = document.getElementById('product-info-container');
        if (productInfoContainer && productDetailsData.product) {
            const p = productDetailsData.product;
            const stars = Array(Math.floor(p.rating)).fill('<i class="fas fa-star text-warning"></i>').join('');
            const halfStar = p.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt text-warning"></i>' : '';
            const emptyStars = Array(5 - Math.ceil(p.rating)).fill('<i class="far fa-star text-warning"></i>').join('');
            
            productInfoContainer.innerHTML = `
                <!-- Subtitle -->
                <span class="text-muted fs-7 mb-1 d-block" style="font-size: 0.85rem; font-weight: 500;">${p.subtitle}</span>
                
                <!-- Title -->
                <h1 class="fs-4 fw-bold text-dark mb-2" style="font-family: 'Montserrat', sans-serif; line-height: 1.3;">
                    ${p.title}
                </h1>

                <!-- SKU -->
                <div class="text-secondary mb-3" style="font-size: 0.85rem; font-weight: 500;">
                    <strong>SKU:</strong> ${p.sku}
                </div>

                <!-- Status & Rating -->
                <div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
                    <span class="badge bg-danger px-2.5 py-1.5 fw-semibold" style="font-size: 0.8rem; border-radius: 4px;">${p.status}</span>
                    <div class="d-flex align-items-center">
                        <div class="text-warning me-2" style="font-size: 0.9rem;">
                            ${stars}${halfStar}${emptyStars}
                        </div>
                        <span class="text-muted" style="font-size: 0.82rem; font-weight: 500;">( ${p.reviews} Reviews)</span>
                    </div>
                </div>

                <!-- Pricing -->
                <div class="d-flex align-items-center gap-3 mb-3 flex-wrap">
                    <span class="text-success fw-bold fs-4">${p.discount}</span>
                    <span class="text-muted text-decoration-line-through fs-5">${p.originalPrice}</span>
                    <span class="text-dark fw-bold fs-3">₹ ${p.price}</span>
                </div>

                <!-- Promotion tag -->
                <span class="badge bg-transparent text-white border-0 py-2 px-3 fw-bold mb-4 d-inline-block" style="background-image: linear-gradient(to right, #ec4899, #f43f5e); font-size: 0.8rem; border-radius: 4px;">
                    ${p.offerTag}
                </span>

                <!-- UPI OMG Banner -->
                <div class="rounded-3 overflow-hidden mb-4" style="border: 1px solid #94b9ff; border-radius: 6px;">
                    <!-- Top Part: Blue bg with white text -->
                    <div class="p-3 text-white d-flex align-items-center gap-2" style="background-color: #0087F6; white-space: nowrap; border-top-left-radius: 6px; border-top-right-radius: 6px;">
                        <img src="assets/img/omg.png" alt="OMG Deal" style="height: 42px; object-fit: contain;">
                        <span class="fw-bold" style="font-size: 0.95rem;">Buy this product for only</span>
                        <span class="fw-bold fs-5 text-white">₹${p.upiPrice}</span>
                        <span class="fw-semibold" style="font-size: 0.85rem;">via UPI</span>
                    </div>
                    <!-- Bottom Part: Light Blue bg with dark text -->
                    <div class="px-3 py-2 text-center" style="background-color: #C3D5FF; color: #000000; font-size: 0.82rem; font-weight: 500; font-family: 'Mona Sans Variable', sans-serif; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px;">
                        Best Deal is applied to this product - minimum 50% off
                    </div>
                </div>

                <!-- Size Selector -->
                <div class="size-section mb-4">
                    <h6 class="fw-bold text-dark mb-2" style="font-size: 0.95rem;">Select Size</h6>
                    <div class="d-flex gap-2 flex-wrap">
                        ${p.sizes.map(size => `
                            <button class="btn btn-outline-secondary fw-bold d-inline-flex align-items-center justify-content-center size-btn ${size === p.selectedSize ? 'active' : ''}">${size}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- Quantity and Buttons -->
                <div class="action-section mb-4">
                    <div class="d-flex align-items-center gap-3 flex-wrap mb-3">
                        <!-- Quantity Selector -->
                        <div class="d-flex align-items-center border rounded-2 bg-white px-2 py-1.5" style="height: 40px; border-color: #cbd5e1 !important;">
                            <button id="qtyDecreaseBtn" class="btn btn-link text-decoration-none text-dark p-0 px-2 border-0 fw-bold fs-5" style="box-shadow: none;">-</button>
                            <input id="qtyInput" type="text" class="text-center fw-bold p-0 border-0 bg-transparent" value="1" readonly style="width: 40px;">
                            <button id="qtyIncreaseBtn" class="btn btn-link text-decoration-none text-dark p-0 px-2 border-0 fw-bold fs-5" style="box-shadow: none;">+</button>
                        </div>
                        <!-- Add to Cart Button -->
                        <button id="addToCartBtn" class="btn d-flex align-items-center justify-content-center gap-2 fw-semibold px-4" style="background-color: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; height: 40px; border-radius: 6px;">
                            <i class="fas fa-shopping-cart"></i>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                    
                    <!-- Buy Now Button -->
                    <button class="btn btn-primary w-100 fw-bold py-2.5 mb-3" style="background-color: #0087F6; border: none; border-radius: 6px; font-size: 1rem;">
                        Buy Now
                    </button>

                    <!-- Social Links -->
                    <div class="d-flex gap-4" style="font-size: 0.85rem; font-weight: 500;">
                        <a href="#" class="text-dark text-decoration-none d-flex align-items-center gap-2 hover-text-primary">
                            <i class="fas fa-share-nodes text-muted"></i>
                            <span>Share & Earn</span>
                        </a>
                        <a href="#" id="addToWishlistBtn" class="text-dark text-decoration-none d-flex align-items-center gap-2 hover-text-primary">
                            <i class="far fa-heart text-muted"></i>
                            <span>Add to Wishlist</span>
                        </a>
                    </div>
                </div>

                <!-- Trust Badge -->
                <div class="d-flex align-items-center gap-2 border-top border-bottom py-3 mb-4" style="border-color: #f1f5f9 !important;">
                    <i class="fas fa-shield-halved text-warning fs-4"></i>
                    <div>
                        <h6 class="fw-bold text-dark mb-1" style="font-size: 0.85rem;">100 % Secure Payment</h6>
                        <p class="text-muted mb-0" style="font-size: 0.75rem;">All transactions are encrypted</p>
                    </div>
                </div>

                <!-- Delivery Details -->
                <div class="delivery-section mb-4">
                    <h5 class="fw-bold text-dark mb-3" style="font-size: 1.05rem;">Delivery Details</h5>
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <i class="fas fa-truck text-success"></i>
                        <span class="fw-semibold text-dark" style="font-size: 0.9rem;">Estimated Delivery: ${p.deliveryDays} Days</span>
                    </div>

                    <!-- Trust Badges Grid -->
                    <div class="row text-center bg-white border rounded-3 p-3 g-2" style="border-color: #f1f5f9 !important;">
                        <div class="col-4 border-end cursor-pointer" onclick="openModal('codModal')" style="cursor: pointer;">
                            <i class="fas fa-wallet text-secondary mb-2 fs-5"></i>
                            <div class="fw-bold text-dark" style="font-size: 0.72rem;">Cash on Delivery</div>
                        </div>
                        <div class="col-4 border-end cursor-pointer" onclick="openModal('shippingModal')" style="cursor: pointer;">
                            <i class="fas fa-truck-fast text-secondary mb-2 fs-5"></i>
                            <div class="fw-bold text-dark" style="font-size: 0.72rem;">Free Shipping</div>
                        </div>
                        <div class="col-4 cursor-pointer" onclick="openModal('returnModal')" style="cursor: pointer;">
                            <i class="fas fa-rotate-left text-secondary mb-2 fs-5"></i>
                            <div class="fw-bold text-dark" style="font-size: 0.72rem;">Return</div>
                        </div>
                    </div>
                </div>

                <!-- All Details Accordion -->
                <div class="details-accordion mb-4">
                    <div id="detailsAccordionHeader" class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3" style="cursor: pointer;">
                        <h5 class="fw-bold text-dark mb-0" style="font-size: 1.05rem;">All Details</h5>
                        <div class="d-flex align-items-center gap-2 text-muted" style="font-size: 0.85rem;">
                            <span>Features Descriptions & More</span>
                            <i id="detailsAccordionIcon" class="fas fa-chevron-up"></i>
                        </div>
                    </div>

                    <div id="detailsAccordionContent">
                        <!-- Tab buttons -->
                        <div class="d-flex gap-2 mb-3">
                            <div id="descriptionTabBtn" class="flex-grow-1 text-center py-2 fw-bold border bg-primary text-white border-primary cursor-pointer tab-btn active" style="font-size: 0.95rem; border-radius: 6px;">Description</div>
                            <div id="specificationTabBtn" class="flex-grow-1 text-center py-2 fw-bold border bg-light text-secondary cursor-pointer tab-btn" style="font-size: 0.95rem; border-radius: 6px;">Specification</div>
                        </div>

                        <!-- Tab content description -->
                        <div id="tabContentDescription" style="font-size: 0.82rem; color: #475569; line-height: 1.6;">
                            <p class="mb-2" id="descriptionParagraph">
                                ${p.description}
                            </p>
                            <div class="text-center mt-3">
                                <a href="#" id="seeMoreLessBtn" class="text-decoration-none fw-semibold d-inline-flex align-items-center gap-1 text-secondary" style="font-size: 0.78rem;">
                                    <span id="seeMoreLessText">see less</span>
                                    <i id="seeMoreLessIcon" class="fas fa-chevron-up"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Tab content specification -->
                        <div id="tabContentSpecification" class="d-none" style="font-size: 0.82rem; color: #475569; line-height: 1.6;">
                            <table class="table table-bordered mb-0" style="font-size: 0.82rem;">
                                <tbody>
                                    ${p.specifications ? p.specifications.map(spec => `
                                        <tr>
                                            <td class="fw-semibold bg-light" style="width: 35%;">${spec.name}</td>
                                            <td>${spec.value}</td>
                                        </tr>
                                    `).join('') : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Reviews and Ratings Section -->
                <div class="reviews-section mb-4">
                    <div id="reviewsAccordionHeader" class="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3" style="cursor: pointer;">
                        <h5 class="fw-bold text-dark mb-0" style="font-size: 1.05rem;">Reviews & Ratings</h5>
                        <div class="d-flex align-items-center gap-2 text-muted" style="font-size: 0.85rem;">
                            <span>Customer Feedback and Ratings</span>
                            <i id="reviewsAccordionIcon" class="fas fa-chevron-up"></i>
                        </div>
                    </div>

                    <div id="reviewsSectionContent">
                        <!-- Rating header summary -->
                        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                            <div class="d-flex align-items-center gap-2">
                                <div class="text-success d-flex gap-1" style="font-size: 0.95rem;">
                                    <i class="fas fa-star text-success"></i>
                                    <i class="fas fa-star text-success"></i>
                                    <i class="fas fa-star text-success"></i>
                                    <i class="fas fa-star text-success"></i>
                                    <i class="fas fa-star text-success"></i>
                                </div>
                                <span class="badge bg-success px-2.5 py-1.5 fw-semibold" style="font-size: 0.8rem; border-radius: 4px;">Good</span>
                            </div>
                        </div>

                        <!-- Review List -->
                        <div class="review-list d-flex flex-column gap-3">
                            ${productDetailsData.reviews.map(review => {
                                const reviewStars = Array(review.rating).fill('<i class="fas fa-star text-warning"></i>').join('');
                                const reviewEmptyStars = Array(5 - review.rating).fill('<i class="far fa-star text-muted"></i>').join('');
                                return `
                                    <div class="d-flex gap-3">
                                        <div class="flex-shrink-0">
                                            <div class="bg-secondary rounded-circle d-flex align-items-center justify-content-center text-white" style="width: 40px; height: 40px; font-weight: bold; background-color: #94a3b8 !important;">
                                                <i class="fas fa-user"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-warning mb-1" style="font-size: 0.72rem;">
                                                ${reviewStars}${reviewEmptyStars}
                                            </div>
                                            <div class="text-muted mb-1" style="font-size: 0.72rem; font-weight: 500;">• ${review.timeAgo}</div>
                                            <p class="mb-0 text-dark" style="font-size: 0.82rem; line-height: 1.5;">
                                                ${review.text}
                                            </p>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Render Similar Products
    function renderSimilarProducts() {
        const similarContainer = document.getElementById('similar-products-container');
        if (similarContainer && productDetailsData.similarProducts) {
            similarContainer.innerHTML = productDetailsData.similarProducts.map(product => `
                <div class="col">
                    <div class="card h-100 border product-card bg-white" style="border-color: #f0f3f6 !important; border-radius: 8px;">
                        <div class="position-relative bg-light overflow-hidden d-flex align-items-center justify-content-center product-image-container" style="padding-top: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <img src="${product.image}" alt="${product.title}" class="position-absolute start-50 top-50 translate-middle" style="max-width: 85%; max-height: 85%; object-fit: contain;">
                            <button class="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle opacity-0 product-wishlist-btn" style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s;">
                                <i class="far fa-heart text-danger"></i>
                            </button>
                            <div class="product-card-overlay position-absolute bottom-0 start-0 end-0 p-2 d-flex gap-2 opacity-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); transition: opacity 0.3s;">
                                <button class="btn btn-primary flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #0087F6; border: none;">
                                    Add to Cart
                                </button>
                                <button class="btn btn-warning flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #ffc107; border: none; color: #000;">
                                    Buy Now
                                </button>
                            </div>
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
        if (peoplesContainer && productDetailsData.similarProducts) {
            peoplesContainer.innerHTML = productDetailsData.similarProducts.map(product => `
                <div class="col">
                    <div class="card h-100 border product-card bg-white" style="border-color: #f0f3f6 !important; border-radius: 8px;">
                        <div class="position-relative bg-light overflow-hidden d-flex align-items-center justify-content-center product-image-container" style="padding-top: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <img src="${product.image}" alt="${product.title}" class="position-absolute start-50 top-50 translate-middle" style="max-width: 85%; max-height: 85%; object-fit: contain;">
                            <button class="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle opacity-0 product-wishlist-btn" style="width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s;">
                                <i class="far fa-heart text-danger"></i>
                            </button>
                            <div class="product-card-overlay position-absolute bottom-0 start-0 end-0 p-2 d-flex gap-2 opacity-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); transition: opacity 0.3s;">
                                <button class="btn btn-primary flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #0087F6; border: none;">
                                    Add to Cart
                                </button>
                                <button class="btn btn-warning flex-grow-1 py-1.5" style="font-size: 0.7rem; border-radius: 4px; background-color: #ffc107; border: none; color: #000;">
                                    Buy Now
                                </button>
                            </div>
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

    // Initialize all renders
    renderProductInfo();
    renderSimilarProducts();
    renderPeoplesProducts();
});
