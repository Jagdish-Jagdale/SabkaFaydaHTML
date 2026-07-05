// Cart Utilities for localStorage-based cart management

const CART_STORAGE_KEY = 'sabkaFaydaCart';

// Get cart from localStorage
function getCart() {
    try {
        const cartData = localStorage.getItem(CART_STORAGE_KEY);
        return cartData ? JSON.parse(cartData) : [];
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
    
    console.log('Current cart before adding:', cart);
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].qty += quantity;
        console.log('Updated existing item quantity:', cart[existingItemIndex]);
    } else {
        // Add new item to cart
        const newItem = {
            id: product.id,
            productName: product.title,
            image: product.image,
            price: typeof product.price === 'number' ? product.price.toLocaleString('en-IN') : product.price.toString(),
            originalPrice: product.originalPrice.replace('₹', '').replace(/,/g, ''),
            discount: product.discount,
            qty: quantity,
            specs: product.specs || []
        };
        cart.push(newItem);
        console.log('Added new item to cart:', newItem);
    }
    
    saveCart(cart);
    console.log('Cart saved to localStorage:', cart);
    return cart;
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
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
    
    return cart;
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.qty, 0);
}
