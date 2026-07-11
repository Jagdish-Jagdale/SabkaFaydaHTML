/* Product Details Mock Data */
const productDetailsData = {
    product: {
        subtitle: 'Electronics',
        category: 'Electronics',
        subcategory: 'Smartphones',
        title: 'OnePlus Nord CE 4 Lite 5G (8GB RAM, 256GB Storage)',
        sku: '19517_oneplus_nord_ce4_lite_5g_8gb_256gb',
        status: 'In Stock',
        rating: 4.2,
        reviews: 156,
        discount: '15% off',
        originalPrice: 23999,
        price: 19999,
        upiPrice: 18999,
        offerTag: 'Bank Offer',
        images: [
            'assets/img/electronicimg.png',
            'assets/img/electronicimg.png',
            'assets/img/electronicimg.png',
            'assets/img/electronicimg.png',
            'assets/img/electronicimg.png'
        ],
        sizes: ['128GB', '256GB', '512GB'],
        selectedSize: '256GB',
        description: 'Experience the future of mobile technology with OnePlus Nord CE 4 Lite 5G. Powered by Snapdragon 6 Gen 1 processor, this smartphone delivers exceptional performance for gaming, multitasking, and entertainment. The 6.7-inch AMOLED display with 120Hz refresh rate offers stunning visuals, while the 5500mAh battery ensures all-day usage.',
        deliveryDays: 3,
        specifications: [
            { name: 'Brand', value: 'OnePlus' },
            { name: 'Model', value: 'Nord CE 4 Lite 5G' },
            { name: 'Processor', value: 'Snapdragon 6 Gen 1' },
            { name: 'Display', value: '6.7-inch AMOLED, 120Hz' },
            { name: 'Battery', value: '5500mAh' },
            { name: 'RAM', value: '8GB' },
            { name: 'Storage', value: '256GB' }
        ]
    },
    reviews: [
        {
            rating: 5,
            timeAgo: '2 months ago',
            text: 'Excellent phone with great battery life and smooth performance. The display quality is amazing for the price.'
        },
        {
            rating: 4,
            timeAgo: '3 months ago',
            text: 'Good value for money. Camera performance is decent in daylight but could be better in low light.'
        }
    ],
    similarProducts: [
        {
            image: 'assets/img/electronicimg.png',
            title: 'Samsung Galaxy M35 5G (6GB RAM, 128GB Storage)',
            rating: 4.3,
            reviews: 289,
            refer: 20,
            earn: 120,
            originalPrice: 17999,
            price: 15999,
            offer: '11% off',
            sponsored: true
        },
        {
            image: 'assets/img/electronicimg.png',
            title: 'Realme 12 Pro 5G (8GB RAM, 256GB Storage)',
            rating: 4.1,
            reviews: 145,
            refer: 18,
            earn: 95,
            originalPrice: 24999,
            price: 21999,
            offer: '12% off',
            sponsored: false
        },
        {
            image: 'assets/img/electronicimg.png',
            title: 'Vivo V30 Pro 5G (8GB RAM, 256GB Storage)',
            rating: 4.5,
            reviews: 312,
            refer: 22,
            earn: 135,
            originalPrice: 46999,
            price: 42999,
            offer: '9% off',
            sponsored: true
        },
        {
            image: 'assets/img/electronicimg.png',
            title: 'Redmi Note 13 Pro 5G (8GB RAM, 256GB Storage)',
            rating: 4.2,
            reviews: 198,
            refer: 15,
            earn: 85,
            originalPrice: 21999,
            price: 19999,
            offer: '9% off',
            sponsored: false
        },
        {
            image: 'assets/img/electronicimg.png',
            title: 'Motorola Edge 40 Neo 5G (8GB RAM, 128GB Storage)',
            rating: 4.0,
            reviews: 87,
            refer: 14,
            earn: 78,
            originalPrice: 22999,
            price: 20999,
            offer: '9% off',
            sponsored: true
        }
    ]
};
