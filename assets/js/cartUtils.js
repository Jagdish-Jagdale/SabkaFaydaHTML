// Cart Utilities for localStorage-based cart management

const CART_STORAGE_KEY = 'sabkaFaydaCart';

// Get cart from localStorage
function getCart() {
    try {
        const cartData = localStorage.getItem(CART_STORAGE_KEY);
        const mockInjected = localStorage.getItem('sf_mock_injected');
        
        if ((!cartData || cartData === '[]') && !mockInjected) {
            // Inject mock data if empty for demonstration, but only once
            localStorage.setItem('sf_mock_injected', 'true');
            const mockCart = [
                {
                    id: 'prod-101',
                    productName: 'boAt Airdopes 141 Bluetooth Truly Wireless in Ear Earbuds',
                    image: 'assets/img/electronicimg.png',
                    price: '1299',
                    originalPrice: '4490',
                    discount: '71% off',
                    qty: 3,
                    specs: ['Playback: Upto 42 Hours', 'ASAP Charge'],
                    size: ''
                },
                {
                    id: 'prod-102',
                    productName: 'Noise Pulse 2 Max 1.85" Display Smart Watch',
                    image: 'assets/img/homescreenimg.png',
                    price: '1999',
                    originalPrice: '5999',
                    discount: '66% off',
                    qty: 8,
                    specs: ['BT Calling', '100+ Sports Modes'],
                    size: 'Free Size'
                }
            ];
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(mockCart));
            return mockCart;
        }
        return JSON.parse(cartData);
    } catch (error) {
        console.error('Error reading cart from localStorage:', error);
        return [];
    }
}

// Save cart to localStorage
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}

// Add item to cart
function addToCart(product, quantity = 1, btnElement = null) {
    // Fallback for mock buttons passing only strings
    if (typeof product === 'string') {
        product = {
            id: 'mock_' + Math.random().toString(36).substr(2, 9),
            title: product,
            image: 'assets/img/electronicimg.png',
            price: 999,
            originalPrice: '1999',
            discount: '50% off'
        };
    }

    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].qty += quantity;
    } else {
        // Add new item to cart - match the structure expected by renderCart.js
        const newItem = {
            id: product.id,
            productName: product.title,
            image: product.image,
            price: typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price.toString(),
            originalPrice: product.originalPrice.replace('₹', '').replace(/,/g, ''),
            discount: product.discount,
            qty: quantity,
            specs: product.specs || [],
            size: product.size || ''
        };
        cart.push(newItem);
    }
    
    saveCart(cart);
    if (typeof updateCartCount === 'function') updateCartCount();
    
    // Transform button to 'Go to Cart'
    if (btnElement) {
        const hasIcon = btnElement.querySelector('i');
        const iconHtml = hasIcon ? `<i class="fa-solid fa-cart-shopping me-1"></i> ` : '';
        btnElement.innerHTML = `${iconHtml}Go to Cart`;
        btnElement.removeAttribute('onclick');
        btnElement.onclick = function(e) {
            e.preventDefault();
            window.location.href = 'mycart.html';
        };
        if (btnElement.classList.contains('btn-primary')) {
            btnElement.classList.replace('btn-primary', 'btn-success');
        }
    }
    
    // Trigger animation
    animateCartIcon();
    showCartToast();
    
    return cart;
}

// Function to show toast notification when product is added
function showCartToast() {
    let toastContainer = document.getElementById('cart-toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'cart-toast-container';
        toastContainer.className = 'position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        toastContainer.style.marginTop = '90px';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'cart-toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-bg-success border-0 mb-2 shadow" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body fw-semibold">
                    <i class="fa-solid fa-circle-check me-2"></i>Product added to cart!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
        
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }
}

// Function to animate cart icon in header
function animateCartIcon() {
    const desktopCartBadge = document.querySelector('.desktop-cart-badge');
    const mobileCartBadge = document.querySelector('.mobile-cart-badge');
    
    [desktopCartBadge, mobileCartBadge].forEach(badge => {
        if (!badge) return;
        
        const iconContainer = badge.parentElement;
        iconContainer.style.position = 'relative';
        
        // Remove old tooltip if any
        let oldTooltip = iconContainer.querySelector('.cart-tooltip-anim');
        if (oldTooltip) oldTooltip.remove();
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'cart-tooltip-anim';
        tooltip.innerHTML = '<i class="fas fa-check-circle me-1"></i> Successfully Added';
        tooltip.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            color: #0087F6;
            padding: 6px 12px;
            border: 1px solid #0087F6;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            white-space: nowrap;
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.5s ease-out;
            pointer-events: none;
            box-shadow: 0 4px 12px rgba(0, 135, 246, 0.15);
            margin-top: 12px;
        `;
        iconContainer.appendChild(tooltip);
        
        // Add bounce animation class if not exists
        let style = document.getElementById('cart-anim-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'cart-anim-style';
            style.textContent = `
                @keyframes cartBounce {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
                .cart-anim-bounce {
                    animation: cartBounce 0.4s ease-out;
                }
            `;
            document.head.appendChild(style);
        }
        
        iconContainer.classList.remove('cart-anim-bounce');
        void iconContainer.offsetWidth; // reflow
        iconContainer.classList.add('cart-anim-bounce');
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 500);
        }, 2500);
    });
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
    if (typeof updateCartCount === 'function') updateCartCount();
    return updatedCart;
}

// Update item quantity
function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].qty = quantity;
        }
        saveCart(cart);
    }
    
    if (typeof updateCartCount === 'function') updateCartCount();
    return cart;
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    if (typeof updateCartCount === 'function') updateCartCount();
}

// Check if product is in cart
function isProductInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.length;
}

// Update cart count in header
function updateCartCount() {
    const count = getCartItemCount();
    const displayCount = count > 10 ? '10+' : count.toString();
    
    // Update mobile cart badge
    const mobileCartBadge = document.querySelector('.mobile-cart-badge');
    if (mobileCartBadge) {
        mobileCartBadge.textContent = displayCount;
        mobileCartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
    
    // Update desktop cart badge
    const desktopCartBadge = document.querySelector('.desktop-cart-badge');
    if (desktopCartBadge) {
        desktopCartBadge.textContent = displayCount;
        desktopCartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}
