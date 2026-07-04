/* Order Breakdown Rendering Logic */
document.addEventListener('DOMContentLoaded', function() {
    renderBreakdownItems(logsData);
    updateChipCounts();
});

// Render breakdown items to the list
function renderBreakdownItems(data) {
    const container = document.getElementById('breakdownLogsList');
    if (!container) return;

    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-4" style="font-size: 0.9rem;">No records found</div>';
        return;
    }

    data.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'card p-3 shadow-sm border';
        itemCard.style.borderRadius = '8px !important;';
        itemCard.style.borderLeft = `4px solid ${item.color}`;
        
        itemCard.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-circle d-flex align-items-center justify-content-center text-white" 
                         style="width: 40px; height: 40px; background-color: ${item.color}; font-size: 0.85rem; font-weight: 600;">
                        ${item.day}
                    </div>
                    <div>
                        <div class="fw-bold text-dark" style="font-size: 0.9rem; font-family: 'Montserrat', sans-serif;">${item.desc}</div>
                        <div class="text-muted" style="font-size: 0.75rem;">${item.date}</div>
                    </div>
                </div>
                <div class="text-end">
                    <div class="fw-bold" style="font-size: 0.95rem; color: ${item.color};">${item.val}</div>
                    <div class="text-muted" style="font-size: 0.7rem; text-transform: capitalize;">${item.type} Released</div>
                </div>
            </div>
        `;
        
        container.appendChild(itemCard);
    });
}

// Filter breakdown items by type
function filterLogs(type, button) {
    // Update active chip
    document.querySelectorAll('[id^="chip-"]').forEach(chip => {
        chip.classList.remove('active-chip', 'btn-outline-primary');
        chip.classList.add('btn-outline-secondary');
    });
    button.classList.remove('btn-outline-secondary');
    button.classList.add('active-chip', 'btn-outline-primary');

    // Filter data
    let filteredData = logsData;
    if (type !== 'all') {
        filteredData = logsData.filter(item => item.type === type);
    }

    renderBreakdownItems(filteredData);
}

// Update chip counts
function updateChipCounts() {
    const allCount = logsData.length;
    const dailyCount = logsData.filter(item => item.type === 'daily').length;
    const weeklyCount = logsData.filter(item => item.type === 'weekly').length;
    const monthlyCount = logsData.filter(item => item.type === 'monthly').length;

    document.getElementById('chip-all').textContent = `All (${allCount})`;
    document.getElementById('chip-daily').textContent = `Daily (${dailyCount})`;
    document.getElementById('chip-weekly').textContent = `Weekly (${weeklyCount})`;
    document.getElementById('chip-monthly').textContent = `Monthly (${monthlyCount})`;
}

// Search functionality
document.getElementById('logSearch')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = logsData.filter(item => 
        item.desc.toLowerCase().includes(searchTerm) || 
        item.date.toLowerCase().includes(searchTerm) ||
        item.val.toLowerCase().includes(searchTerm)
    );
    renderBreakdownItems(filteredData);
});

// Sort functionality
document.getElementById('logSort')?.addEventListener('change', function(e) {
    const sortValue = e.target.value;
    let sortedData = [...logsData];
    
    if (sortValue === 'latest') {
        sortedData.sort((a, b) => b.id - a.id);
    } else if (sortValue === 'oldest') {
        sortedData.sort((a, b) => a.id - b.id);
    }
    
    renderBreakdownItems(sortedData);
});

// Download statement function
function downloadStatement() {
    const toast = document.getElementById('action-toast');
    const toastBody = document.getElementById('toast-body-content');
    toastBody.innerHTML = '<i class="fa-solid fa-download me-2"></i>Bonus statement downloaded successfully!';
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}
