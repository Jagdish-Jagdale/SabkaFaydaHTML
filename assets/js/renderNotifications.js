function renderNotifications(notificationsData) {
    const container = document.getElementById('notificationsList');
    if (!container) return;

    let html = '';
    notificationsData.forEach(item => {
        const isUnread = item.status === 'unread';
        const statusPillClass = isUnread ? 'unread' : 'read';
        const statusLabel = isUnread ? 'UNREAD' : 'READ';
        const markReadLabel = isUnread ? 'Mark Read' : 'Mark Unread';

        html += `
        <article class="notification-card bg-white border rounded-4 shadow-sm"
            data-category="${item.category}"
            data-status="${item.status}"
            data-date="${item.dateISO}"
            data-timestamp="${item.timestamp}"
            data-id="${item.id}"
            onclick="viewNotification('${item.id}')">
            <div class="d-flex align-items-center gap-3 min-w-0">
                <div class="notification-icon-wrapper ${item.iconStatClass} d-flex align-items-center justify-content-center rounded-circle flex-shrink-0">
                    <i class="fa-solid ${item.iconClass}"></i>
                </div>
                <div class="min-w-0">
                    <h3 class="product-title fw-bold text-dark mb-1">${item.title}</h3>
                    <p class="notification-desc mb-0">${item.desc}</p>
                </div>
            </div>

            <div class="notification-meta-group">
                <div class="notification-meta border-start ps-3">
                    <span class="d-block text-muted fw-bold">Notification Date</span>
                    <strong class="d-block text-dark fw-bold">${item.date}</strong>
                    <small class="d-block text-primary fw-bold">${item.timeAgo}</small>
                </div>

                <div class="notification-state align-self-center justify-self-center">
                    <span class="status-pill ${statusPillClass}">${statusLabel}</span>
                </div>
            </div>

            <div class="notification-actions">
                <button class="btn btn-outline-danger btn-sm" onclick="event.stopPropagation(); deleteNotification(this, '${item.id}')">Delete</button>
            </div>
        </article>`;
    });
    container.innerHTML = html;
}
