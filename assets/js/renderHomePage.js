function renderHomePage(data) {
    const root = document.getElementById('homeContent');
    if (!root || !data) return;

    function imgAttrs(index) {
        return index < 10 ? 'loading="eager" fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
    }

    function heroSection() {
        const slides = data.heroSlides.map((slide, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <div class="d-flex align-items-center justify-content-center hero-slide-bg position-relative"
                    style="background: url('${slide.image}') no-repeat center center; background-size: cover; color: white;">
                    <div class="position-absolute bottom-0 start-0 mb-4 ms-4 ms-md-5 z-3">
                        <a href="${slide.ctaLink}" class="btn btn-light fw-bold text-dark shadow hero-btn px-4 py-2 px-md-5 py-md-3 text-decoration-none"
                            style="border-radius: 8px;">${slide.ctaText} <i class="fas fa-arrow-right ms-2"></i></a>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="container mb-4 position-relative">
                <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${data.heroSlides.map((_, index) => `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('')}
                    </div>
                    <div class="carousel-inner">${slides}</div>
                    <button class="carousel-control-prev d-none d-md-flex" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style="width: 5%; justify-content: flex-start; margin-left: 0;">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow" style="width: 40px; height: 80px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">
                            <i class="fas fa-chevron-left fs-4"></i>
                        </div>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next d-none d-md-flex" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style="width: 5%; justify-content: flex-end; margin-right: 0;">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow" style="width: 40px; height: 80px; border-top-left-radius: 8px; border-bottom-left-radius: 8px;">
                            <i class="fas fa-chevron-right fs-4"></i>
                        </div>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        `;
    }

    function categorySection() {
        return `
            <div class="container mb-5">
                <div class="rounded shadow-sm py-3 py-md-4 px-3 px-md-5 category-section-bg" style="border: 1px solid #eaeaea;">
                    <div class="d-flex justify-content-between justify-content-md-center justify-content-lg-between align-items-start flex-nowrap icon-category-scroll overflow-auto w-100 px-1 px-md-0" style="gap: 10px;">
                        ${data.categories.map((cat, index) => `
                            <a href="${cat.link}" class="d-flex flex-column align-items-center text-decoration-none icon-cat-link cat-item ${cat.className || ''}">
                                <img src="${cat.image}" alt="${cat.title}" class="cat-icon-img mb-1 mb-md-2" ${imgAttrs(index)}>
                                <span class="text-dark fw-bold text-center cat-icon-text">${cat.title}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function keepShoppingSection() {
        return `
            <div class="container mb-5">
                <div class="rounded-4 p-3 p-md-4" style="background: conic-gradient(from 4.22deg at 110.99% 41.84%, #FDFAFF -29.77deg, #FAEDFF 17.05deg, #E3A3F9 167.23deg, #F59EEC 169.47deg, #FDFAFF 330.23deg, #FAEDFF 377.05deg), linear-gradient(180deg, rgba(137, 198, 255, 0.2) -38.12%, rgba(255, 255, 255, 0.2) 88.77%);">
                    <h3 class="text-dark fw-bold keep-shopping-title mb-3" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${data.keepShopping.title}</h3>
                    <div class="bg-white rounded-0 p-2 p-md-3 shadow-sm d-inline-block" style="max-width: 100%; width: 100%;">
                        <div class="d-flex justify-content-between gap-2 gap-md-3 flex-nowrap hide-scroll">
                            ${data.keepShopping.items.map((item, index) => `
                                <a href="#" class="card border-0 text-center keep-shopping-small-box text-decoration-none">
                                    <div class="position-relative bg-light rounded-4 mb-1 mb-md-2 keep-shopping-small-img" style="overflow: hidden;">
                                        <div class="position-absolute top-0 end-0 m-2 badge bg-dark opacity-50 px-2 py-1" style="font-size: 0.5rem; border-radius: 4px;">AD</div>
                                        <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.alt}" ${imgAttrs(index + 10)}>
                                    </div>
                                    <h6 class="fw-bold mb-1 text-dark">${item.title}</h6>
                                    <p class="text-secondary mb-0">${item.desc}</p>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function electronicsSection(section, sectionIndex) {
        return `
            <div class="container mb-4 position-relative home-deferred-section">
                <div class="rounded-4 p-2 p-md-3" style="background: linear-gradient(180deg, #AEE7FF 0%, #CEEDFA 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif; font-size: 1.1rem;">${section.title}</h3>
                    </div>
                    <div class="row g-2">
                        <div class="col-lg-3 col-md-4">
                            <div class="rounded-3 p-2 d-flex flex-column" style="background: linear-gradient(180deg, #FFC880 0%, #FFFFFF 100%); min-height: 270px;">
                                <div class="d-flex gap-2">
                                    <div class="flex-grow-1">
                                        <h6 class="fw-bold text-dark mb-2" style="font-size: 0.95rem;">Electronics Gadgets</h6>
                                        <ul class="text-muted small mb-0 ps-2" style="font-size: 0.75rem; list-style-type: disc; line-height: 1.5;">
                                            <li>Electronics</li>
                                            <li>Audio & Accessories</li>
                                            <li>Home Appliances</li>
                                            <li>Lighting & Smart Home</li>
                                            <li>Personal Care</li>
                                            <li>Home & Garden</li>
                                            <li>Wearables</li>
                                        </ul>
                                    </div>
                                    <img src="assets/img/homescreenimg.png" class="rounded-3 object-fit-contain flex-shrink-0" alt="Home Screen" style="width: 160px; height: 160px;" ${imgAttrs(30 + sectionIndex * 10)}>
                                </div>
                                <img src="assets/img/electronicimg.png" class="w-100 rounded-3 object-fit-cover " alt="Electronics" style="height: 80px; margin-top:80px!important" ${imgAttrs(31 + sectionIndex * 10)}>
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-8">
                            <div class="row g-2">
                                ${section.items.map((item, index) => `
                                    <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                                        <a href="#" class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white text-decoration-none">
                                            <img src="${item.image}" class="w-100 object-fit-cover" alt="${item.title}" style="height: 120px;" ${imgAttrs(32 + sectionIndex * 10 + index)}>
                                            <div class="text-center text-white fw-bold p-2" style="background: linear-gradient(135deg, #4285ff, #10c3bd);">
                                                <div style="font-size: 0.7rem;">${item.title}</div>
                                                <small class="fw-medium" style="font-size: 0.65rem;">${item.subtitle}</small>
                                            </div>
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function smallProductSection(section, sectionIndex) {
        return `
            <div class="container mb-5 position-relative home-deferred-section">
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">${section.title}</h3>
                    </div>
                    <div class="row g-3">
                        ${section.items.map((item, index) => `
                            <div class="col-lg col-md-4 col-sm-6 col-6">
                                <a href="#" class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white text-decoration-none">
                                    <img src="${item.image}" class="w-100 object-fit-cover" alt="${item.title}" style="height: 160px;" ${imgAttrs(20 + sectionIndex * 10 + index)}>
                                    <div class="text-center text-white fw-bold p-3" style="background: linear-gradient(135deg, #4285ff, #10c3bd);">
                                        <div>${item.title}</div>
                                        <small class="fw-medium">${item.subtitle}</small>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function featuredProductsSection(section, sectionIndex) {
        return `
            <div class="container mb-5 position-relative home-deferred-section">
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(0deg, rgba(94, 219, 250, 0.05) 0%, #DFE9FF 26.18%, #ACF3FF 100%); border: 3px solid #FFC107;">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">${section.title}</h3>
                        <a href="#" class="text-decoration-none fw-semibold" style="color: #0087F6; font-size: 0.9rem;">View All</a>
                    </div>
                    <div class="row g-3">
                        ${section.items.map((item, index) => `
                            <div class="col-lg col-md-4 col-sm-6 col-6">
                                <a href="#" class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white text-decoration-none">
                                    <img src="${item.image}" class="w-100 object-fit-cover" alt="${item.title}" style="height: 160px;" ${imgAttrs(20 + sectionIndex * 10 + index)}>
                                    <div class="text-center text-white fw-bold p-3" style="background: #3B95EE;">
                                        <div>${item.title}</div>
                                        <small class="fw-medium">${item.subtitle}</small>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function doubleBannerSection(banner, index) {
        return `
            <div class="container mb-5 home-deferred-section">
                <div class="row g-3">
                    <div class="col-md-6"><img src="${banner.leftImage}" class="w-100 rounded-3 shadow-sm object-fit-cover" alt="Offer banner" style="height: 240px;" ${imgAttrs(40 + index)}></div>
                    <div class="col-md-6"><img src="${banner.rightImage}" class="w-100 rounded-3 shadow-sm object-fit-cover" alt="Offer banner" style="height: 240px;" ${imgAttrs(42 + index)}></div>
                </div>
            </div>
        `;
    }

   

    function bannerSection(banner, index) {
        if (banner.leftImage && banner.rightImage) {
            return doubleBannerSection(banner, index);
        }
        return singleBannerSection(banner, index);
    }

    function onSaleSection() {
        return `
            <div class="container mb-5 position-relative home-deferred-section">
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(180deg, #d4edda 0%, #a8e6cf 50%, #88d8b0 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">On Sale</h3>
                    </div>
                    <div class="row g-3">
                        ${data.productGrid.slice(0, 5).map((item, index) => `
                            <div class="col-12 col-sm-6 col-md-4 col-lg col-xl" style="flex: 0 0 20%; max-width: 20%;">
                                <a href="#" class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white text-decoration-none">
                                    <img src="${item.image}" class="w-100 object-fit-cover" alt="${item.title}" style="height: 160px;" ${imgAttrs(50 + index)}>
                                    <div class="text-center text-white fw-bold p-3" style="background: linear-gradient(180deg, #05970E 0%, #56DF5F 100%);">
                                        <div>${item.title}</div>
                                        <small class="fw-medium">Sale</small>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
 function singleBannerSection(banner, index) {
        return `
            <div class="container mb-5 home-deferred-section">
                <img src="${banner.image}" class="w-100 rounded-3 shadow-sm object-fit-cover" alt="Featured banner" style="height: 260px;" ${imgAttrs(44 + index)}>
            </div>
        `;
    }
    
    function gridCard(product, index) {
        return `
            <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white p-2 product-card">
                    <div class="rounded-2 overflow-hidden mb-2">
                        <div class="position-relative product-card-img-wrapper">
                            <img src="${product.image}" class="w-100 h-100 object-fit-cover" alt="${product.title}" ${imgAttrs(50 + index)}>
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
                        <div class="d-flex gap-1 p-2 align-items-center product-card-badges" style="background-color: #dbdbdb; font-weight: 600;">
                            <span class="px-1 py-1 rounded bg-white text-dark border text-center" style="flex: 1;">${product.badge}</span>
                            <span class="px-1 py-1 rounded text-white text-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); flex: 1;">Refer 17</span>
                            <span class="px-1 py-1 rounded text-dark border text-center" style="background-color: #fff9e6; flex: 1;">Earn 67</span>
                        </div>
                    </div>
                    <div class="px-1 pb-1">
                        <div class="d-flex align-items-center mb-1 text-truncate">
                            <span class="fw-bold text-dark me-2 product-card-title">${product.title}</span>
                            <span class="text-secondary text-truncate product-card-desc">${product.desc}</span>
                        </div>
                        <div class="d-flex align-items-center flex-wrap gap-2">
                            <span class="text-muted text-decoration-line-through product-card-original-price">${product.oldPrice}</span>
                            <span class="fw-bold text-dark product-card-offer-price">${product.price}</span>
                            <span class="product-card-promo" style="color: #7b8de6;">${product.offer}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    root.innerHTML = [
        heroSection(),
        categorySection(),
        keepShoppingSection(),
        (() => {
            let html = '';
            data.productSections.forEach((section, index) => {
                if (index === 0) {
                    html += smallProductSection(section, index);
                    // Use first banner as double banner if it has left and right images
                    if (data.banners[0] && data.banners[0].leftImage && data.banners[0].rightImage) {
                        html += doubleBannerSection(data.banners[0], 0);
                    }
                    html += onSaleSection();
                } else if (section.title === 'Explore Electronics Products') {
                    html += electronicsSection(section, index);
                    // Use second banner as single banner if it exists and doesn't have both images
                    if (data.banners[1] && (!data.banners[1].leftImage || !data.banners[1].rightImage)) {
                        html += singleBannerSection(data.banners[1], 1);
                    }
                } else if (section.title === 'Featured Products') {
                    html += featuredProductsSection(section, index);
                } else {
                    html += smallProductSection(section, index);
                }
            });
            return html;
        })(),
        `<div class="container mb-5 home-deferred-section"><div class="row g-3">${data.productGrid.map(gridCard).join('')}</div></div>`
    ].join('');
}
