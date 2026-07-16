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
        offerTag: 'UPI Offer',
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
            userName: 'Savita Singh',
            rating: 5,
            timeAgo: '2 months ago',
            text: 'Excellent phone with great battery life and smooth performance. The display quality is amazing for the price.'
        },
        {
            userName: 'Ketan Patel',
            rating: 4,
            timeAgo: '3 months ago',
            text: 'Good value for money. Camera performance is decent in daylight but could be better in low light.'
        },
        {
            userName: 'Harish Mehta',
            rating: 5,
            timeAgo: '1 month ago',
            text: 'Super fast charging! The phone gets fully charged in less than 40 minutes. Battery life is solid.'
        },
        {
            userName: 'Neha Gupta',
            rating: 4,
            timeAgo: '2 weeks ago',
            text: 'Very satisfied with the purchase. The display is very bright even outdoors. Performance is butter smooth.'
        },
        {
            userName: 'Rajesh Kumar',
            rating: 5,
            timeAgo: '3 days ago',
            text: 'OnePlus has nailed it again. The OxygenOS is clean and bloatware-free. Highly recommended for daily tasks.'
        },
        {
            userName: 'Deepa Sen',
            rating: 4,
            timeAgo: '1 week ago',
            text: 'Great value for a 5G phone. Speakers are loud and clear, and the design is premium. Camera is decent.'
        }
    ],
    reviewImages: [
        { src: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', rating: 5, title: 'Worth every penny', text: 'I recently picked up the OnePlus Nord CE 4 Lite 5G, and it has exceeded my expectations for the price! Charging speed is insanely fast.', userName: 'Mansi Bhatt', timeAgo: '4 months ago', likes: 4 },
        { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', rating: 4, title: 'Very good display', text: 'AMOLED display is amazing for video streaming. Battery backup easily lasts a full day of heavy usage.', userName: 'Aravind K.', timeAgo: '2 months ago', likes: 2 },
        { src: 'https://images.unsplash.com/photo-1565849906660-7ea08e18309f?q=80&w=600&auto=format&fit=crop', rating: 5, title: 'Camera is decent', text: 'Daylight shots are fantastic and battery life is very reliable. Solid performance overall.', userName: 'Shalini Sharma', timeAgo: '1 month ago', likes: 9 },
        { src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop', rating: 4, title: 'Satisfied customer', text: 'Great purchase. The fast charging really helps when in a hurry. Recommend it to anyone looking for a mid-ranger.', userName: 'Rohan Deshmukh', timeAgo: '3 weeks ago', likes: 0 },
        { src: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop', rating: 5, title: 'Awesome styling!', text: 'The phone looks super premium. Love the design and build quality.', userName: 'Vikram Singh', timeAgo: '5 months ago', likes: 12 },
        
        // Add more images to generate a large grid of 24 photos
        { src: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Outstanding!', text: 'Amazing device, fast performance, bright screen. Worth it.', userName: 'Rohit J.', timeAgo: '2 months ago', likes: 5 },
        { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Good choice', text: 'Design and form factor is really sleek. Processor handles multitasking easily.', userName: 'Nisha V.', timeAgo: '3 weeks ago', likes: 1 },
        { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Superb Product', text: 'Exactly as described. Fast shipping and very well packaged.', userName: 'Devendra K.', timeAgo: '1 month ago', likes: 6 },
        
        { src: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Best budget 5G phone', text: 'Very content with my purchase. Beautiful UI and fast transitions.', userName: 'Tanvi M.', timeAgo: '4 months ago', likes: 7 },
        { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Decent battery life', text: 'Charging is quick, lasts over 30 hours of regular usage.', userName: 'Sanjay G.', timeAgo: '2 months ago', likes: 3 },
        { src: 'https://images.unsplash.com/photo-1565849906660-7ea08e18309f?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Value for money!', text: 'Best smartphone in this budget range. High refresh rate feels smooth.', userName: 'Akshat S.', timeAgo: '1 month ago', likes: 11 },
        { src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Highly recommend', text: 'Works flawlessly. No lag encountered during heavy gaming sessions.', userName: 'Preeti D.', timeAgo: '3 weeks ago', likes: 2 },
        
        { src: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Sleek design', text: 'Comfortable to hold and has a robust camera setup.', userName: 'Gaurav P.', timeAgo: '5 months ago', likes: 15 },
        { src: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Awesome value', text: 'Unbelievably good for the price tag. Highly responsive touch display.', userName: 'Deepak T.', timeAgo: '2 months ago', likes: 4 },
        { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Practical tool', text: 'Very good specs for the price. Reliable daily companion.', userName: 'Meera B.', timeAgo: '3 weeks ago', likes: 3 },
        { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Perfect!', text: 'OnePlus Nord is a solid budget-friendly device. Extremely happy.', userName: 'Amit R.', timeAgo: '1 month ago', likes: 8 },
        
        { src: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Fast delivery!', text: 'Arrived within 2 days. The blue color looks gorgeous.', userName: 'Kunal S.', timeAgo: '4 months ago', likes: 3 },
        { src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Decent performance', text: 'Snapdragon chip performs well under load. Screen is crisp.', userName: 'Pooja V.', timeAgo: '2 months ago', likes: 1 },
        { src: 'https://images.unsplash.com/photo-1565849906660-7ea08e18309f?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Great upgrade', text: 'Upgraded from CE 2 Lite. Vast improvement in screen and battery life.', userName: 'Yash L.', timeAgo: '1 month ago', likes: 10 },
        { src: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Solid battery', text: 'Can easily get 2 days of screen time with mild social media browsing.', userName: 'Anjali P.', timeAgo: '3 weeks ago', likes: 4 },
        
        { src: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Stunning display', text: 'AMOLED is very color accurate. High refresh rate works flawlessly.', userName: 'Rahul N.', timeAgo: '5 months ago', likes: 14 },
        { src: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Best buy ever', text: 'Exceeded my expectations. Charging speed is phenomenal.', userName: 'Harsh R.', timeAgo: '2 months ago', likes: 9 },
        { src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop', rating: 4, title: 'Practical choice', text: 'Very good specs for the price. Reliable daily companion.', userName: 'Nutan K.', timeAgo: '3 weeks ago', likes: 2 },
        { src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop', rating: 5, title: 'Amazing phone!', text: 'Nord Lite continues OnePlus heritage of smooth fast software. Recommended!', userName: 'Vikas G.', timeAgo: '1 month ago', likes: 5 }
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
