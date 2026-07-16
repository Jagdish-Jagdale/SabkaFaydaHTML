const mockData = {
    orders: [
        {
            id: 'SF2026001254',
            productName: 'OnePlus Nord CE 4 Lite 5G',
            productDesc: '8GB RAM | 256GB Storage',
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
            totalAmount: '19,999',
            actions: [
                { label: 'Buy Again', btnClass: 'btn-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' },
                { label: 'Rate Product', btnClass: 'btn-outline-primary', link: 'order-details.html?rate=true' }
            ]
        },
        {
            id: 'SF2026001255',
            productName: 'Realme Buds Air 5 Pro',
            productDesc: 'Wireless Earbuds (White)',
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
            totalAmount: '1,299',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001256',
            productName: 'Prestige Electric Kettle',
            productDesc: '1.5L (Silver)',
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
            totalAmount: '899',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001257',
            productName: 'Puma Men\'s Running Shoes',
            productDesc: 'Size - 9, Red',
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
            totalAmount: '2,499',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001258',
            productName: 'Peter England Men\'s T-Shirt',
            productDesc: 'Size - L, Grey',
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
            totalAmount: '799',
            actions: [
                { label: 'Reorder', btnClass: 'btn-outline-primary' },
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001259',
            productName: 'boAt Rockerz 450 Bluetooth Headphones',
            productDesc: 'Aqua Blue, On Ear',
            qty: 1,
            image: 'assets/img/electronicimg.png',
            orderDate: '15 Jun 2026',
            orderTime: '02:15 PM',
            paymentMethod: 'Prepaid',
            status: 'Confirmed',
            statusIcon: 'fa-check',
            statusClass: 'confirmed',
            statusDateLabel: 'Confirmed on',
            statusDate: '15 Jun 2026, 02:20 PM',
            totalAmount: '1,499',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001260',
            productName: 'Noise ColorFit Pro 4 Smartwatch',
            productDesc: 'Charcoal Black',
            qty: 1,
            image: 'assets/img/homescreenimg.png',
            orderDate: '14 Jun 2026',
            orderTime: '10:00 AM',
            paymentMethod: 'Prepaid',
            status: 'Label Printed',
            statusIcon: 'fa-print',
            statusClass: 'label-printed',
            statusDateLabel: 'Label Printed on',
            statusDate: '14 Jun 2026, 11:30 AM',
            totalAmount: '2,999',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        },
        {
            id: 'SF2026001261',
            productName: 'Safari Ray Polycarbonate Suitcase',
            productDesc: '65 cms, Midnight Blue',
            qty: 1,
            image: 'assets/img/a044e058df3531fb5b172a6bc3128b5e27a6fbe8.png',
            orderDate: '01 Jun 2026',
            orderTime: '09:00 AM',
            paymentMethod: 'COD',
            status: 'Returned',
            statusIcon: 'fa-arrow-rotate-left',
            statusClass: 'returned',
            statusDateLabel: 'Returned on',
            statusDate: '08 Jun 2026, 04:00 PM',
            totalAmount: '3,499',
            actions: [
                { label: 'View Details', btnClass: 'btn-outline-primary', link: 'order-details.html' }
            ]
        }
    ],
    wishlist: [
        {
            id: 'W001',
            productName: 'Samsung Galaxy S24 Ultra, 512GB, Titanium Black',
            price: '1,34,999',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.19.28 PM (11).jpeg',
            addedDate: '28 Jun 2026, 11:30 AM',
            orderDate: '28 Jun 2026',
            status: 'IN STOCK',
            statusClass: 'delivered'
        },
        {
            id: 'W002',
            productName: 'Bose QuietComfort Ultra',
            price: '29,990',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.23.47 PM (3).jpeg',
            addedDate: '25 Jun 2026, 09:15 AM',
            orderDate: '25 Jun 2026',
            status: 'IN STOCK',
            statusClass: 'delivered'
        },
        {
            id: 'W003',
            productName: 'Adidas Ultraboost 22',
            price: '14,995',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.23.47 PM (4).jpeg',
            addedDate: '22 Jun 2026, 04:45 PM',
            orderDate: '22 Jun 2026',
            status: 'ONLY 2 LEFT',
            statusClass: 'out-delivery'
        },
        {
            id: 'W004',
            productName: 'JBL Flip 6 Portable Speaker',
            price: '4,499',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.23.47 PM (5).jpeg',
            addedDate: '20 Jun 2026, 10:20 AM',
            orderDate: '20 Jun 2026',
            status: 'IN STOCK',
            statusClass: 'delivered'
        }
    ],
    cart: [
        {
            id: 'C001',
            productName: 'Vivo V30 Pro 5G',
            specs: ['Spec: Snapdragon 7 Gen 3, 5000mAh Battery', '8GB RAM, 256GB Storage'],
            status: 'In Stock',
            qty: 1,
            price: '42,990',
            originalPrice: '46,990',
            discount: '9% Off',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.23.47 PM.jpeg'
        },
        {
            id: 'C002',
            productName: 'Oppo Enco X2',
            specs: ['Spec: Dual Drivers, LHDC 5.0', 'BT 5.3, IP54 Water Resistant'],
            status: 'In Stock',
            qty: 1,
            price: '3,499',
            originalPrice: '3,999',
            discount: '13% Off',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.19.28 PM (1).jpeg'
        },
        {
            id: 'C003',
            productName: 'Philips Air Fryer',
            specs: ['Spec: 1400W, Rapid Air Technology', 'Digital Display'],
            status: 'In Stock',
            qty: 1,
            price: '6,490',
            originalPrice: '7,990',
            discount: '19% Off',
            image: 'assets/img/WhatsApp Image 2026-07-16 at 3.19.28 PM (10).jpeg'
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
            title: 'Order SF#2026001254 - Realme Buds Air 5 Pro, Out for Delivery',
            desc: 'Your Realme Buds Air 5 Pro has reached the local hub, out for delivery to your shipping address.',
            date: '28 Jun 2026, 11:30 AM',
            dateISO: '2026-06-28T11:30:00',
            timestamp: 1782631800000,
            timeAgo: '2 Minutes Ago',
            category: 'order-updates',
            status: 'unread',
            iconClass: 'fa-truck',
            iconStatClass: 'stat-green',
            primaryAction: 'View More'
        },

        {
            id: 'N003',
            title: 'Cashback Credited! ₹179.17 added to your Wallet',
            desc: '₹179.17 has been credited to your Sabka Fayda wallet from Order #SF2026001254.',
            date: '28 Jun 2026, 09:15 PM',
            dateISO: '2026-06-28T21:10:00',
            timestamp: 1782679800000,
            timeAgo: '3 Hours Ago',
            category: 'wallet-payments',
            status: 'read',
            iconClass: 'fa-wallet',
            iconStatClass: 'stat-blue',
            primaryAction: 'View Wallet'
        },
        {
            id: 'N004',
            title: 'Your Order #SF2026001258 was Cancelled',
            desc: 'As per your request, the Peter England Men\'s T-Shirt order has been cancelled and refund initiated.',
            date: '10 Jun 2026, 05:20 PM',
            dateISO: '2026-06-10T17:20:00',
            timestamp: 1781077800000,
            timeAgo: '3 Days Ago',
            category: 'order-updates',
            status: 'read',
            iconClass: 'fa-circle-xmark',
            iconStatClass: 'stat-red',
            primaryAction: 'View More'
        },
        {
            id: 'N005',
            title: 'Your Order #SF2026001257 is Out for Delivery',
            desc: 'Puma Men\'s Running Shoes is on the way! Expected delivery today by 8 PM.',
            date: '11 Jun 2026, 04:40 PM',
            dateISO: '2026-06-11T16:40:00',
            timestamp: 1781158800000,
            timeAgo: '2 Days Ago',
            category: 'order-updates',
            status: 'unread',
            iconClass: 'fa-motorcycle',
            iconStatClass: 'stat-green',
            primaryAction: 'Track Order'
        },
        {
            id: 'N006',
            title: 'Account Security Alert',
            desc: 'A new login was detected from a new device. If this wasn\'t you, please change your password.',
            date: '28 Jun 2026, 11:30 PM',
            dateISO: '2026-06-28T23:30:00',
            timestamp: 1782689400000,
            timeAgo: '1 Hour Ago',
            category: 'account-offers',
            status: 'unread',
            iconClass: 'fa-shield-halved',
            iconStatClass: 'stat-purple',
            primaryAction: 'Review Activity'
        }
    ]
};
