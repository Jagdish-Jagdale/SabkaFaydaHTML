const homePageMockData = {
    heroSlides: [
        {
            image: 'assets/img/homescreenimg.png',
            ctaText: 'Shop Now',
            ctaLink: 'category.html'
        },
        {
            image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
            ctaText: 'Shop Now',
            ctaLink: 'category.html'
        }
    ],
    categories: [
        { title: 'For You', image: 'assets/img/f6a3531d25c91b762c556b205d1ab4311e7f1cad.png', link: 'category.html' },
        { title: 'Fashion & Lifestyle', image: 'assets/img/17d9cf86f77963084917e236b3476c79d44da9d4.png', link: '#' },
        { title: 'Electronics', image: 'assets/img/5a9a7882b4ce8bd4d6ec186cabbd89c39873031d.png', link: '#' },
        { title: 'Home & Living', image: 'assets/img/49518ef2fad5561a0a3ecc6464a6e66adb806089.png', link: '#' },
        { title: 'kids & Toys', image: 'assets/img/3f1343f9b0707ada3f4ffd9192cf53dab12b7984.png', link: '#' },
        { title: 'Personal Care', image: 'assets/img/4fb99229018727c624d87bcca8e826f53a077ad8.png', link: '#', className: 'd-none d-md-flex' },
        { title: 'Retail & Gifts', image: 'assets/img/b84f8d1c8308b81255dc347d4561545b0c03f019.png', link: '#', className: 'd-none d-md-flex' },
        { title: 'Animal & pet', image: 'assets/img/63e1ee7740ba6f820ad1907f5613d6e4b29fec86.png', link: '#', className: 'd-none d-lg-flex' },
        { title: 'Automobile', image: 'assets/img/c1632a7344a0e80972ea60a118230e4f012c2900.png', link: '#', className: 'd-none d-lg-flex' }
    ],
    keepShopping: {
        title: 'keep Shopping User Name',
        items: [
            { title: 'Min. 70% Off', desc: 'Structured style', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=200&auto=format&fit=crop', alt: 'Shirt' },
            { title: 'Up to 80% Off', desc: 'Fun playtime', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=200&auto=format&fit=crop', alt: 'Toy Car' },
            { title: 'From Rs 6,299/M*', desc: 'Intel Core Ultra PCs', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&auto=format&fit=crop', alt: 'Laptop' },
            { title: 'Min. 60% Off', desc: 'Sports shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop', alt: 'Shoes' },
            { title: 'From Rs 499', desc: 'Audio picks', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop', alt: 'Headphones' },
            { title: 'Up to 55% Off', desc: 'Home decor', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200&auto=format&fit=crop', alt: 'Home Decor' }
        ]
    },
    productSections: [
        {
            title: 'TOP Refer Product',
            layout: 'smallRow',
            items: [
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1599643478514-4a4e09d56334?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop' }
            ]
        },
        {
            title: 'Explore Electronics Products',
            layout: 'smallRow',
            items: [
                { title: 'Smart Gadgets', subtitle: 'Top deals', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop' },
                { title: 'Audio Picks', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
                { title: 'Wearables', subtitle: 'Best seller', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop' },
                { title: 'Accessories', subtitle: 'New deals', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=200&auto=format&fit=crop' },
                { title: 'Premium Tech', subtitle: 'Limited offer', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=200&auto=format&fit=crop' },
                { title: 'Home Theater', subtitle: 'Save big', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=200&auto=format&fit=crop' },
                { title: 'Gaming Gear', subtitle: 'Pro setup', image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=200&auto=format&fit=crop' },
                { title: 'Cameras', subtitle: 'Capture life', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop' },
                { title: 'Wireless Buds', subtitle: 'No strings attached', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200&auto=format&fit=crop' },
                { title: 'Smart Watches', subtitle: 'Stay connected', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=200&auto=format&fit=crop' },
                { title: 'Drones', subtitle: 'Sky high', image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=200&auto=format&fit=crop' },
                { title: 'Tablets', subtitle: 'Work & Play', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200&auto=format&fit=crop' }
            ]
        },
        {
            title: 'Featured Products',
            layout: 'smallRow',
            items: [
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=200&auto=format&fit=crop' },
                { title: 'Jewelry Set', subtitle: 'Mini 70 % off', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=200&auto=format&fit=crop' }
            ]
        }
    ],
    banners: [
        {
            images: [
                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop',
                'assets/img/e9e1823dbbf9666a3b545f2d0c1aa22628a65eb1.png',
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop'
            ]
        },
        {
            images: [
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop'
            ]
        }
    ],
    productGrid: [
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: '4.5★(209)', image: 'https://images.unsplash.com/photo-1599643478514-4a4e09d56334?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: 'New Arrival', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: '4.5★(209)', image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: 'New Arrival', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1599643478514-4a4e09d56334?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: '4.5★(209)', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop' },
        { title: 'Tanishk Zumke', desc: 'thisis the tital of......', oldPrice: '1000', price: 'Rs 500', offer: '70 % Off on all Jewellry', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop' }
    ]
};
