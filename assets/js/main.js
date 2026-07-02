/* header.js */
function selectCategory(categoryName) {
    const textSpan = document.getElementById('selectedCategoryText');
    if (textSpan) {
        textSpan.textContent = categoryName;
    }
    
    const dropdownItems = document.querySelectorAll('.custom-dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        // check if text matches or if it starts with the category name (to handle nested icons)
        const itemText = item.textContent.trim();
        if (itemText === categoryName || 
            (categoryName === 'All Category' && itemText === 'All Categories') ||
            itemText.startsWith(categoryName)) {
            item.classList.add('active');
        }
    });
}

function initHeader() {
    if (typeof mockCategories === 'undefined') {
        const script = document.createElement('script');
        script.src = 'assets/js/mockCategories.js';
        script.onload = function() {
            proceedInitHeader();
        };
        script.onerror = function() {
            console.error('Failed to load mockCategories.js');
        };
        document.head.appendChild(script);
    } else {
        proceedInitHeader();
    }
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
    const deliveryLocationEl = document.getElementById('headerDeliveryLocation');
    if (deliveryLocationEl) {
        const savedAddress = localStorage.getItem('userAddress');
        if (savedAddress) {
            try {
                const address = JSON.parse(savedAddress);
                const city = address.city || '';
                const pincode = address.pincode || '';
                if (city || pincode) {
                    deliveryLocationEl.textContent = [city, pincode].filter(Boolean).join(' ');
                }
            } catch (e) {
                // Invalid JSON, keep default placeholder
            }
        }
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
    const catLinks   = document.querySelectorAll('.category-link');
    let catHideTimer = null;

    function cancelCatHide() { clearTimeout(catHideTimer); }

    function scheduleCatHide() {
        catHideTimer = setTimeout(function () {
            if (catL1Box) catL1Box.style.display = 'none';
            if (catL2Box) catL2Box.style.display = 'none';
            const currentLinks = document.querySelectorAll('.category-link');
            currentLinks.forEach(function(l) { l.classList.remove('active-category'); });
        }, 150);
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

        // Position L1 below the hovered link
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

                // Position L2 to the right of L1, same top, with a small gap
                catL2Box.style.left = (leftPos + catL1Box.offsetWidth + 8) + 'px';
                catL2Box.style.display = 'block';

                catL2List.querySelectorAll('a').forEach(function(a) {
                    a.addEventListener('click', function(e) { e.preventDefault(); });
                });
            });
        });
    }

    if (catL1Box && catL2Box && catBarCont) {
        // Since links are dynamic, bind mouseenter dynamically or query them here after injection
        const currentLinks = document.querySelectorAll('.category-link');
        currentLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() { showCatL1(this); });
            link.addEventListener('click',      function(e) { e.preventDefault(); });
        });
        catBarCont.addEventListener('mouseleave', scheduleCatHide);
        catL1Box.addEventListener('mouseenter', cancelCatHide);
        catL1Box.addEventListener('mouseleave', scheduleCatHide);
        catL2Box.addEventListener('mouseenter', cancelCatHide);
        catL2Box.addEventListener('mouseleave', scheduleCatHide);
    }


    // Toggle search icon visibility based on input text
    const desktopSearchInput = document.getElementById('desktopSearchInput');
    const desktopSearchBtn = document.getElementById('desktopSearchBtn');
    if (desktopSearchInput && desktopSearchBtn) {
        desktopSearchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                desktopSearchBtn.classList.add('d-none');
            } else {
                desktopSearchBtn.classList.remove('d-none');
            }
        });
    }

    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    if (mobileSearchInput && mobileSearchBtn) {
        mobileSearchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                mobileSearchBtn.classList.add('d-none');
            } else {
                mobileSearchBtn.classList.remove('d-none');
            }
        });
    }

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
        // Valid mobile number
        document.getElementById('displayMobileNo').innerText = mobileInput.value;
        document.getElementById('mobileFormSection').classList.add('d-none');
        document.getElementById('otpFormSection').classList.remove('d-none');
        startTimer(30);
    } else {
        // Invalid, trigger error state manually
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

    // Reset container content to show timer
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
    // Optional: call your resend OTP API here
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
