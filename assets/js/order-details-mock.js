/* Order Details Mock Data */
const orderDetailsData = {
    orderInfo: {
        orderNumber: 'SF2026001254',
        orderDate: '13 Jun 2026 at 10:30 AM',
        orderValue: 15990,
        paymentType: 'Prepaid',
        paymentMethod: 'Prepaid (UPI)',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        rewardPoints: '+160 Points',
        items: 1,
        invoiceNumber: 'INV2026001254'
    },
    timeline: [
        { status: 'Confirmed', time: '13 Jun, 10:30 AM', completed: true },
        { status: 'Label Printed', time: '13 Jun, 10:45 AM', completed: true },
        { status: 'Shipped', time: '13 Jun, 04:10 PM', completed: true },
        { status: 'In Transit', time: '14 Jun, 09:20 AM', completed: true },
        { status: 'Out for Delivery', time: '14 Jun, 12:10 PM', completed: true },
        { status: 'Delivered', time: '14 Jun, 02:45 PM', completed: true }
    ],
    product: {
        image: 'assets/img/electronicimg.png',
        name: 'Samsung Galaxy M35 5G',
        color: 'Moonlight Blue',
        storage: '128GB | RAM: 8GB',
        seller: 'Sabka Fayda Retail',
        price: 15990,
        quantity: 1
    },
    deliveryAddress: {
        name: 'Rajesh Sharma',
        phone: '+91 9876543210',
        address: 'Flat 204, Ganesh Residency, Ichalkaranji, Maharashtra - 416115'
    },
    paymentInfo: {
        paymentMethod: 'UPI',
        transactionId: 'UPI784521369',
        paymentStatus: 'Successful',
        paidOn: '13 Jun 2026, 10:31 AM'
    },
    trackingHistory: [
        { date: '13 Jun 2026, 10:30 AM', status: 'Order Confirmed', description: 'Your order has been confirmed', completed: true },
        { date: '13 Jun 2026, 10:45 AM', status: 'Label Printed', description: 'Shipping label has been generated', completed: true },
        { date: '13 Jun 2026, 04:10 PM', status: 'Shipped', description: 'Your order has been shipped', completed: true },
        { date: '14 Jun 2026, 09:20 AM', status: 'In Transit', description: 'Your order is on the way', completed: true },
        { date: '14 Jun 2026, 12:10 PM', status: 'Out for Delivery', description: 'Your order is out for delivery', completed: true },
        { date: '14 Jun 2026, 02:45 PM', status: 'Delivered', description: 'Your order has been delivered', completed: true }
    ],
    returnInfo: {
        returnWindowOpen: '21 Jun 2026 (7 Days Left)'
    }
};
