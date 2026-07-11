/* SEO Mock Data - Dynamic Meta Tags for Different Pages */
const seoData = {
    // Default SEO for homepage
    default: {
        title: "Sabka Fayda - Your Trusted Online Shopping Destination",
        description: "Shop the best products at Sabka Fayda. Great deals, secure payment, and fast delivery on a wide range of products.",
        keywords: "Sabka Fayda, online shopping, best deals, secure payment, fast delivery, e-commerce"
    },
    
    // Page-specific SEO
    pages: {
        'contact-us.html': {
            title: "Contact Us | Sabka Fayda",
            description: "Contact SabkaFayda for any queries, support, or feedback. We're here to help you with your shopping experience. Reach out to our customer support team.",
            keywords: "SabkaFayda Contact Us, customer support, help center, contact form, TEAMMUNITY BUSINESS PRIVATE LIMITED, customer service"
        },
        'about-us.html': {
            title: "About Us | Sabka Fayda",
            description: "Learn more about SabkaFayda, your trusted online shopping destination operated by TEAMMUNITY BUSINESS PRIVATE LIMITED. Discover why customers choose us for affordable quality products.",
            keywords: "About Sabka Fayda, TEAMMUNITY BUSINESS PRIVATE LIMITED, trusted shopping, affordable pricing, online store, cash on delivery, secure payments"
        },
        'terms.html': {
            title: "Terms and Conditions | Sabka Fayda",
            description: "Read the terms and conditions for using SabkaFayda. Understand our policies, guidelines, and user agreement for a safe shopping experience.",
            keywords: "SabkaFayda terms, conditions, policies, guidelines, user agreement, shopping policies"
        },
        'privacy-policy.html': {
            title: "Privacy Policy | Sabka Fayda",
            description: "Read SabkaFayda's privacy policy to understand how we protect your personal information and data security measures.",
            keywords: "SabkaFayda privacy policy, data protection, personal information, security, privacy"
        },
        'return-policy.html': {
            title: "Return Policy | Sabka Fayda",
            description: "Read SabkaFayda's return and refund policy. Understand our easy return process and refund guidelines for a hassle-free shopping experience.",
            keywords: "SabkaFayda return policy, refund policy, easy returns, refund guidelines, shopping returns"
        },
        'mywishlist.html': {
            title: "My Wishlist | Sabka Fayda",
            description: "View and manage your wishlist on SabkaFayda. Save your favorite products and never miss out on great deals.",
            keywords: "SabkaFayda wishlist, my wishlist, saved products, favorite items, shopping wishlist"
        },
        'cart.html': {
            title: "Shopping Cart | Sabka Fayda",
            description: "View your shopping cart on SabkaFayda. Manage your items and proceed to secure checkout for a seamless shopping experience.",
            keywords: "SabkaFayda cart, shopping cart, checkout, buy online, secure payment"
        },
        'checkout.html': {
            title: "Checkout | Sabka Fayda",
            description: "Complete your purchase on SabkaFayda. Review your items, enter delivery details, and choose payment options for a smooth checkout experience.",
            keywords: "SabkaFayda checkout, secure checkout, payment options, delivery details, online payment"
        },
        'faq.html': {
            title: "FAQ | Sabka Fayda",
            description: "Find answers to frequently asked questions about SabkaFayda. Get help with orders, payments, returns, shipping, and more from our comprehensive FAQ section.",
            keywords: "SabkaFayda FAQ, frequently asked questions, help center, customer support, order help, payment help, return policy, shipping information"
        },
        'category.html': {
            title: "Shop by Category | Sabka Fayda",
            description: "Explore a wide range of categories on Sabka Fayda. Find best deals on electronics, fashion, home essentials, and more.",
            keywords: "categories, electronics, fashion, home essentials, online shopping, Sabka Fayda"
        },
        'login.html': {
            title: "Login & Signup | Sabka Fayda",
            description: "Log in or sign up for a Sabka Fayda account. Access your orders, wishlist, and personalized shopping experience.",
            keywords: "login, signup, sign in, register, user account, Sabka Fayda"
        },
        'mycart.html': {
            title: "My Cart | Sabka Fayda",
            description: "Review and manage items in your shopping cart. Secure checkout and quick delivery options available on Sabka Fayda.",
            keywords: "shopping cart, cart, checkout, buy online, Sabka Fayda"
        },
        'myaddress.html': {
            title: "My Addresses | Sabka Fayda",
            description: "Manage your shipping and billing addresses on Sabka Fayda for a faster checkout experience.",
            keywords: "manage address, shipping address, billing address, profile settings, Sabka Fayda"
        },
        'mycoupons.html': {
            title: "My Coupons | Sabka Fayda",
            description: "View and apply your available discount coupons to save big on your purchases at Sabka Fayda.",
            keywords: "coupons, discount coupons, promo codes, savings, offers, Sabka Fayda"
        },
        'myinformation.html': {
            title: "My Profile Information | Sabka Fayda",
            description: "View and update your personal profile details, account settings, and security preferences on Sabka Fayda.",
            keywords: "profile info, personal details, account settings, user profile, Sabka Fayda"
        },
        'mynotification.html': {
            title: "Notifications | Sabka Fayda",
            description: "Stay updated with the latest alerts, offers, order updates, and personalized announcements from Sabka Fayda.",
            keywords: "notifications, alerts, updates, offer news, Sabka Fayda"
        },
        'myorders.html': {
            title: "My Orders | Sabka Fayda",
            description: "Track your active orders, view purchase history, and manage returns easily on Sabka Fayda.",
            keywords: "order history, track order, purchase history, order status, Sabka Fayda"
        },
        'mywallet.html': {
            title: "My Wallet | Sabka Fayda",
            description: "Manage your Sabka Fayda wallet balance, transactions, refunds, and cashback rewards.",
            keywords: "wallet, digital wallet, transaction history, cashback, refunds, Sabka Fayda"
        },
        'order-breakdown.html': {
            title: "Order Breakdown | Sabka Fayda",
            description: "Review your detailed order breakdown, prices, taxes, discounts, and delivery charges before placing your order.",
            keywords: "order summary, billing breakdown, price details, checkout overview, Sabka Fayda"
        },
        'order-details.html': {
            title: "Order Details | Sabka Fayda",
            description: "Check the detailed tracking, status, items, and billing details for your specific Sabka Fayda order.",
            keywords: "order details, tracking information, invoice, billing history, Sabka Fayda"
        },
        'sabkafaydastories.html': {
            title: "Sabka Fayda Stories | Sabka Fayda",
            description: "Explore genuine product stories, unboxing videos, customer reviews, and influencer reels on Sabka Fayda.",
            keywords: "Sabka Fayda stories, customer feedback, unboxing videos, influencer reels, genuine reviews"
        },
        'product-details.html': {
            // Dynamic SEO for product details - will be updated based on product
            title: "Product Details | Sabka Fayda",
            description: "View product details on Sabka Fayda. Check specifications, reviews, and buy at the best price with secure payment options.",
            keywords: "product details, buy online, best price, Sabka Fayda, online shopping"
        }
    },
    
    // Product-specific SEO (for future use with URL-based routing)
    products: {
        'oneplus-nord-ce4-lite-5g': {
            title: "OnePlus Nord CE 4 Lite 5G (8GB RAM, 256GB Storage) | Sabka Fayda",
            description: "Buy OnePlus Nord CE 4 Lite 5G at the best price on Sabka Fayda. Check product details, specifications, reviews, and enjoy secure payment with fast delivery.",
            keywords: "OnePlus Nord CE 4 Lite 5G, OnePlus smartphone, 5G phone, buy online, best price, product details, Sabka Fayda"
        },
        'samsung-galaxy-m35-5g': {
            title: "Samsung Galaxy M35 5G (6GB RAM, 128GB Storage) | Sabka Fayda",
            description: "Buy Samsung Galaxy M35 5G at the best price on Sabka Fayda. Check product details, specifications, reviews, and enjoy secure payment with fast delivery.",
            keywords: "Samsung Galaxy M35 5G, Samsung smartphone, 5G phone, buy online, best price, product details, Sabka Fayda"
        },
        'realme-buds-air-5-pro': {
            title: "Realme Buds Air 5 Pro Wireless Earbuds | Sabka Fayda",
            description: "Buy Realme Buds Air 5 Pro at the best price on Sabka Fayda. Check product details, specifications, reviews, and enjoy secure payment with fast delivery.",
            keywords: "Realme Buds Air 5 Pro, wireless earbuds, Bluetooth headphones, buy online, best price, product details, Sabka Fayda"
        }
    },
    
    // Category-specific SEO
    categories: {
        'electronics': {
            title: "Electronics | Sabka Fayda",
            description: "Browse electronics products on Sabka Fayda. Discover the best deals and quality products in electronics category.",
            keywords: "electronics, electronic products, buy electronics, Sabka Fayda, online shopping"
        },
        'fashion': {
            title: "Fashion & Lifestyle | Sabka Fayda",
            description: "Browse fashion and lifestyle products on Sabka Fayda. Discover the best deals and quality products in fashion category.",
            keywords: "fashion, lifestyle, clothing, accessories, buy fashion, Sabka Fayda, online shopping"
        },
        'home-kitchen': {
            title: "Home & Kitchen | Sabka Fayda",
            description: "Browse home and kitchen products on Sabka Fayda. Discover the best deals and quality products for your home.",
            keywords: "home, kitchen, home appliances, kitchen appliances, buy home products, Sabka Fayda, online shopping"
        }
    }
};
