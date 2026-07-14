function renderHomePage(data) {
    if (!window.hasImgErrorListener) {
        window.addEventListener('error', function(e) {
            if (e.target && e.target.tagName === 'IMG') {
                e.target.onerror = null;
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
            }
        }, true);
        window.hasImgErrorListener = true;
    }

    const root = document.getElementById('homeContent');
    if (!root || !data) return;

    function imgAttrs(index) {
        return index < 10 ? 'loading="eager" fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
    }

    // Add responsive styling for horizontal scroll cards
    function getViewAllLink(title) {
        let link = 'category.html?category=All%20Category';
        if (title === 'TOP Refer Product' || title === 'Top Refer Product' || title === 'Top Refer') {
            link += '&status=Top%20Refer';
        } else if (title === 'On Sale') {
            link += '&status=On%20Sale';
        } else if (title === 'Electronic Gadgets') {
            link = 'category.html?category=Electronics';
        } else if (title === 'Featured Products') {
            link += '&status=Featured';
        }
        return link;
    }

    if (!document.getElementById('horizontal-scroll-card-styles')) {
        const style = document.createElement('style');
        style.id = 'horizontal-scroll-card-styles';
        style.innerHTML = `
            .horizontal-scroll-card {
                width: 220px;
            }
            .horizontal-scroll-card-electronics {
                width: 200px;
            }
            .electronics-grid-container {
                grid-template-rows: repeat(2, 1fr);
                grid-auto-flow: column;
            }
            .keep-shopping-small-img {
                height: 120px;
            }
            @media (max-width: 767px) {
                .horizontal-scroll-card, .horizontal-scroll-card-electronics {
                    width: 155px;
                }
                .horizontal-scroll-card .card-img-container {
                    height: 140px !important;
                }
                .card-title-text {
                    font-size: 0.82rem !important;
                }
                .card-price-text {
                    font-size: 0.92rem !important;
                }
                .horizontal-scroll-card .card-old-price-text {
                    font-size: 0.65rem !important;
                }
                .horizontal-scroll-card .card-upi-text {
                    font-size: 0.6rem !important;
                }
                .horizontal-scroll-card .card-discount-text {
                    font-size: 0.7rem !important;
                    padding-top: 2px !important;
                    padding-bottom: 2px !important;
                }
                .on-sale-card-img {
                    height: 160px !important;
                }
                .on-sale-card-title {
                    font-size: 0.8rem !important;
                    padding: 8px !important;
                }
                .electronics-gadgets-img {
                    max-height: 120px !important;
                    transform: scale(1) translateY(0) !important;
                }
                .banner-carousel-img {
                    height: 150px !important;
                }
                .electronics-grid-container {
                    grid-template-rows: 1fr !important;
                }
                .keep-shopping-small-img {
                    height: 140px !important;
                }
                #homeContent > .container {
                    margin-bottom: 15px !important;
                }
                #homeContent > .container:first-child {
                    margin-top: 12px !important;
                }
                .custom-indicators {
                    margin-top: 10px !important;
                }
            }
            .electronics-gadgets-img {
                max-height: 170px;
                transform: scale(1.15) translateY(5px);
                transform-origin: bottom center;
            }
            .banner-carousel-img {
                height: 240px;
            }
            @media (min-width: 768px) {
                .banner-multi-carousel .carousel-item-next.carousel-item-start,
                .banner-multi-carousel .carousel-item-prev.carousel-item-end {
                    transform: translateX(0) !important;
                }
                .banner-multi-carousel .carousel-item.active.carousel-item-start {
                    transform: translateX(-50%) !important;
                }
                .banner-multi-carousel .carousel-item.active.carousel-item-end {
                    transform: translateX(50%) !important;
                }
                .banner-multi-carousel .carousel-item-next {
                    transform: translateX(50%) !important;
                }
                .banner-multi-carousel .carousel-item-prev {
                    transform: translateX(-50%) !important;
                }
            }
            .custom-indicators {
                position: static !important;
                margin-top: 20px !important;
                margin-bottom: 0 !important;
                display: flex;
                justify-content: center;
                gap: 8px;
            }
            .custom-indicators [data-bs-target] {
                width: 6px !important;
                height: 6px !important;
                border-radius: 50% !important;
                background-color: #d3d3d3 !important;
                border: none !important;
                margin: 0 !important;
                padding: 0 !important;
                opacity: 1 !important;
                transition: all 0.3s ease !important;
            }
            .custom-indicators .active {
                width: 18px !important;
                border-radius: 10px !important;
                background-color: #808080 !important;
            }
        `;
        document.head.appendChild(style);
    }

    function heroSection() {
        const slides = data.heroSlides.map((slide, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <a href="${slide.ctaLink}" class="d-block text-decoration-none">
                    <div class="d-flex align-items-center justify-content-center hero-slide-bg position-relative"
                        style="background: url('${slide.image}') no-repeat center center; background-size: cover; color: white;">
                    </div>
                </a>
            </div>
        `).join('');

        return `
            <div class="container mb-4 position-relative pt-3 pt-md-0">
                <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
                    <div class="carousel-inner">${slides}</div>
                    <div class="carousel-indicators custom-indicators">
                        ${data.heroSlides.map((_, index) => `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('')}
                    </div>
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
                    <div class="d-flex justify-content-between align-items-start flex-nowrap hide-scroll icon-category-scroll overflow-auto w-100 px-1 px-md-0" style="gap: 15px 10px;">
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
        let keepShoppingTitle = data.keepShopping.title;
        let isUserLoggedIn = false;
        
        if (typeof getAuthUser === 'function') {
            const user = getAuthUser();
            if (user && user.name) {
                isUserLoggedIn = true;
                const firstName = user.name.split(' ')[0];
                // Capitalize first letter of name
                const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                keepShoppingTitle = keepShoppingTitle.replace('User Name', capitalizedFirstName);
            }
        }
        
        if (!isUserLoggedIn) {
            keepShoppingTitle = keepShoppingTitle.replace(' User Name', '').replace('User Name', '');
        }

        return `
            <div class="container mb-5">
                <div class="rounded-4 p-3 p-md-4" style="background: conic-gradient(from 4.22deg at 110.99% 41.84%, #FDFAFF -29.77deg, #FAEDFF 17.05deg, #E3A3F9 167.23deg, #F59EEC 169.47deg, #FDFAFF 330.23deg, #FAEDFF 377.05deg), linear-gradient(180deg, rgba(137, 198, 255, 0.2) -38.12%, rgba(255, 255, 255, 0.2) 88.77%);">
                    <h3 class="text-dark fw-bold keep-shopping-title mb-3" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">${keepShoppingTitle}</h3>
                    <div class="bg-white rounded-0 p-2 p-md-3 shadow-sm d-inline-block" style="max-width: 100%; width: 100%;">
                        <div class="d-flex justify-content-between gap-2 gap-md-3 flex-nowrap hide-scroll">
                            ${data.keepShopping.items.map((item, index) => `
                                <a href="product-details.html?product=${encodeURIComponent(item.title)}" class="border-0 text-center keep-shopping-small-box text-decoration-none bg-transparent d-block" style="min-width: 120px; max-width: 140px;">
                                    <div class="position-relative bg-light rounded-4 mb-1 mb-md-2 keep-shopping-small-img" style="overflow: hidden;">
                                        <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.alt}" ${imgAttrs(index + 10)}>
                                    </div>
                                    <h6 class="fw-bold mb-1 text-dark text-truncate w-100" style="font-size: 0.9rem;">${item.desc}</h6>
                                    <p class="text-secondary mb-0 text-truncate w-100" style="font-size: 0.75rem;">${item.title}</p>
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
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(180deg, #AEE7FF 0%, #CEEDFA 100%);">
                    <div class="d-flex justify-content-end mb-2">
                        <a href="${getViewAllLink(section.title)}" class="text-decoration-none view-all-arrow-btn" aria-label="View All" style="background-color:#0087F6;"><i class="fas fa-arrow-right"></i></a>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-4 col-md-5">
                            <div class="rounded-3 p-4 d-flex flex-column position-relative overflow-hidden shadow-sm" style="background: linear-gradient(135deg, #FFCF87 0%, #FFE9C2 100%); height: 100%; min-height: 380px;">
                                <div class="position-relative z-2" style="width: 60%;">
                                    <h4 class="fw-bolder text-dark mb-3" style="font-family: 'Rubik', sans-serif; font-size: 1.8rem; line-height: 1.2;">
                                        ${section.title}
                                    </h4>
                                    <ul class="text-dark fw-medium mb-0 ps-3" style="font-size: 0.95rem; list-style-type: disc; line-height: 1.8;">
                                        <li>Electronics</li>
                                        <li>Audio & Accessories</li>
                                        <li>Home Appliances</li>
                                        <li>Lighting & Smart Home</li>
                                        <li>Personal Care</li>
                                        <li>Home & Garden</li>
                                        <li>Wearables</li>
                                    </ul>
                                </div>
                                <img src="assets/img/homescreenimg copy.png" class="position-absolute top-0 end-0 z-1 pe-2 pt-2" alt="Woman" style="width: 50%; height: auto; max-width: 220px; object-fit: contain;" ${imgAttrs(30 + sectionIndex * 10)}>
                                <div class="mt-auto z-2 w-100 text-end text-md-center position-absolute bottom-0 start-0 pe-none">
                                    <img src="assets/img/electronicimg.png" class="object-fit-contain electronics-gadgets-img" alt="Electronics" ${imgAttrs(31 + sectionIndex * 10)}>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7 position-relative">
                            <button class="btn position-absolute top-50 start-0 translate-middle-y z-3 electronics-scroll-left p-0 border-0 bg-transparent" style="margin-left: 0; display: none;">
                                <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-right-radius: 12px; border-bottom-right-radius: 12px; box-shadow: 2px 0 5px rgba(0,0,0,0.1);">
                                    <i class="fas fa-chevron-left fs-5"></i>
                                </div>
                            </button>
                            <button class="btn position-absolute top-50 end-0 translate-middle-y z-3 electronics-scroll-right p-0 border-0 bg-transparent" style="margin-right: 0;">
                                <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; box-shadow: -2px 0 5px rgba(0,0,0,0.1);">
                                    <i class="fas fa-chevron-right fs-5"></i>
                                </div>
                            </button>
                            <div class="d-grid gap-3 overflow-auto hide-scroll electronics-scroll-container pb-2 electronics-grid-container" style="scroll-behavior: smooth;">
                                ${section.items.map((item, index) => `
                                    <div class="flex-shrink-0 horizontal-scroll-card-electronics">
                                        ${smallCardTemplate(item, sectionIndex, index, true)}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function smallCardTemplate(item, sectionIndex, index, hasImagePadding = false, bgColor = '#0087F6') {
        // Strip any ₹ symbol and spaces, then parse as numbers
        const rawOldPrice = parseFloat(String(item.oldPrice || '').replace(/[₹,\s]/g, '')) || 80000;
        const rawPrice    = parseFloat(String(item.price    || '').replace(/[₹,\s]/g, '')) || 60000;
        const upiOffer    = item.upiOffer || 5000;
        const discount    = Math.round(((rawOldPrice - rawPrice) / rawOldPrice) * 100);
        
        const imagePaddingClass = hasImagePadding ? 'p-2 pb-0' : '';
        const imageRoundedClass = hasImagePadding ? 'rounded-2' : '';

        return `
            <a href="product-details.html?product=${encodeURIComponent(item.title)}" class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 text-decoration-none d-flex flex-column" style="background: ${bgColor};">
                <div class="${imagePaddingClass}">
                    <div class="bg-white ${imageRoundedClass} mb-2 w-100 d-flex align-items-center justify-content-center overflow-hidden card-img-container" style="height: 180px;">
                        <img src="${item.image}" class="w-100 h-100 object-fit-cover" alt="${item.title}" ${imgAttrs(20 + sectionIndex * 10 + index)}>
                    </div>
                </div>
                <div class="p-2 pt-0 flex-grow-1">
                    <div class="text-white fw-bold text-truncate mb-1 card-title-text" style="font-size: 0.85rem;">${item.title}</div>
                    <div class="d-flex align-items-baseline mb-1 flex-wrap">
                        <span class="text-white fw-bold card-price-text" style="font-size: 0.95rem;">₹${rawPrice}</span>
                        <span class="text-white-50 text-decoration-line-through fw-normal ms-2 card-old-price-text" style="font-size: 0.75rem;">₹${rawOldPrice}</span>
                    </div>
                    <div class="text-white fw-medium card-upi-text" style="font-size: 0.7rem;">₹${upiOffer} with UPI offer</div>
                </div>
                <div class="text-dark fw-bold text-center py-1 w-100 mt-auto card-discount-text" style="font-size: 0.8rem; background: linear-gradient(to bottom, #ffffff, #e0e0e0);">
                    Up to ${discount}% off
                </div>
            </a>
        `;
    }

    function smallProductSection(section, sectionIndex, cardBgColor = '#0087F6') {
        return `
            <div class="container mb-5 position-relative home-deferred-section">
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">${section.title}</h3>
                        <a href="${getViewAllLink(section.title)}" class="text-decoration-none view-all-arrow-btn" aria-label="View All" style="background-color:${cardBgColor.startsWith('linear') ? '#4588FF' : cardBgColor};"><i class="fas fa-arrow-right"></i></a>
                    </div>
                    <button class="btn position-absolute top-50 start-0 translate-middle-y z-3 small-scroll-left p-0 border-0 bg-transparent" style="margin-left: 0; display: none;" data-target="small-scroll-${sectionIndex}">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-right-radius: 12px; border-bottom-right-radius: 12px; box-shadow: 2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-left fs-5"></i>
                        </div>
                    </button>
                    <button class="btn position-absolute top-50 end-0 translate-middle-y z-3 small-scroll-right p-0 border-0 bg-transparent" style="margin-right: 0;" data-target="small-scroll-${sectionIndex}">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; box-shadow: -2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-right fs-5"></i>
                        </div>
                    </button>
                    <div class="d-flex gap-3 overflow-auto hide-scroll pb-2" id="small-scroll-${sectionIndex}" style="scroll-behavior: smooth;">
                        ${section.items.map((item, index) => `
                            <div class="flex-shrink-0 horizontal-scroll-card">
                                ${smallCardTemplate(item, sectionIndex, index, false, cardBgColor)}
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
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(0deg, rgba(94, 219, 250, 0.05) 0%, #DFE9FF 26.18%, #ACF3FF 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">${section.title}</h3>
                        <a href="${getViewAllLink(section.title)}" class="text-decoration-none view-all-arrow-btn" aria-label="View All" style="background-color:#0087F6;"><i class="fas fa-arrow-right"></i></a>
                    </div>
                    <button class="btn position-absolute top-50 start-0 translate-middle-y z-3 featured-scroll-left p-0 border-0 bg-transparent" style="margin-left: 0; display: none;" data-target="featured-scroll-${sectionIndex}">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-right-radius: 12px; border-bottom-right-radius: 12px; box-shadow: 2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-left fs-5"></i>
                        </div>
                    </button>
                    <button class="btn position-absolute top-50 end-0 translate-middle-y z-3 featured-scroll-right p-0 border-0 bg-transparent" style="margin-right: 0;" data-target="featured-scroll-${sectionIndex}">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; box-shadow: -2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-right fs-5"></i>
                        </div>
                    </button>
                    <div class="d-flex gap-3 overflow-auto hide-scroll pb-2" id="featured-scroll-${sectionIndex}" style="scroll-behavior: smooth;">
                        ${section.items.map((item, index) => `
                            <div class="flex-shrink-0 horizontal-scroll-card">
                                ${smallCardTemplate(item, sectionIndex, index)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function bannerCarouselSection(banner, index, itemsPerSlide = 1, displayClass = '', idSuffix = '') {
        if (!banner || !banner.images) return '';
        let slidesHtml = '';
        for (let i = 0; i < banner.images.length; i++) {
            let chunk = [];
            for (let j = 0; j < itemsPerSlide; j++) {
                chunk.push(banner.images[(i + j) % banner.images.length]);
            }
            const cols = chunk.map((img, j) => `
                <div class="${itemsPerSlide === 2 ? 'col-md-6 col-12' : 'col-12'}">
                    <a href="#"><img src="${img}" class="w-100 rounded-3 shadow-sm object-fit-cover banner-carousel-img" alt="Offer banner" ${imgAttrs(40 + index * 10 + i + j)}></a>
                </div>
            `).join('');
            
            slidesHtml += `
                <div class="carousel-item ${i === 0 ? 'active' : ''}" data-bs-interval="2000">
                    <div class="row g-3">
                        ${cols}
                    </div>
                </div>
            `;
        }
        return `
            <div class="container mb-5 home-deferred-section ${displayClass}">
                <div id="bannerCarousel-${index}${idSuffix}" class="carousel slide banner-multi-carousel" data-bs-ride="carousel" data-bs-interval="2000">
                    <div class="carousel-inner">${slidesHtml}</div>
                    <div class="carousel-indicators custom-indicators">
                        ${banner.images.map((_, i) => `<button type="button" data-bs-target="#bannerCarousel-${index}${idSuffix}" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" ${i === 0 ? 'aria-current="true"' : ''}></button>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function onSaleSection() {
        return `
            <div class="container mb-5 position-relative home-deferred-section">
                <div class="rounded-4 p-3 p-md-4" style="background: linear-gradient(180deg, #d4edda 0%, #a8e6cf 50%, #88d8b0 100%);">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="mb-0 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">On Sale</h3>
                        <a href="${getViewAllLink('On Sale')}" class="text-decoration-none view-all-arrow-btn" aria-label="View All" style="background-color:#05970E;"><i class="fas fa-arrow-right"></i></a>
                    </div>
                    <button class="btn position-absolute top-50 start-0 translate-middle-y z-3 sale-scroll-left p-0 border-0 bg-transparent" style="margin-left: 0; display: none;" data-target="sale-scroll">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-right-radius: 12px; border-bottom-right-radius: 12px; box-shadow: 2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-left fs-5"></i>
                        </div>
                    </button>
                    <button class="btn position-absolute top-50 end-0 translate-middle-y z-3 sale-scroll-right p-0 border-0 bg-transparent" style="margin-right: 0;" data-target="sale-scroll">
                        <div class="bg-white text-dark d-flex align-items-center justify-content-center shadow-sm" style="width: 40px; height: 80px; border-top-left-radius: 12px; border-bottom-left-radius: 12px; box-shadow: -2px 0 5px rgba(0,0,0,0.1);">
                            <i class="fas fa-chevron-right fs-5"></i>
                        </div>
                    </button>
                    <div class="d-flex gap-3 overflow-auto hide-scroll pb-2" id="sale-scroll" style="scroll-behavior: smooth;">
                        ${data.productGrid.map((item, index) => `
                            <div class="flex-shrink-0 horizontal-scroll-card">
                                ${smallCardTemplate(item, 99, index, false, 'linear-gradient(180deg, #05970E 0%, #56DF5F 100%)')}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function gridCard(product, index) {
        const productId = product.id || 'home-prod-' + index;
        const productJson = encodeURIComponent(JSON.stringify({
            id: productId,
            title: product.title,
            image: product.image,
            price: product.price,
            originalPrice: product.oldPrice || '',
            discount: product.offer || ''
        }));
        
        let inCart = false;
        if (typeof isProductInCart === 'function') {
            inCart = isProductInCart(productId);
        }

        const addToCartBtn = inCart 
            ? `<button class="btn btn-success flex-grow-1 py-2 d-flex align-items-center justify-content-center" onclick="event.preventDefault(); window.location.href='mycart.html';" style="font-size: 0.7rem; border-radius: 4px; border: none;"><i class="fas fa-shopping-cart me-2"></i> Go to Cart</button>`
            : `<button class="btn btn-success flex-grow-1 py-2 add-to-cart-btn text-white d-flex align-items-center justify-content-center" data-product="${productJson}" style="font-size: 0.7rem; border-radius: 4px; border: none;"><i class="fas fa-shopping-cart me-2"></i> Add to Cart</button>`;

        return `
            <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white p-2 product-card">
                    <div class="rounded-2 overflow-hidden mb-2">
                        <div class="position-relative product-card-img-wrapper" style="cursor: pointer;" onclick="if(!event.target.closest('.btn')){ window.location.href='product-details.html?product=${encodeURIComponent(product.title)}'; }">
                            <img src="${product.image}" class="w-100 h-100 object-fit-cover" alt="${product.title}" ${imgAttrs(50 + index)}>
                            <button class="btn border-0 position-absolute opacity-0 product-wishlist-btn card-icon-wishlist" title="Add to Wishlist" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 8px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; font-size: 1.25rem; z-index: 5;">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn border-0 position-absolute opacity-0 product-share-btn card-icon-share" title="Share" style="background-color: #ffffff !important; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.15); top: 45px; right: 8px; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; font-size: 1.1rem; z-index: 5;" onclick="event.stopPropagation();">
                                <i class="fa-regular fa-paper-plane"></i>
                            </button>
                            <div class="product-card-overlay position-absolute bottom-0 start-0 end-0 p-2 d-none d-md-flex gap-2 opacity-0" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); transition: opacity 0.3s;" onclick="event.stopPropagation();">
                                ${addToCartBtn}
                                <button class="btn btn-primary flex-grow-1 py-2 d-flex align-items-center justify-content-center fw-bold" style="font-size: 0.7rem; border-radius: 4px; border: none; color: #ffffff;">
                                    <i class="fas fa-bolt me-1"></i> Buy Now
                                </button>
                            </div>
                        </div>
                        <div class="d-flex gap-1 p-2 align-items-center product-card-badges" style="background-color: #dbdbdb; font-weight: 600;">
                            <span class="px-1 py-1 rounded text-dark text-center" style="background-color: #F8D7FF; flex: 1;">${product.badge}</span>
                            <span class="px-1 py-1 rounded text-dark text-center" style="background-color: #CBF1C4; flex: 1;">Refer 17</span>
                            <span class="px-1 py-1 rounded text-dark text-center" style="background-color: #FBEED5; flex: 1;">Earn 67</span>
                        </div>
                    </div>
                    <div class="px-1 pb-1" style="cursor: pointer;" onclick="window.location.href='product-details.html?product=${encodeURIComponent(product.title)}';">
                        <div class="d-flex align-items-center mb-1 text-truncate">
                            <span class="fw-bold text-dark me-2 product-card-title">${product.title}</span>
                            <span class="text-secondary text-truncate product-card-desc">${product.desc}</span>
                        </div>
                        <div class="d-flex align-items-center flex-wrap gap-2">
                            <span class="text-muted text-decoration-line-through product-card-original-price">₹ ${product.oldPrice}</span>
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
                    html += smallProductSection(section, index, 'linear-gradient(90deg, #4588FF 14.42%, #00C9C1 100%)');
                    if (data.banners[0]) {
                        html += bannerCarouselSection(data.banners[0], 0, 2, 'd-none d-md-block', '-desktop');
                        html += bannerCarouselSection(data.banners[0], 0, 1, 'd-block d-md-none', '-mobile');
                    }
                    html += onSaleSection();
                } else if (section.title === 'Electronic Gadgets') {
                    html += electronicsSection(section, index);
                    if (data.banners[1]) {
                        html += bannerCarouselSection(data.banners[1], 1, 1);
                    }
                } else if (section.title === 'Featured Products') {
                    html += featuredProductsSection(section, index);
                } else {
                    html += smallProductSection(section, index);
                }
            });
            return html;
        })(),
        `<div class="container mb-5 home-deferred-section">
            <h3 class="mb-4 text-dark fw-bold keep-shopping-title" style="font-family: 'Rubik', sans-serif;">Explore Our Range</h3>
            <div class="row g-3">${data.productGrid.map(gridCard).join('')}</div>
            <div class="text-center mt-4">
                <a href="category.html?category=All%20Category" class="btn text-white px-4 py-2 shadow-sm fw-bold" style="background-color: #0087F6; border-radius: 8px;">Explore More</a>
            </div>
        </div>`
    ].join('');

    setTimeout(() => {
        const leftBtn = root.querySelector('.electronics-scroll-left');
        const rightBtn = root.querySelector('.electronics-scroll-right');
        const container = root.querySelector('.electronics-scroll-container');
        
        if (container && leftBtn && rightBtn) {
            const updateButtons = () => {
                if (window.innerWidth < 768) {
                    leftBtn.style.display = 'none';
                    rightBtn.style.display = 'none';
                } else {
                    leftBtn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
                    rightBtn.style.display = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5) ? 'block' : 'none';
                }
            };
            
            leftBtn.addEventListener('click', () => {
                container.scrollBy({ left: -220, behavior: 'smooth' });
            });
            rightBtn.addEventListener('click', () => {
                container.scrollBy({ left: 220, behavior: 'smooth' });
            });
            
            container.addEventListener('scroll', updateButtons);
            window.addEventListener('resize', updateButtons);
            updateButtons();
        }
        
        const setupScroll = (leftBtnClass, rightBtnClass) => {
            document.querySelectorAll('.' + leftBtnClass).forEach(btn => {
                const containerId = btn.getAttribute('data-target');
                const container = document.getElementById(containerId);
                const rightBtn = document.querySelector(`[data-target="${containerId}"].${rightBtnClass}`);
                if(container && rightBtn) {
                    const update = () => {
                        if (window.innerWidth < 768) {
                            btn.style.display = 'none';
                            rightBtn.style.display = 'none';
                        } else {
                            btn.style.display = container.scrollLeft > 0 ? 'block' : 'none';
                            rightBtn.style.display = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5) ? 'block' : 'none';
                        }
                    };
                    btn.onclick = () => container.scrollBy({ left: -240, behavior: 'smooth' });
                    rightBtn.onclick = () => container.scrollBy({ left: 240, behavior: 'smooth' });
                    container.addEventListener('scroll', update);
                    window.addEventListener('resize', update);
                    update();
                }
            });
        };
        setupScroll('small-scroll-left', 'small-scroll-right');
        setupScroll('featured-scroll-left', 'featured-scroll-right');
        setupScroll('sale-scroll-left', 'sale-scroll-right');

        // Add to Cart logic
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof addToCart === 'function') {
                    try {
                        const product = JSON.parse(decodeURIComponent(this.getAttribute('data-product')));
                        addToCart(product, 1, this);
                        this.style.backgroundColor = ''; // let the btn-success class take over
                    } catch (err) {
                        console.error('Error adding to cart', err);
                    }
                }
            });
        });
    }, 100);
}
