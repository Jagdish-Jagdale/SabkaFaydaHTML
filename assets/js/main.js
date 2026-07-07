/* Scroll Position Preservation */
/* Internet Connection Status Check */
(function() {
    function showOfflineOverlay() {
        if (document.getElementById('offline-overlay-container')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'offline-overlay-container';
        overlay.className = 'vh-100 d-flex align-items-center justify-content-center bg-white text-center m-0 overflow-hidden';
        overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; z-index:999999;';
        
        overlay.innerHTML = `
            <div class="container px-4">
                <h1 class="no-internet-title" style="font-size: 1.8rem; font-weight: 700; color: #2c3e50; margin-bottom: 2rem;">No Internet Connection</h1>
                <img src="assets/img/nointernetimg.png" alt="No Internet" class="no-internet-img" style="max-width: 100%; height: auto; max-height: 250px; margin-bottom: 2rem; object-fit: contain;">
                <p class="no-internet-text" style="color: #7f8c8d; font-size: 1.05rem; font-weight: 500;">
                    Make sure wifi or cellular data is turned on and then <a href="#" id="retry-connection-btn" class="try-again-link" style="color: #7b61ff; text-decoration: none; font-weight: 600;">try again.</a>
                </p>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        document.getElementById('retry-connection-btn').addEventListener('click', function(e) {
            e.preventDefault();
            if (navigator.onLine) {
                hideOfflineOverlay();
            } else {
                const btn = this;
                const origText = btn.innerText;
                btn.innerText = "Still offline...";
                setTimeout(() => { btn.innerText = origText; }, 1500);
            }
        });
    }

    function hideOfflineOverlay() {
        const overlay = document.getElementById('offline-overlay-container');
        if (overlay) {
            overlay.remove();
            document.body.style.overflow = '';
        }
    }

    function checkConnection() {
        if (!navigator.onLine) {
            showOfflineOverlay();
        } else {
            hideOfflineOverlay();
        }
    }
    
    // Check initially
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkConnection);
    } else {
        checkConnection();
    }

    // Listen for connection changes
    window.addEventListener('offline', checkConnection);
    window.addEventListener('online', checkConnection);
})();

(function() {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Save scroll position and current page URL before page unload
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.pageYOffset || document.documentElement.scrollTop);
        sessionStorage.setItem('currentPageUrl', window.location.href);
    });

    // Restore scroll position only if it's the same page (refresh)
    function restoreScrollPosition() {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        const savedPageUrl = sessionStorage.getItem('currentPageUrl');
        const currentPageUrl = window.location.href;

        // Only restore if the saved URL matches current URL (same page refresh)
        if (scrollPosition !== null && savedPageUrl === currentPageUrl) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            sessionStorage.removeItem('scrollPosition');
            sessionStorage.removeItem('currentPageUrl');
        } else {
            // For new pages or different URLs, ensure page starts at top
            window.scrollTo(0, 0);
            sessionStorage.removeItem('scrollPosition');
            sessionStorage.removeItem('currentPageUrl');
        }
    }

    // Restore immediately on page load (before content renders)
    restoreScrollPosition();

    // Also restore on DOMContentLoaded as backup
    window.addEventListener('DOMContentLoaded', function() {
        restoreScrollPosition();
    });
})();

/* header.js */
function selectCategory(categoryName) {
    const textSpan = document.getElementById('selectedCategoryText');
    if (textSpan) {
        textSpan.textContent = categoryName;
    }
    
    const dropdownItems = document.querySelectorAll('.custom-dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        const itemText = item.textContent.trim();
        if (itemText === categoryName || 
            (categoryName === 'All Category' && itemText === 'All Categories') ||
            itemText.startsWith(categoryName)) {
            item.classList.add('active');
        }
    });
}

function initHeader() {
    let loadedCats = false;

    function checkReady() {
        if (loadedCats) {
            proceedInitHeader();
        }
    }

    if (typeof mockCategories === 'undefined') {
        const script = document.createElement('script');
        script.src = 'assets/js/mockCategories.js';
        script.onload = function() {
            loadedCats = true;
            checkReady();
        };
        script.onerror = function() {
            console.error('Failed to load mockCategories.js');
        };
        document.head.appendChild(script);
    } else {
        loadedCats = true;
    }

    // We no longer block header rendering on products-mock.js
    if (typeof mockProducts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'assets/js/products-mock.js';
        document.head.appendChild(script);
    }

    checkReady();
}

function proceedInitHeader() {
    const languageOptions = document.querySelectorAll('.language-select');
    const languageIndicator = document.getElementById('languageIndicator');
    const mobileLanguageIndicator = document.getElementById('mobileLanguageIndicator');

    if (languageOptions) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                if (languageIndicator) languageIndicator.textContent = selectedLang;
                if (mobileLanguageIndicator) mobileLanguageIndicator.textContent = selectedLang;
                languageOptions.forEach(opt => opt.classList.remove('fw-bold'));
                this.classList.add('fw-bold');
            });
        });
    }

    // Load delivery location from localStorage
    const deliveryTextEl = document.getElementById('headerDeliveryText');
    const deliveryActionEl = document.getElementById('headerDeliveryAction');
    if (deliveryTextEl && deliveryActionEl) {
        const savedAddress = localStorage.getItem('userAddress');
        if (savedAddress) {
            try {
                const address = JSON.parse(savedAddress);
                const city = address.city || '';
                const pincode = address.pincode || '';
                if (city || pincode) {
                    deliveryTextEl.textContent = 'Delivering to ' + [city, pincode].filter(Boolean).join(' ');
                    deliveryActionEl.textContent = 'Update';
                    deliveryActionEl.href = 'myaddress.html';
                }
            } catch (e) {
                // Invalid JSON, keep default
            }
        }
    }

    // Update login button based on auth state
    if (typeof updateLoginButton === 'function') {
        updateLoginButton();
    }

    // Populate search bar category dropdown
    const searchDropdownMenu = document.getElementById('searchCategoryDropdownMenu');
    if (searchDropdownMenu && typeof mockCategories !== 'undefined' && mockCategories.searchCategories) {
        searchDropdownMenu.innerHTML = mockCategories.searchCategories.map((cat, idx) => {
            const isActive = idx === 0 ? 'active' : '';
            const hasChevron = cat.name === 'Home & Living' ? ' <i class="fas fa-chevron-right fs-7 opacity-75"></i>' : '';
            return `<li><a class="dropdown-item py-2 px-3 custom-dropdown-item ${isActive} d-flex align-items-center justify-content-between"
                        href="#" onclick="selectCategory('${cat.value}')">${cat.name}${hasChevron}</a></li>`;
        }).join('');
    }

    // Populate categories bar scroll list
    const categoryScroll = document.getElementById('headerCategoryScroll');
    if (categoryScroll && typeof mockCategories !== 'undefined' && mockCategories.barCategories) {
        categoryScroll.innerHTML = mockCategories.barCategories.map(cat => {
            return `<a href="${cat.link || '#'}" class="text-dark text-decoration-none category-link">${cat.name}</a>`;
        }).join('');
    }

    // --- Cascading Category Dropdown (2 levels) ---
    const catDropData = (typeof mockCategories !== 'undefined' && mockCategories.cascadingData) ? mockCategories.cascadingData : {};

    const catL1Box  = document.getElementById('catDropL1');
    const catL2Box  = document.getElementById('catDropL2');
    const catL1List = document.getElementById('catDropL1List');
    const catL2List = document.getElementById('catDropL2List');
    const catBarCont = document.getElementById('categoriesBarContainer');

    let catHideTimer = null;
    // Short delay — just enough for the cursor to travel across the gap between bar and dropdown
    const catHideDelay = 200;
    const catFlyoutGap = 0;

    function cancelCatHide() { clearTimeout(catHideTimer); }

    function scheduleCatHide() {
        cancelCatHide();
        catHideTimer = setTimeout(function () {
            if (catL1Box) catL1Box.style.display = 'none';
            if (catL2Box) catL2Box.style.display = 'none';
            const currentLinks = document.querySelectorAll('.category-link');
            currentLinks.forEach(function(l) { l.classList.remove('active-category'); });
        }, catHideDelay);
    }

    function showCatL1(link) {
        cancelCatHide();
        const currentLinks = document.querySelectorAll('.category-link');
        currentLinks.forEach(function(l) { l.classList.remove('active-category'); });
        link.classList.add('active-category');

        var catName = link.textContent.trim();
        var subs = catDropData[catName];
        if (!subs || subs.length === 0) {
            catL1Box.style.display = 'none';
            catL2Box.style.display = 'none';
            return;
        }

        // Position L1 directly below the hovered link
        var contRect = catBarCont.getBoundingClientRect();
        var linkRect = link.getBoundingClientRect();
        var leftPos  = linkRect.left - contRect.left;
        var l1Width  = 220;
        // Prevent overflow right
        if (leftPos + l1Width > catBarCont.offsetWidth) {
            leftPos = catBarCont.offsetWidth - l1Width - 8;
        }
        catL1Box.style.left = leftPos + 'px';

        // Build L1 list
        catL1List.innerHTML = subs.map(function(sub, i) {
            return '<li class="cat-l1-item" data-idx="' + i + '">' +
                '<span>' + sub.name + '</span>' +
                '<i class="fas fa-chevron-right cat-chevron"></i>' +
                '</li>';
        }).join('');

        catL1Box.style.display = 'block';
        catL2Box.style.display = 'none';

        // Hover on L1 item → show L2
        catL1List.querySelectorAll('.cat-l1-item').forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                cancelCatHide();
                catL1List.querySelectorAll('.cat-l1-item').forEach(function(i) { i.classList.remove('active'); });
                this.classList.add('active');

                var idx   = parseInt(this.dataset.idx);
                var items = subs[idx].items;

                catL2List.innerHTML = items.map(function(it) {
                    return '<li><a href="#" class="cat-l2-item">' + it + '</a></li>';
                }).join('');

                catL2Box.style.left = (leftPos + catL1Box.offsetWidth + catFlyoutGap) + 'px';
                catL2Box.style.display = 'block';

                catL2List.querySelectorAll('a').forEach(function(a) {
                    a.addEventListener('click', function(e) { e.preventDefault(); });
                });
            });
            item.addEventListener('mouseleave', function() {
                // Only schedule hide if also leaving L2
                // The L2 mouseenter will cancel it if cursor goes there
                scheduleCatHide();
            });
        });
    }

    if (catL1Box && catL2Box && catBarCont) {
        const currentLinks = document.querySelectorAll('.category-link');
        currentLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() { showCatL1(this); });
            link.addEventListener('mouseleave', scheduleCatHide);
            link.addEventListener('click', function(e) { e.preventDefault(); });
        });
        catBarCont.addEventListener('mouseleave', scheduleCatHide);
        catL1Box.addEventListener('mouseenter', cancelCatHide);
        catL1Box.addEventListener('mouseleave', scheduleCatHide);
        catL2Box.addEventListener('mouseenter', cancelCatHide);
        catL2Box.addEventListener('mouseleave', scheduleCatHide);
    }


    // Toggle search icon visibility based on input text and handle search results
    let searchTimeout = null;

    function handleSearchInput(inputEl, resultsEl, buttonEl) {
        if (!inputEl || !resultsEl) return;

        if (buttonEl) {
            if (inputEl.value.trim().length > 0) {
                buttonEl.classList.add('d-none');
            } else {
                buttonEl.classList.remove('d-none');
            }
        }

        clearTimeout(searchTimeout);

        const query = inputEl.value.trim().toLowerCase();
        if (query.length === 0) {
            resultsEl.classList.add('d-none');
            resultsEl.innerHTML = '';
            return;
        }

        // Keep search responsive without firing on every single keystroke.
        searchTimeout = setTimeout(() => {
            performSearch(query, resultsEl);
        }, 250);
    }

    function performSearch(query, resultsEl) {
        if (typeof mockProducts === 'undefined') {
            console.error('mockProducts is not loaded.');
            return;
        }

        const filtered = mockProducts.filter(product => 
            product.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            resultsEl.innerHTML = '<div class="search-no-results">No products found</div>';
            resultsEl.classList.remove('d-none');
            return;
        }

        resultsEl.innerHTML = filtered.map(product => `
            <a href="product-details.html?id=${product.id}" class="search-result-item text-decoration-none">
                <img src="${product.image}" alt="${product.name}" class="search-result-img" onerror="this.src='assets/img/a2f999f18286586db85f7a0a39ac20a6f3b46f37.png'">
                <div class="search-result-info">
                    <div class="search-result-title">${product.name}</div>
                    <div class="search-result-price">₹ ${product.price}</div>
                </div>
                <button class="search-result-btn" type="button">View Details</button>
            </a>
        `).join('');
        resultsEl.classList.remove('d-none');
    }

    const desktopSearchInput = document.getElementById('desktopSearchInput');
    const desktopSearchBtn = document.getElementById('desktopSearchBtn');
    const desktopSearchResults = document.getElementById('desktopSearchResults');
    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', function() {
            handleSearchInput(desktopSearchInput, desktopSearchResults, desktopSearchBtn);
        });
        desktopSearchInput.addEventListener('focus', function() {
            if (this.value.trim().length > 0 && desktopSearchResults.children.length > 0) {
                desktopSearchResults.classList.remove('d-none');
            }
        });
    }

    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const mobileSearchResults = document.getElementById('mobileSearchResults');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            handleSearchInput(mobileSearchInput, mobileSearchResults, mobileSearchBtn);
        });
        mobileSearchInput.addEventListener('focus', function() {
            if (this.value.trim().length > 0 && mobileSearchResults.children.length > 0) {
                mobileSearchResults.classList.remove('d-none');
            }
        });
    }

    // Close search dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (desktopSearchResults && !desktopSearchResults.contains(e.target) && e.target !== desktopSearchInput) {
            desktopSearchResults.classList.add('d-none');
        }
        if (mobileSearchResults && !mobileSearchResults.contains(e.target) && e.target !== mobileSearchInput) {
            mobileSearchResults.classList.add('d-none');
        }
    });

    // Close mobile navbar on clicking outside
    const navbarContent = document.getElementById('navbarContent');
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarContent && navbarToggler) {
        document.addEventListener('click', function(event) {
            const isClickInside = navbarContent.contains(event.target) || navbarToggler.contains(event.target);
            if (!isClickInside && navbarContent.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarContent);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    navbarToggler.click();
                }
            }
        });
    }
}

/* login.js */
function handleSendOtp() {
    const mobileInput = document.getElementById('mobileInput');
    const mobileError = document.getElementById('mobileError');

    if (mobileInput.value.length === 10 && /^[6-9]/.test(mobileInput.value)) {
        document.getElementById('displayMobileNo').innerText = mobileInput.value;
        document.getElementById('mobileFormSection').classList.add('d-none');
        document.getElementById('otpFormSection').classList.remove('d-none');
        startTimer(30);
    } else {
        mobileInput.style.color = '#FB0000';
        mobileInput.style.borderBottomColor = '#FB0000';
        mobileError.classList.remove('d-none');
    }
}

function moveToNext(current, event) {
    current.value = current.value.replace(/[^0-9]/g, '');
    if (current.value.length === 1) {
        let next = current.nextElementSibling;
        if (next) next.focus();
    }
    if (event.key === 'Backspace') {
        let prev = current.previousElementSibling;
        if (prev) prev.focus();
    }
}

let timerInterval;
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const container = document.getElementById('resendContainer');

    container.innerHTML = 'Resend OTP in <span id="resendTimer"></span>';
    const display = document.getElementById('resendTimer');

    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(timerInterval);
            container.innerHTML = '<a href="#" class="text-decoration-none fw-semibold" style="color: #0d8dfb;" onclick="resendOtp(event)">Resend OTP</a>';
        }
    }, 1000);
}

function resendOtp(event) {
    event.preventDefault();
    startTimer(30);
}

function loadSidebar() {
    const placeholder = document.getElementById('sidebar-placeholder');
    if (!placeholder) return;
    
    fetch('sidebar.html?v=5')
        .then(response => response.text())
        .then(data => {
            placeholder.innerHTML = data;
            
            setTimeout(() => {
                const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
                const currentHash = window.location.hash.toLowerCase();
                
                const links = placeholder.querySelectorAll('.sidebar-link');
                links.forEach(link => link.classList.remove('active'));
                let matchedLink = null;
                links.forEach(link => {
                    let href = (link.getAttribute('href') || '').toLowerCase();
                    let cleanHref = href.replace('.html', '');
                    let cleanPath = currentPath.replace('.html', '');
                    
                    if (cleanHref === cleanPath + currentHash || (currentHash === '' && cleanHref === cleanPath)) {
                        matchedLink = link;
                    }
                    if ((cleanPath === 'order-details' || cleanPath === 'order-breakdown') && cleanHref === 'orders') {
                        matchedLink = link;
                    }
                });
                
                if (typeof updateProfileSection === 'function') {
                     updateProfileSection();
                } else if (matchedLink) {
                    matchedLink.classList.add('active');
                }
            }, 50);
        });
}
