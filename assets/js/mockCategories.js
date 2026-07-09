const mockCategories = {
    searchCategories: [
        { name: "All Categories", value: "All Category" },
        { name: "Home & Living", value: "Home & Living" },
        { name: "Electronics", value: "Electronics" },
        { name: "Toys and Games", value: "Toys and Games" },
        { name: "Gifts and Retail", value: "Gifts and Retail" },
        { name: "Health & Beauty", value: "Health & Beauty" },
        { name: "Business & Office", value: "Business & Office" },
        { name: "Automobile", value: "Automobile" },
        { name: "Animal & Pet", value: "Animal & Pet" },
        { name: "Lifestyle & Fashion", value: "Lifestyle & Fashion" }
    ],
    barCategories: [
        { name: "Best sellers", link: "category.html?category=For%20You&subcategory=Best%20seller" },
        { name: "Featured Products", link: "category.html?status=Featured" },
        { name: "Under 50 Rs", link: "category.html?category=For%20You&subcategory=Under%2050%20Rs" },
        { name: "Electronics", link: "#" },
        { name: "Beauty & Personal Care", link: "#" },
        { name: "Gifts", link: "#" },
        { name: "Car & Bikes", link: "#" },
        { name: "Toys and Games", link: "#" },
        { name: "Download App", link: "https://play.google.com/store/apps/details?id=com.sabkafayda.app" }
    ],
    cascadingData: {
        'Best sellers': [
            { name: 'Top Picks', items: ['Wireless Earbuds', 'Smart Watch', 'Power Bank', 'Bluetooth Speaker', 'Phone Cases'] },
            { name: 'Trending Now', items: ['Running Shoes', 'Backpacks', 'Sunglasses', 'Travel Bags', 'Caps & Hats'] },
            { name: 'Most Loved', items: ['Scented Candles', 'Wall Art', 'Desk Organizer', 'Indoor Plants', 'Photo Frames'] },
        ],
        'Featured Products': [
            { name: 'New Arrivals', items: ['Latest Gadgets', 'New Fashion', 'Fresh Home Decor', 'New Books'] },
            { name: 'Hot Deals', items: ['Flash Sale', 'Clearance', 'Bundle Offers', 'Discounted Items'] },
        ],
        'Under 50 Rs': [
            { name: 'Daily Essentials', items: ['Pens', 'Erasers', 'Paper Clips', 'Sticky Notes', 'Rubber Bands'] },
            { name: 'Snacks & Treats', items: ['Candies', 'Chips', 'Biscuits', 'Namkeen', 'Wafers'] },
            { name: 'Small Gifts', items: ['Key Chains', 'Fridge Magnets', 'Mini Plants', 'Bookmarks'] },
        ],
        'Electronics': [
            { name: 'Mobiles & Tablets', items: ['Smartphones', 'Tablets', 'Mobile Covers', 'Screen Guards', 'Chargers & Cables'] },
            { name: 'Computers', items: ['Laptops', 'Desktop PCs', 'Keyboards', 'Mice', 'Monitors', 'Webcams'] },
            { name: 'Audio & Video', items: ['Headphones', 'Earbuds', 'Bluetooth Speakers', 'Smart TVs', 'Projectors'] },
        ],
        'Beauty & Personal Care': [
            { name: 'Skincare', items: ['Face Wash', 'Moisturizers', 'Sunscreen', 'Face Masks', 'Serums'] },
            { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Masks', 'Combs & Brushes'] },
            { name: 'Makeup', items: ['Lipstick', 'Foundation', 'Mascara', 'Eyeliner', 'Blush & Highlighter'] },
        ],
        'Gifts': [
            { name: 'Gift Sets', items: ['Hampers', 'Combo Packs', 'Personalized Gifts', 'Gift Cards', 'Chocolates'] },
            { name: 'Occasions', items: ['Birthday', 'Anniversary', 'Wedding', 'Diwali', 'Corporate Gifts'] },
            { name: 'Stationery', items: ['Notebooks', 'Pens & Pencils', 'Diaries', 'Sticky Notes', 'Calendars'] },
        ],
        'Car & Bikes': [
            { name: 'Car Accessories', items: ['Car Covers', 'Seat Covers', 'Dash Cams', 'Car Fresheners', 'Steering Covers'] },
            { name: 'Bike Accessories', items: ['Helmets', 'Gloves', 'Bike Locks', 'Mirrors', 'Phone Mounts'] },
            { name: 'Tools & Care', items: ['Car Wash Kits', 'Tyre Inflators', 'Jump Starters', 'Polish & Wax'] },
        ],
        'Toys and Games': [
            { name: 'Kids Toys', items: ['Action Figures', 'Building Blocks', 'Dolls', 'Educational Toys', 'Art & Craft'] },
            { name: 'Board Games', items: ['Chess', 'Ludo', 'Card Games', 'Puzzles', 'Strategy Games'] },
            { name: 'Outdoor Play', items: ['Cricket Sets', 'Badminton', 'Footballs', 'Frisbees', 'Skipping Ropes'] },
        ]
    }
};
