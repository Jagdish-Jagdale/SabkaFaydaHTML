function renderWallet(walletData) {
    const container = document.getElementById('walletHistoryContainer');
    if (!container) return;

    let html = '';
    walletData.forEach(item => {
        // Fallback for missing icon or colors based on amountColor
        const bgOpacityClass = item.amountColor === 'text-danger' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-primary bg-opacity-10 text-primary';
        
        html += `
        <article class="wallet-history-card" style="cursor: pointer;" onclick="location.href='order-breakdown.html'">
            <div class="d-flex align-items-center gap-3 border-end pe-4 flex-grow-1 flex-md-grow-0" style="min-width: 240px;">
                <div class="rounded-circle d-flex align-items-center justify-content-center ${bgOpacityClass}" style="width: 44px; height: 44px; font-size: 1.1rem; flex-shrink: 0;">
                    <i class="fa-solid fa-receipt"></i>
                </div>
                <div>
                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">${item.orderId}</h6>
                    <span class="text-muted" style="font-size: 0.72rem; font-weight: 500;">${item.date}, ${item.time}</span>
                </div>
            </div>
            <div class="px-4 text-start" style="min-width: 150px;">
                <span class="text-secondary d-block fw-semibold mb-1" style="font-size: 0.8rem;">${item.title}</span>
                <span class="text-secondary d-block fw-semibold" style="font-size: 0.8rem;">Bonus Points</span>
            </div>
            <div class="px-4 text-start" style="min-width: 150px;">
                <span class="${item.amountColor} d-block fw-bold mb-1" style="font-size: 0.85rem;">
                    <i class="fa-solid ${item.amountIcon} me-2 ${item.amountColor}"></i>₹ ${item.amount.replace('- ', '-')}
                </span>
                <span class="text-warning d-block fw-bold" style="font-size: 0.85rem;">
                    <i class="fa-solid fa-star me-2 text-warning"></i>${item.points}
                </span>
            </div>
            <div class="ps-4 text-end flex-grow-1 flex-md-grow-0">
                <button class="btn btn-link text-primary fw-bold text-decoration-none p-0" style="font-size: 0.85rem;" onclick="viewTxDetails('${item.orderId}', '${item.date}, ${item.time}', '${item.title}', '₹ ${item.amount}', '${item.points}')">View Details</button>
            </div>
        </article>`;
    });
    container.innerHTML = html;
}
