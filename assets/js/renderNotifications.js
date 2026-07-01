function renderNotifications(notificationsData) {
    const container = document.getElementById('notificationsList');
    if (!container) return;

    let html = '';
    notificationsData.forEach(item => {
        const isUnread = item.status === 'unread';
        const statusPillClass = isUnread ? 'transit' : 'delivered';
        const statusLabel = isUnread ? 'UNREAD' : 'READ';
        const markReadLabel = isUnread ? 'Mark as Read' : 'Mark as Unread';

        html += `
        <article class="order-card bg-white shadow-sm notification-card"
            style="grid-template-columns: 2fr 1fr 0.65fr 0.9fr; align-items: center;"
            data-category="${item.category}"
            data-status="${item.status}"
            data-date="${item.dateISO}"
            data-timestamp="${item.timestamp}"
            data-id="${item.id}">
            <div class="order-product">
                <div class="notification-icon-wrapper ${item.iconStatClass}" style="flex:0 0 44px; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                    <i class="fa-solid ${item.iconClass}"></i>
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
                        <strong>${item.date}</strong>
                        <small class="text-primary fw-bold mt-1">${item.timeAgo}</small>
                    </div>
                </div>
            </div>
            <div class="order-status-panel">
                <span class="status-pill ${statusPillClass} m-0 px-2 py-1 align-self-start text-uppercase" style="font-size: 0.65rem;">${statusLabel}</span>
            </div>
            <div class="order-actions" style="display:flex; flex-direction:column; gap:8px; align-items:stretch; justify-content:center; padding:18px 16px;">
                <button class="btn btn-primary btn-sm" style="width:100%; font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="viewNotification('${item.id}')">${item.primaryAction}</button>
                <button class="btn btn-outline-primary btn-sm btn-mark-read" style="width:100%; font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="toggleReadStatus(this, '${item.id}', ${isUnread ? 'false' : 'true'})">${markReadLabel}</button>
                <button class="btn btn-outline-danger btn-sm" style="width:100%; font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="deleteNotification(this)">Delete</button>
            </div>
        </article>`;
    });
    container.innerHTML = html;
}
