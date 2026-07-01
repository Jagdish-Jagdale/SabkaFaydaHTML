function renderOrders(ordersData) {
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    let html = '';
    ordersData.forEach(order => {
        let actionsHtml = order.actions.map(action => {
            if (action.link) {
                return `<a href="${action.link}" class="btn ${action.btnClass}">${action.label}</a>`;
            } else {
                return `<button class="btn ${action.btnClass}">${action.label}</button>`;
            }
        }).join('');

        html += `
        <article class="order-card bg-white shadow-sm">
            <div class="order-product">
                <div class="order-product-img">
                    <img src="${order.image}" alt="${order.productName}">
                </div>
                <div>
                    <h3>${order.productName}</h3>
                    <p>${order.productDesc}</p>
                    <span>Qty: ${order.qty}</span>
                    <div class="order-id">Order ID <strong>#${order.id}</strong> <i class="fa-regular fa-copy" style="cursor: pointer;" title="Copy Order ID"></i></div>
                </div>
            </div>
            <div class="order-info-column">
                <div class="order-meta">
                    <i class="fa-regular fa-calendar-days"></i>
                    <div>
                        <span>Order Date</span>
                        <strong>${order.orderDate}</strong>
                        <small>${order.orderTime}</small>
                    </div>
                </div>
                <div class="order-meta">
                    <i class="fa-solid fa-credit-card meta-green"></i>
                    <div>
                        <span>Payment Method</span>
                        <strong>${order.paymentMethod}</strong>
                    </div>
                </div>
            </div>
            <div class="order-status-panel">
                <span class="status-pill ${order.statusClass}">${order.status} <i class="fa-solid ${order.statusIcon}"></i></span>
                <p>${order.statusDateLabel}</p>
                <strong>${order.statusDate}</strong>
                <div class="d-flex align-items-center gap-1"><span>Total Amount:</span> <b class="m-0">&#8377;${order.totalAmount}</b></div>
            </div>
            <div class="order-actions">
                ${actionsHtml}
            </div>
        </article>`;
    });
    container.innerHTML = html;
    
    // Setup filters after rendering the orders
    setupOrderFilters();
}

function setupOrderFilters() {
    const filterChips = document.querySelectorAll('.orders-filter-chip');
    const orderCards = document.querySelectorAll('.order-card');
    
    if (filterChips.length === 0 || orderCards.length === 0) return;

    // 1. Calculate Counts dynamically
    const counts = { all: orderCards.length };
    orderCards.forEach(card => {
        const statusPill = card.querySelector('.status-pill');
        if (statusPill) {
            const statusText = statusPill.textContent.trim().toLowerCase();
            counts[statusText] = (counts[statusText] || 0) + 1;
        }
    });

    // 2. Update filter chips UI with new counts
    filterChips.forEach(chip => {
        const baseText = chip.textContent.split(' (')[0].trim();
        const key = baseText.toLowerCase();
        const count = key === 'all' ? counts.all : (counts[key] || 0);
        chip.textContent = `${baseText} (${count})`;
    });
    
    // 3. Click event for filtering
    filterChips.forEach(chip => {
        chip.onclick = function () {
            filterChips.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const filterText = this.textContent.split(' (')[0].trim().toLowerCase();
            
            orderCards.forEach(card => {
                if (filterText === 'all') {
                    card.style.display = '';
                } else {
                    const statusPill = card.querySelector('.status-pill');
                    if (statusPill) {
                        const statusText = statusPill.textContent.trim().toLowerCase();
                        if (statusText.includes(filterText)) {
                            card.style.display = '';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                }
            });
        };
    });
}
