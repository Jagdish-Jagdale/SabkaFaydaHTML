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
        <article class="notification-card bg-white shadow-sm mb-3 rounded-4 border overflow-hidden"
            data-category="${item.category}"
            data-status="${item.status}"
            data-date="${item.dateISO}"
            data-timestamp="${item.timestamp}"
            data-id="${item.id}">
            <div class="d-flex align-items-stretch" style="min-height: 100px;">

                <!-- Col 1: Icon + Title + Desc -->
                <div class="d-flex align-items-center gap-3 flex-grow-1 p-3" style="min-width: 0;">
                    <div class="notification-icon-wrapper ${item.iconStatClass}" style="flex:0 0 44px; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
                        <i class="fa-solid ${item.iconClass}"></i>
                    </div>
                    <div style="min-width:0;">
                        <h3 class="product-title mb-1" style="font-size:0.88rem; font-weight:800; line-height:1.35; color:#1f2937;">${item.title}</h3>
                        <p class="text-muted mb-0" style="font-size:0.78rem; line-height:1.4;">${item.desc}</p>
                    </div>
                </div>

                <!-- Col 2: Date -->
                <div class="d-flex align-items-center gap-2 px-3 py-2 border-start" style="min-width:190px; flex:0 0 190px;">
                    <i class="fa-regular fa-calendar-days" style="font-size:1.1rem; color:#0087F6; background:#eff6ff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;"></i>
                    <div>
                        <span style="color:#6b7280; font-size:0.68rem; font-weight:700; display:block;">Notification Date</span>
                        <strong style="color:#1f2937; font-size:0.8rem; font-weight:800; line-height:1.35; display:block;">${item.date}</strong>
                        <small class="text-primary fw-bold" style="font-size:0.7rem; display:block;">${item.timeAgo}</small>
                    </div>
                </div>

                <!-- Col 3: Status Badge -->
                <div class="d-flex align-items-center justify-content-center px-3 border-start" style="min-width:110px; flex:0 0 110px;">
                    <span class="status-pill ${statusPillClass}" style="font-size:0.65rem; margin:0; padding:6px 12px;">${statusLabel}</span>
                </div>

                <!-- Col 4: Action Buttons -->
                <div class="d-flex flex-column align-items-stretch justify-content-center gap-2 p-3 border-start" style="min-width:150px; flex:0 0 150px;">
                    <button class="btn btn-primary btn-sm" style="font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="viewNotification('${item.id}')">${item.primaryAction}</button>
                    <button class="btn btn-outline-primary btn-sm btn-mark-read" style="font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="toggleReadStatus(this, '${item.id}', ${isUnread ? 'false' : 'true'})">${markReadLabel}</button>
                    <button class="btn btn-outline-danger btn-sm" style="font-size:0.72rem; font-weight:700; white-space:nowrap;" onclick="deleteNotification(this)">Delete</button>
                </div>

            </div>
        </article>`;
    });
    container.innerHTML = html;
}
