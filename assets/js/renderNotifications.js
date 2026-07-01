function renderNotifications(notificationsData) {
    const container = document.getElementById('notificationsList');
    if (!container) return;

    let html = '';
    notificationsData.forEach((item, index) => {
        
        let actions = '';
        if (index === 0) {
            actions = `
            <div class="order-actions">
                <button class="btn btn-primary btn-sm">Track Package</button>
                <button class="btn btn-outline-primary btn-sm btn-mark-read">Mark as Read</button>
            </div>`;
        } else if (index === 1) {
            actions = `
            <div class="order-actions">
                <button class="btn btn-primary btn-sm">View Wallet</button>
                <button class="btn btn-outline-primary btn-sm btn-mark-read">Mark as Read</button>
            </div>`;
        } else {
            actions = `
            <div class="order-actions">
                <button class="btn btn-primary btn-sm">Check Status</button>
                <button class="btn btn-outline-primary btn-sm btn-mark-read">Mark as Read</button>
            </div>`;
        }

        html += `
        <article class="order-card bg-white shadow-sm notification-card" data-category="system-alerts" data-status="unread">
            <div class="order-product">
                <div class="notification-icon-wrapper ${item.iconColor.replace('bg-', 'stat-')}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div>
                    <h3 class="product-title">${item.title}</h3>
                    <p class="text-muted mb-0" style="font-size: 0.78rem; line-height: 1.4;">${item.desc}</p>
                </div>
            </div>
            <div class="order-info-column">
                <div class="order-meta">
                    <i class="fa-regular fa-calendar-days"></i>
                    <div>
                        <span>Notification Date</span>
                        <strong>Today</strong>
                        <small class="text-primary fw-bold mt-1">${item.time}</small>
                    </div>
                </div>
            </div>
            <div class="order-status-panel">
                <span class="status-pill transit m-0 px-2 py-1 align-self-start text-uppercase" style="font-size: 0.65rem;">NEW</span>
            </div>
            ${actions}
        </article>`;
    });
    container.innerHTML = html;
}
