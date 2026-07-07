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
function addToCart(product, quantity = 1) {
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
    return cart;
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
