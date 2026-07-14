window.downloadInvoice = function(orderId) {
    let iframe = document.getElementById('invoice-download-iframe');
    if (iframe) {
        iframe.remove();
    }
    iframe = document.createElement('iframe');
    iframe.id = 'invoice-download-iframe';
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.src = 'invoice.html?id=' + orderId + '&download=true';
    document.body.appendChild(iframe);
};

window.openReviewModal = function() {
    const p = orderDetailsData.product;
    if (p) {
        document.getElementById('reviewProductImage').src = p.image;
        document.getElementById('reviewProductName').textContent = p.name;
        document.getElementById('reviewProductSpecs').innerHTML = `
            Color: ${p.color} | Storage: ${p.storage} | Seller: ${p.seller}
        `;
    }
    
    // Clear validation states
    document.getElementById('ratingErrorMsg').classList.add('d-none');
    document.getElementById('reviewTextErrorMsg').classList.add('d-none');
    document.getElementById('summaryErrorMsg').classList.add('d-none');
    
    // Clear input fields
    document.getElementById('selectedRating').value = '0';
    const stars = document.querySelectorAll('#reviewStarRating .star-item');
    stars.forEach(s => {
        s.classList.remove('fa-solid', 'text-warning');
        s.classList.add('fa-regular');
    });
    document.getElementById('reviewTextarea').value = '';
    document.getElementById('reviewCharCounter').textContent = '0 characters';
    document.getElementById('reviewSummaryInput').value = '';
    document.getElementById('mediaPreviewContainer').innerHTML = '';

    // Open Modal
    const modalEl = document.getElementById('productReviewModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
};

/* Render Order Details Page */
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orderStatusParam = urlParams.get('status');

    if (orderStatusParam && orderDetailsData) {
        orderDetailsData.orderInfo.orderStatus = orderStatusParam;
        
        if (orderStatusParam === 'Cancelled' || orderStatusParam === 'Returned') {
            const btnReturn = document.getElementById('btn-return-product');
            const btnCancel = document.getElementById('btn-cancel-order');
            if (btnReturn) {
                btnReturn.classList.remove('d-flex');
                btnReturn.classList.add('d-none');
            }
            if (btnCancel) {
                btnCancel.classList.remove('d-flex');
                btnCancel.classList.add('d-none');
            }
        }
        
        const baseTimeline = [
            { status: 'Confirmed', time: '13 Jun 2026, 10:30 AM', completed: true },
            { status: 'Label Printed', time: '13 Jun 2026, 10:45 AM', completed: true },
            { status: 'Shipped', time: '13 Jun 2026, 04:10 PM', completed: true },
            { status: 'In Transit', time: '14 Jun 2026, 09:20 AM', completed: true },
            { status: 'Out for Delivery', time: '14 Jun 2026, 12:10 PM', completed: true },
            { status: 'Delivered', time: '14 Jun 2026, 02:45 PM', completed: true }
        ];

        let newTimeline = [];
        if (orderStatusParam === 'Cancelled') {
            newTimeline = [
                { status: 'Confirmed', time: '13 Jun 2026, 10:30 AM', completed: true },
                { status: 'Cancelled', time: '13 Jun 2026, 11:00 AM', completed: true }
            ];
        } else if (orderStatusParam === 'Returned') {
            newTimeline = [
                ...baseTimeline,
                { status: 'Returned', time: '16 Jun 2026, 10:00 AM', completed: true }
            ];
        } else {
            const statusIndex = baseTimeline.findIndex(t => t.status.toLowerCase() === orderStatusParam.toLowerCase());
            if (statusIndex !== -1) {
                newTimeline = baseTimeline.slice(0, statusIndex + 1);
                for (let i = statusIndex + 1; i < baseTimeline.length; i++) {
                    newTimeline.push({ status: baseTimeline[i].status, time: '--', completed: false });
                }
            } else {
                newTimeline = baseTimeline;
            }
        }
        orderDetailsData.timeline = newTimeline;
    }

    // Render Order Info Banner
    function renderOrderBanner() {
        const bannerContainer = document.getElementById('order-banner-container');
        if (bannerContainer && orderDetailsData.orderInfo) {
            const oi = orderDetailsData.orderInfo;
            bannerContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-4">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-2 text-white-50 small fw-semibold">
                            <a href="myorders.html" class="text-white-50 text-decoration-none hover-white"><i class="fa-solid fa-arrow-left"></i> My Orders</a>
                            <span>&raquo;</span>
                            <span>Order Details</span>
                        </div>
                        <h2 class="fw-bold mb-1 banner-title">Order #${oi.orderNumber}</h2>
                        <p class="mb-0 text-white-50 small">Placed on ${oi.orderDate}</p>
                    </div>
                    <div class="d-flex align-items-center flex-wrap gap-2 banner-stats-container">
                        <div class="banner-stat-card">
                            <div class="banner-stat-icon"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                            <div class="banner-stat-info">
                                <p>Order Value</p>
                                <h6>&#8377;${oi.orderValue.toLocaleString()}</h6>
                            </div>
                        </div>
                        <div class="banner-stat-card">
                            <div class="banner-stat-icon"><i class="fa-regular fa-credit-card"></i></div>
                            <div class="banner-stat-info">
                                <p>Payment Type</p>
                                <h6>${oi.paymentType}</h6>
                            </div>
                        </div>
                        <div class="banner-stat-card">
                            <div class="banner-stat-icon"><i class="fa-regular fa-circle-check"></i></div>
                            <div class="banner-stat-info">
                                <p>Order Status</p>
                                <h6>${oi.orderStatus}</h6>
                            </div>
                        </div>
                        <div class="banner-stat-card">
                            <div class="banner-stat-icon"><i class="fa-regular fa-star"></i></div>
                            <div class="banner-stat-info">
                                <p>Reward Points</p>
                                <h6>${oi.rewardPoints}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Render Timeline
    function renderTimeline() {
        const timelineContainer = document.getElementById('timeline-container');
        if (timelineContainer && orderDetailsData.timeline) {
            const completedSteps = orderDetailsData.timeline.filter(t => t.completed);
            const completedCount = completedSteps.length;
            const progressPercent = (completedCount / orderDetailsData.timeline.length) * 100;
            const lastStep = completedSteps[completedSteps.length - 1] || orderDetailsData.timeline[0];
            
            let alertColor = 'success';
            let alertBg = '#eafcf1';
            let alertBorder = '#d1f7df';
            let alertIcon = 'fa-circle-check';
            let alertMessage = `Your order has been ${lastStep.status.toLowerCase()}`;
            
            if (lastStep.status === 'Cancelled') {
                alertColor = 'danger';
                alertBg = '#fceaea';
                alertBorder = '#f7d1d1';
                alertIcon = 'fa-circle-xmark';
                alertMessage = 'Your order has been cancelled';
            } else if (lastStep.status === 'Returned') {
                alertColor = 'warning';
                alertBg = '#fcf8ea';
                alertBorder = '#f7f1d1';
                alertIcon = 'fa-arrow-rotate-left';
                alertMessage = 'Your order has been returned';
            } else if (lastStep.status !== 'Delivered') {
                alertColor = 'primary';
                alertBg = '#eaf2fc';
                alertBorder = '#d1e3f7';
                alertIcon = 'fa-circle-info';
                alertMessage = `Your order is currently: ${lastStep.status}`;
            }

            const isRedTimeline = (lastStep.status === 'Cancelled' || lastStep.status === 'Returned');
            
            timelineContainer.innerHTML = `
                <div class="timeline-track-wrap mb-2 ${isRedTimeline ? 'timeline-red' : ''}" style="margin-top: 4px;">
                    <div class="timeline-line">
                        <div class="timeline-line-active" style="width: ${progressPercent}%;"></div>
                    </div>
                    <div class="timeline-steps">
                        ${orderDetailsData.timeline.map(step => `
                            <div class="timeline-step ${step.completed ? 'completed' : ''}">
                                <div class="timeline-circle">${step.completed ? (step.status === 'Cancelled' ? '<i class="fa-solid fa-xmark"></i>' : (step.status === 'Returned' ? '<i class="fa-solid fa-rotate-left"></i>' : '<i class="fa-solid fa-check"></i>')) : ''}</div>
                                <div class="timeline-label">${step.status}</div>
                                <span class="timeline-time">${step.time.includes(',') ? `${step.time.split(',')[0]}<br>${step.time.split(',')[1].trim()}` : step.time}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="alert alert-${alertColor} d-flex flex-column gap-1 p-3 rounded-3 mb-0" role="alert" style="background-color: ${alertBg}; border: 1px solid ${alertBorder};">
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid ${alertIcon} text-${alertColor} fs-5"></i>
                        <span class="text-${alertColor}-emphasis fw-medium small">${alertMessage}</span>
                    </div>
                    <span class="text-${alertColor} fw-bold small ms-4">Status on ${lastStep.time}</span>
                </div>
            `;
        }
    }

    // Render Order Summary
    function renderOrderSummary() {
        const summaryContainer = document.getElementById('order-summary-container');
        if (summaryContainer && orderDetailsData.orderInfo) {
            const oi = orderDetailsData.orderInfo;
            summaryContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-receipt"></i> Order Summary</h5>
                <div class="table-responsive">
                    <table class="table table-borderless table-sm mb-0 small" style="font-size: 0.8rem;">
                        <tbody>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Order Number</td>
                                <td class="text-end fw-semibold py-2">${oi.orderNumber}</td>
                            </tr>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Order Date</td>
                                <td class="text-end fw-semibold py-2">${oi.orderDate}</td>
                            </tr>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Payment Method</td>
                                <td class="text-end fw-semibold py-2">${oi.paymentMethod}</td>
                            </tr>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Payment Status</td>
                                <td class="text-end fw-bold text-success py-2">${oi.paymentStatus}</td>
                            </tr>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Order Value</td>
                                <td class="text-end fw-bold py-2">&#8377;${oi.orderValue.toLocaleString()}</td>
                            </tr>
                            <tr class="border-bottom border-light">
                                <td class="text-secondary py-2">Items</td>
                                <td class="text-end fw-semibold py-2">${oi.items}</td>
                            </tr>
                            <tr>
                                <td class="text-secondary py-2">Invoice Number</td>
                                <td class="text-end fw-semibold py-2">${oi.invoiceNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                ${oi.orderStatus !== 'Cancelled' ? `
                <button class="btn btn-outline-primary w-100 mt-3 d-flex align-items-center justify-content-center gap-2 py-2 fw-bold" onclick="downloadInvoice('${oi.orderNumber}');" style="border-radius: 8px; font-size: 0.8rem;">
                    <i class="fa-solid fa-download"></i> Download Invoice
                </button>
                ` : ''}
            `;
        }
    }

    // Render Product Details
    function renderProductDetails() {
        const productContainer = document.getElementById('product-details-container');
        if (productContainer && orderDetailsData.product) {
            const p = orderDetailsData.product;
            productContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-mobile-screen-button"></i> Product Details</h5>
                <div class="d-flex gap-3 mb-3 cursor-pointer" style="cursor: pointer;" onclick="window.location.href='product-details.html?id=${p.id || 1}'">
                    <div class="flex-shrink-0" style="width: 75px; height: 75px; border: 1px solid #eef2f6; border-radius: 8px; overflow: hidden; padding: 4px;">
                        <img src="${p.image}" alt="${p.name}" class="w-100 h-100 object-fit-contain">
                    </div>
                    <div style="min-width: 0;">
                        <h6 class="fw-bold mb-1" style="font-size: 0.85rem; color: #1a1a2e; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; max-height: 2.6em;">${p.name}</h6>
                        <p class="text-secondary mb-1" style="font-size: 0.72rem; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; max-height: 2.6em;">
                            Color: ${p.color} | Storage: ${p.storage} | Seller: ${p.seller}
                        </p>
                        <div class="d-flex align-items-center gap-2 mt-2">
                            <span class="fw-bold text-dark" style="font-size: 0.85rem;">&#8377;${p.price.toLocaleString()}</span>
                            <span class="text-muted small" style="font-size: 0.72rem;">Qty: ${p.quantity}</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary flex-grow-1 py-2 fw-semibold" style="border-radius: 8px; font-size: 0.75rem; white-space: nowrap;" onclick="window.location.href='checkout.html'">Buy Again</button>
                    ${orderDetailsData.orderInfo.orderStatus !== 'Cancelled' ? `
                    <button class="btn btn-outline-primary flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-1" onclick="openReviewModal();" style="border-radius: 8px; font-size: 0.75rem; white-space: nowrap;">
                        <i class="fa-regular fa-star"></i> Rate Product
                    </button>
                    ` : ''}
                </div>
            `;
        }
    }

    // Render Delivery Address
    function renderDeliveryAddress() {
        const addressContainer = document.getElementById('delivery-address-container');
        if (addressContainer && orderDetailsData.deliveryAddress) {
            const da = orderDetailsData.deliveryAddress;
            addressContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-location-dot"></i> Delivery Address</h5>
                <div class="mb-3 small" style="font-size: 0.8rem; line-height: 1.5;">
                    <p class="fw-bold mb-1 text-dark">${da.name}</p>
                    <p class="text-secondary mb-3"><i class="fa-solid fa-phone me-1 opacity-75"></i> ${da.phone}</p>
                    <div class="position-relative">
                        <p id="addressText" class="text-secondary mb-0" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.5; max-height: 4.5em; transition: max-height 0.3s ease;">
                            ${da.address.replace(/,/g, ',<br>')}
                        </p>
                        <button id="toggleAddressBtn" class="btn btn-link p-0 text-primary fw-semibold text-decoration-none d-none" style="font-size: 0.75rem; margin-top: 4px;">
                            Show More
                        </button>
                    </div>
                </div>
            `;

            // Add expand/collapse logic
            setTimeout(() => {
                const addrEl = document.getElementById('addressText');
                const btnEl = document.getElementById('toggleAddressBtn');
                if (addrEl && btnEl) {
                    if (addrEl.scrollHeight > addrEl.clientHeight) {
                        btnEl.classList.remove('d-none');
                        btnEl.addEventListener('click', () => {
                            const isCollapsed = addrEl.style.webkitLineClamp === '3' || addrEl.style.webkitLineClamp === '';
                            if (isCollapsed) {
                                addrEl.style.display = 'block';
                                addrEl.style.maxHeight = 'none';
                                addrEl.style.webkitLineClamp = 'unset';
                                btnEl.textContent = 'Show Less';
                            } else {
                                addrEl.style.display = '-webkit-box';
                                addrEl.style.maxHeight = '4.5em';
                                addrEl.style.webkitLineClamp = '3';
                                btnEl.textContent = 'Show More';
                            }
                        });
                    }
                }
            }, 50);
        }
    }

    // Render Payment Information
    function renderPaymentInfo() {
        const paymentContainer = document.getElementById('payment-info-container');
        if (paymentContainer && orderDetailsData.paymentInfo) {
            const pi = orderDetailsData.paymentInfo;
            paymentContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-credit-card"></i> Payment Information</h5>
                <div class="table-responsive small mb-0" style="font-size: 0.8rem;">
                    <table class="table table-borderless table-sm mb-0">
                        <tbody>
                            <tr>
                                <td class="text-secondary py-1 ps-0">Payment Method</td>
                                <td class="text-end fw-semibold py-1 pe-0">${pi.paymentMethod}</td>
                            </tr>
                            <tr>
                                <td class="text-secondary py-1 ps-0">Transaction ID</td>
                                <td class="text-end fw-semibold py-1 pe-0">${pi.transactionId}</td>
                            </tr>
                            <tr>
                                <td class="text-secondary py-1 ps-0">Payment Status</td>
                                <td class="text-end text-success fw-bold py-1 pe-0 d-flex align-items-center justify-content-end gap-1">
                                    ${pi.paymentStatus} <i class="fa-solid fa-circle-check text-success" style="font-size: 0.75rem;"></i>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-secondary py-1 ps-0">Paid On</td>
                                <td class="text-end fw-semibold py-1 pe-0">${pi.paidOn}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
        }
    }

    // Render Tracking History
    function renderTrackingHistory() {
        const trackingContainer = document.getElementById('tracking-history-container');
        if (trackingContainer && orderDetailsData.trackingHistory) {
            trackingContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-history"></i> Order Tracking History</h5>
                <div class="row g-4 mt-1">
                    ${orderDetailsData.trackingHistory.map(item => `
                        <div class="col-md-4 col-sm-6">
                            <div class="history-timeline-item ${item.completed ? 'completed' : ''}">
                                <div class="history-timeline-dot"></div>
                                <div class="history-timeline-content">
                                    <span class="history-timeline-date">${item.date}</span>
                                    <h6>${item.status}</h6>
                                    <p>${item.description}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Render Return Info
    function renderReturnInfo() {
        const returnContainer = document.getElementById('return-info-container');
        if (returnContainer && orderDetailsData.returnInfo) {
            if (orderDetailsData.orderInfo && orderDetailsData.orderInfo.orderStatus === 'Cancelled') {
                returnContainer.innerHTML = '';
                return;
            }
            const ri = orderDetailsData.returnInfo;
            returnContainer.innerHTML = `
                <h5 class="details-card-title"><i class="fa-solid fa-arrows-rotate"></i> Return / Replace</h5>
                <div class="mb-3 small">
                    <p class="text-secondary mb-1">Return window is open till</p>
                    <p class="fw-bold text-success mb-0">${ri.returnWindowOpen}</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-1" style="border-radius: 8px; font-size: 0.78rem;" data-bs-toggle="modal" data-bs-target="#unboxingVideoModal">
                        <i class="fa-solid fa-box-open"></i> Return Product
                    </button>
                    <button class="btn btn-outline-primary flex-grow-1 py-2 fw-semibold d-flex align-items-center justify-content-center gap-1" style="border-radius: 8px; font-size: 0.78rem;">
                        <i class="fa-solid fa-rotate"></i> Replace Product
                    </button>
                </div>
            `;
        }
    }

    // Render More Actions
    function renderMoreActions() {
        if (orderDetailsData.orderInfo) {
            const status = orderDetailsData.orderInfo.orderStatus;
            if (status === 'Cancelled' || status === 'Returned') {
                const returnBtn = document.getElementById('returnOrderBtn');
                const cancelBtn = document.getElementById('cancelOrderBtn');
                
                if (returnBtn) {
                    returnBtn.classList.remove('d-flex');
                    returnBtn.classList.add('d-none');
                }
                if (cancelBtn) {
                    cancelBtn.classList.remove('d-flex');
                    cancelBtn.classList.add('d-none');
                }
            }
        }
    }

    // Initialize all renders
    renderOrderBanner();
    renderTimeline();
    renderOrderSummary();
    renderProductDetails();
    renderDeliveryAddress();
    renderPaymentInfo();
    renderTrackingHistory();
    renderMoreActions();
});
