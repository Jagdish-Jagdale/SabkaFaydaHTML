/* loginmock.js — Mock authentication for Sabka Fayda */

const AUTH_KEY = 'sf_auth_user';

const MOCK_USERS = [
    { mobile: '8855055280', otp: '123456', name: 'mash' }
];

/* ── Read / Write session ── */
function getAuthUser() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function setAuthUser(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function clearAuthUser() {
    localStorage.removeItem(AUTH_KEY);
}

function isLoggedIn() {
    return getAuthUser() !== null;
}

/* ── Validate OTP & log in ── */
function mockLogin(mobile, otp) {
    const found = MOCK_USERS.find(u => u.mobile === mobile && u.otp === otp);
    if (found) {
        setAuthUser({ mobile: found.mobile, name: found.name, loggedInAt: Date.now() });
        return { success: true, user: found };
    }
    return { success: false, message: 'Invalid mobile number or OTP. Please try again.' };
}

/* ── Log out ── */
function mockLogout() {
    clearAuthUser();
    updateLoginButton();
}

/* ── Update header Login ↔ My Profile button ── */
function updateLoginButton() {
    // Desktop button (inside navbarContent collapse)
    const desktopBtn = document.getElementById('header-login-btn');
    // Mobile button
    const mobileBtn  = document.getElementById('header-login-btn-mobile');

    const user = getAuthUser();

    if (user) {
        /* ── Logged IN: show "My Profile" ── */
        const profileHTML = `
            <a href="myinformation.html"
               id="header-login-btn"
               class="text-white fw-medium ms-lg-4 d-inline-flex align-items-center gap-2 text-decoration-none"
               style="font-size: 0.95rem; line-height: 1.2; white-space: nowrap;">
                <i class="fa-regular fa-circle-user" style="font-size: 1.1rem;"></i>
                My Profile
            </a>`;

        const mobileProfileHTML = `
            <li class="nav-item d-lg-none mt-2" id="header-login-li-mobile">
                <hr class="text-white opacity-25 my-2">
                <a href="myinformation.html"
                   id="header-login-btn-mobile"
                   class="btn btn-light w-100 fw-bold text-primary py-2 d-flex align-items-center justify-content-center gap-2"
                   style="border-radius: 8px; background-color: #fff; color: #0087F6 !important; border: none;">
                    <i class="fa-regular fa-circle-user"></i> My Profile
                </a>
            </li>`;

        if (desktopBtn) {
            desktopBtn.outerHTML = profileHTML;
        }
        if (mobileBtn) {
            const li = document.getElementById('header-login-li-mobile');
            if (li) li.outerHTML = mobileProfileHTML;
        }
    } else {
        /* ── Logged OUT: show "Login" ── */
        const loginHTML = `
            <a href="login.html"
               id="header-login-btn"
               class="btn btn-light ms-5 d-none d-lg-inline-block fw-bold text-primary"
               style="border-radius:6px; font-size:0.9rem; padding:8px 20px; background-color:#fff; color:#0087F6 !important; border:none;">
                Login
            </a>`;

        const mobileLoginHTML = `
            <li class="nav-item d-lg-none mt-2" id="header-login-li-mobile">
                <hr class="text-white opacity-25 my-2">
                <a href="login.html"
                   id="header-login-btn-mobile"
                   class="btn btn-light w-100 fw-bold text-primary py-2"
                   style="border-radius:8px; background-color:#fff; color:#0087F6 !important; border:none;">
                    Login
                </a>
            </li>`;

        if (desktopBtn) {
            desktopBtn.outerHTML = loginHTML;
        }
        if (mobileBtn) {
            const li = document.getElementById('header-login-li-mobile');
            if (li) li.outerHTML = mobileLoginHTML;
        }
    }
}

/* ── OTP flow helpers used by login.html ── */
function mockSendOtp(mobile) {
    // Accepts any 10-digit mobile for UX; validates on verify
    return /^[6-9]\d{9}$/.test(mobile);
}

function mockVerifyOtp(mobile, otp) {
    return mockLogin(mobile, otp);
}

/* ── Auto-init on DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded', function () {
    updateLoginButton();
});
