const mockData = {
    orders: [
        {
            id: 'SF2026001254',
            productName: 'Samsung Galaxy M35 5G',
            productDesc: '8GB RAM | 128GB Storage',
            qty: 1,
            image: 'assets/img/electronicimg.png',
            orderDate: '13 Jun 2026',
            orderTime: '10:30 AM',
            paymentMethod: 'Prepaid',
            status: 'Delivered',
            statusIcon: 'fa-circle-check',
            statusClass: 'delivered',
            statusDateLabel: 'Delivered on',
            statusDate: '14 Jun 2026, 02:45 PM',
            totalAmount: '15,990',
            actions: [
                { label: 'Buy Again', btnClass: 'btn-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' },
                { label: 'Rate Product', btnClass: 'btn-outline-primary' }
            ]
        },
        {
            id: 'SF2026001255',
            productName: 'boAt Airdopes 311 Pro',
            productDesc: 'Wireless Earbuds (Black)',
            qty: 1,
            image: 'assets/img/a2f999f18286586db85f7a0a39ac20a6f3b46f37.png',
            orderDate: '13 Jun 2026',
            orderTime: '09:15 PM',
            paymentMethod: 'COD',
            status: 'In Transit',
            statusIcon: 'fa-truck',
            statusClass: 'transit',
            statusDateLabel: 'Expected Delivery',
            statusDate: '18 Jun 2026',
            totalAmount: '999',
            actions: [
                { label: 'Track Order', btnClass: 'btn-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001256',
            productName: 'AGARO Waffle Maker',
            productDesc: '750W (Black)',
            qty: 1,
            image: 'assets/img/homescreenimg.png',
            orderDate: '13 Jun 2026',
            orderTime: '09:15 PM',
            paymentMethod: 'COD',
            status: 'Shipped',
            statusIcon: 'fa-box',
            statusClass: 'shipped',
            statusDateLabel: 'Shipped on',
            statusDate: '13 Jun 2026, 11:05 AM',
            totalAmount: '1,299',
            actions: [
                { label: 'Track Order', btnClass: 'btn-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001257',
            productName: 'Campus Men\'s Sneakers',
            productDesc: 'Size - 8, Black',
            qty: 1,
            image: 'assets/img/4fb99229018727c624d87bcca8e826f53a077ad8.png',
            orderDate: '11 Jun 2026',
            orderTime: '04:40 PM',
            paymentMethod: 'COD',
            status: 'Out for Delivery',
            statusIcon: 'fa-motorcycle',
            statusClass: 'out-delivery',
            statusDateLabel: 'Expected Delivery',
            statusDate: '14 Jun 2026',
            totalAmount: '1,599',
            actions: [
                { label: 'Track Order', btnClass: 'btn-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001258',
            productName: 'Allen Solly Men\'s Shirt',
            productDesc: 'Size - M, Blue',
            qty: 1,
            image: 'assets/img/a044e058df3531fb5b172a6bc3128b5e27a6fbe8.png',
            orderDate: '10 Jun 2026',
            orderTime: '11:10 AM',
            paymentMethod: 'Prepaid',
            status: 'Cancelled',
            statusIcon: 'fa-circle-xmark',
            statusClass: 'cancelled',
            statusDateLabel: 'Cancelled on',
            statusDate: '10 Jun 2026, 05:20 PM',
            totalAmount: '1,049',
            actions: [
                { label: 'Reorder', btnClass: 'btn-outline-primary' }
            ]
        }
    ],
    wishlist: [
        {
            id: 'W001',
            productName: 'Apple iPhone 15 Pro, 256GB, Blue Titanium',
            price: '1,24,900',
            image: 'assets/img/iphone15_blue.png',
            addedDate: '28 Jun 2026, 11:30 AM',
            orderDate: '28 Jun 2026',
            status: 'IN STOCK',
            statusClass: 'delivered'
        },
        {
            id: 'W002',
            productName: 'Sony WH-1000XM5 Black',
            price: '26,990',
            image: 'assets/img/sony_headphones.png',
            addedDate: '25 Jun 2026, 09:15 AM',
            orderDate: '25 Jun 2026',
            status: 'IN STOCK',
            statusClass: 'delivered'
        },
        {
            id: 'W003',
            productName: 'Nike Air Max 270 React',
            price: '12,495',
            image: 'assets/img/nike_shoes.png',
            addedDate: '22 Jun 2026, 04:45 PM',
            orderDate: '22 Jun 2026',
            status: 'ONLY 2 LEFT',
            statusClass: 'out-delivery'
        },
        {
            id: 'W004',
            productName: 'boAt Stone 1200 14W',
            price: '3,999',
            image: 'assets/img/boat_speaker.png',
            addedDate: '20 Jun 2026, 10:20 AM',
            orderDate: '20 Jun 2026',
            status: 'OUT OF STOCK',
            statusClass: 'cancelled'
        }
    ],
    cart: [
        {
            id: 'C001',
            productName: 'Samsung Galaxy M35 5G',
            specs: ['Spec: Exynos 1380, 6000mAh Battery', '6GB RAM, 128GB Storage'],
            status: 'In Stock',
            qty: 1,
            price: '15,990',
            originalPrice: '17,990',
            discount: '11% Off',
            image: 'assets/img/electronicimg.png'
        },
        {
            id: 'C002',
            productName: 'boAt Airdopes 311 Pro',
            specs: ['Spec: Dual Mics, ENx Tech', 'BT 5.3, IPX4 Water Resistant'],
            status: 'In Stock',
            qty: 1,
            price: '2,500',
            originalPrice: '2,799',
            discount: '11% Off',
            image: 'assets/img/sony_headphones.png'
        },
        {
            id: 'C003',
            productName: 'AGARO Waffle Maker',
            specs: ['Spec: 750W, Non-Stick', 'Cool Touch Handle'],
            status: 'In Stock',
            qty: 1,
            price: '2,290',
            originalPrice: '2,590',
            discount: '12% Off',
            image: 'assets/img/homescreenimg.png'
        }
    ],
    wallet: [
        {
            id: 'T001',
            orderId: 'Order #399',
            date: '20 Jun 2026',
            time: '03:07 PM',
            amount: '179.17',
            points: '2 Points',
            amountColor: 'text-success',
            amountIcon: 'fa-money-bill-wave',
            title: 'Bonus Amount'
        },
        {
            id: 'T002',
            orderId: 'Order #398',
            date: '18 Jun 2026',
            time: '11:20 AM',
            amount: '120',
            points: '1 Point',
            amountColor: 'text-success',
            amountIcon: 'fa-money-bill-wave',
            title: 'Bonus Amount'
        },
        {
            id: 'T003',
            orderId: 'Order #397',
            date: '15 Jun 2026',
            time: '09:45 AM',
            amount: '- 50.00',
            points: '0 Points',
            amountColor: 'text-danger',
            amountIcon: 'fa-arrow-down',
            title: 'Paid Amount'
        }
    ],
    notifications: [
        {
            id: 'N001',
            title: 'Your Order #SF2026001254 has been delivered',
            desc: 'Package was handed directly to a resident.',
            time: '2 hours ago',
            icon: 'fa-box',
            iconColor: 'bg-success',
            iconTextClass: 'text-success'
        },
        {
            id: 'N002',
            title: 'Cashback Credited!',
            desc: '₹ 179.17 has been credited to your Sabka Fayda wallet.',
            time: '1 day ago',
            icon: 'fa-wallet',
            iconColor: 'bg-primary',
            iconTextClass: 'text-primary'
        },
        {
            id: 'N003',
            title: 'Your Order #SF2026001258 was cancelled',
            desc: 'As per your request, the order has been cancelled and refund initiated.',
            time: '3 days ago',
            icon: 'fa-circle-xmark',
            iconColor: 'bg-danger',
            iconTextClass: 'text-danger'
        }
    ]
};
