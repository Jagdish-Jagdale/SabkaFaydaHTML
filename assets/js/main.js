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
    const languageOptions = document.querySelectorAll('.language-select');
    const languageIndicator = document.getElementById('languageIndicator');

    if (languageOptions && languageIndicator) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                languageIndicator.textContent = this.getAttribute('data-lang');
                languageOptions.forEach(opt => opt.classList.remove('fw-bold'));
                this.classList.add('fw-bold');
            });
        });
    }

    const categoryLinks = document.querySelectorAll('.category-link');
    if (categoryLinks) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // If it's just a placeholder link #, prevent jumping to top
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                }
                categoryLinks.forEach(l => l.classList.remove('active-category'));
                this.classList.add('active-category');
            });
        });
    }

    // Toggle Categories Mega Menu
    const megaMenuBtn = document.getElementById('categoriesMegaMenuBtn');
    const megaMenu = document.getElementById('categoriesMegaMenu');
    if (megaMenuBtn && megaMenu) {
        megaMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            megaMenu.classList.toggle('d-none');
        });

        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!megaMenuBtn.contains(e.target) && !megaMenu.contains(e.target)) {
                megaMenu.classList.add('d-none');
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
