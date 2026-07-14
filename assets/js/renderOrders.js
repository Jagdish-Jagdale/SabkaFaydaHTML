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

let allOrders = [];
let currentFilter = 'all';
let searchQuery = '';
let currentSort = 'latest';
let isInitialized = false;
let currentPage = 1;
const itemsPerPage = 10;

function renderOrders(ordersData) {
    if (!isInitialized) {
        allOrders = ordersData;
        initFilterEvents();
        isInitialized = true;
    }
    
    const container = document.getElementById('ordersContainer');
    if (!container) return;
    
    // 1. Filter orders based on category and search query
    let filtered = allOrders.filter(order => {
        let matchesFilter = true;
        if (currentFilter !== 'all') {
            // Clean up string spaces to compare accurately (e.g. 'intransit' vs 'transit')
            const cleanedFilter = currentFilter.toLowerCase().replace(/\s+/g, '');
            const cleanedStatus = order.status.toLowerCase().replace(/\s+/g, '');
            matchesFilter = cleanedStatus.includes(cleanedFilter) || cleanedFilter.includes(cleanedStatus);
        }
        
        let matchesSearch = true;
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            matchesSearch = order.id.toLowerCase().includes(query) ||
                            order.productName.toLowerCase().includes(query) ||
                            (order.productDesc && order.productDesc.toLowerCase().includes(query));
        }
        
        return matchesFilter && matchesSearch;
    });
    
    // 2. Sort orders based on selection
    filtered.sort((a, b) => {
        if (currentSort === 'latest') {
            return new Date(`${b.orderDate} ${b.orderTime}`) - new Date(`${a.orderDate} ${a.orderTime}`);
        } else if (currentSort === 'oldest') {
            return new Date(`${a.orderDate} ${a.orderTime}`) - new Date(`${b.orderDate} ${b.orderTime}`);
        } else if (currentSort === 'highest') {
            const valA = parseFloat(a.totalAmount.replace(/,/g, ''));
            const valB = parseFloat(b.totalAmount.replace(/,/g, ''));
            return valB - valA;
        } else if (currentSort === 'lowest') {
            const valA = parseFloat(a.totalAmount.replace(/,/g, ''));
            const valB = parseFloat(b.totalAmount.replace(/,/g, ''));
            return valA - valB;
        }
        return 0;
    });
    
    // Render pagination
    renderPagination(filtered);
    
    // Slice for pagination
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedOrders = filtered.slice(startIdx, endIdx);
    
    // 3. Render HTML
    let html = '';
    paginatedOrders.forEach(order => {
        let actionsHtml = order.actions.map(action => {
            if (action.link) {
                const urlObj = new URL(action.link, window.location.origin);
                urlObj.searchParams.set('status', order.status);
                const finalLink = action.link.includes('?') ? action.link + '&status=' + encodeURIComponent(order.status) : action.link + '?status=' + encodeURIComponent(order.status);
                return `<a href="${finalLink}" class="btn ${action.btnClass}">${action.label}</a>`;
            } else {
                return `<button class="btn ${action.btnClass}">${action.label}</button>`;
            }
        }).join('');

        // 💻 Desktop Layout (visible on md screens and up)
        html += `
        <article class="order-card bg-white shadow-sm d-none d-md-grid">
            <div class="order-product">
                <div class="order-product-img">
                    <img src="${order.image}" alt="${order.productName}">
                </div>
                <div>
                    <h3>${order.productName}</h3>
                    <p>${order.productDesc}</p>
                    <span>Qty: ${order.qty}</span>
                    <div class="order-id">Order ID <strong>#${order.id}</strong> <i class="fa-regular fa-copy" style="cursor: pointer;" title="Copy Order ID" onclick="event.stopPropagation(); navigator.clipboard.writeText('${order.id}'); showToast('Order ID copied!');"></i></div>
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
        </article>
        
        <!-- 📱 Mobile Layout (visible on small screens below md) -->
        <article class="mobile-order-card bg-white shadow-sm d-block d-md-none" onclick="window.location.href='order-details.html?id=${order.id}'">
            <!-- Top row: Order ID & Status Pill -->
            <div class="mobile-order-header d-flex justify-content-between align-items-center mb-2">
                <span class="mobile-order-id">Order ID <strong>#${order.id}</strong></span>
                <span class="status-pill ${order.statusClass} py-0.5 px-2 text-uppercase" style="font-size: 0.62rem;">${order.status}</span>
            </div>
            
            <!-- Middle row: Image on left, Name/Price on right -->
            <div class="mobile-order-body d-flex align-items-center gap-3 mb-2">
                <div class="mobile-order-img-wrapper flex-shrink-0">
                    <img src="${order.image}" alt="${order.productName}" class="mobile-order-img">
                </div>
                <div class="mobile-order-info flex-grow-1" style="min-width: 0;">
                    <h4 class="mobile-product-title mb-1">${order.productName}</h4>
                    <p class="mobile-product-desc mb-1">${order.productDesc}</p>
                    <span class="mobile-product-price">&#8377;${order.totalAmount}</span>
                    <span class="mobile-product-qty d-block" style="font-size: 0.68rem; color: #6b7280; margin-top: 2px; font-weight: 500;">Qty: ${order.qty}</span>
                </div>
            </div>
            
            <!-- Bottom row: Order Date and Payment Method details -->
            <div class="mobile-order-meta border-top pt-2 mt-1 d-flex justify-content-between align-items-center">
                <div class="d-flex flex-column gap-1">
                    <div class="mobile-meta-item d-flex align-items-center gap-2">
                        <i class="fa-regular fa-calendar-days text-secondary"></i>
                        <div>
                            <span class="meta-label">Order Date:</span>
                            <span class="meta-value">${order.orderDate} (${order.orderTime})</span>
                        </div>
                    </div>
                    <div class="mobile-meta-item d-flex align-items-center gap-2">
                        <i class="fa-solid fa-credit-card text-success"></i>
                        <div>
                            <span class="meta-label">Payment Method:</span>
                            <span class="meta-value">${order.paymentMethod}</span>
                        </div>
                    </div>
            </div>
        </article>
        `;
    });
    
    html += `
        <div id="no-orders-message" class="text-center py-5" style="display: ${filtered.length === 0 ? 'block' : 'none'}; background: #fff; border-radius: 12px; box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);">
            <i class="fa-solid fa-box-open text-secondary opacity-50 mb-3" style="font-size: 4rem;"></i>
            <h4 class="text-secondary fw-bold">No orders found</h4>
            <p class="text-muted mb-0">You have no orders in this category.</p>
        </div>
    `;
    container.innerHTML = html;
    
    // Update count labels and chip active state
    updateChipCounts();
}

function initFilterEvents() {
    // 1. Search bar event listener
    const searchInput = document.querySelector('.orders-search input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            currentPage = 1;
            renderOrders(allOrders);
        });
    }

    // 2. Dropdown sorting options event listeners
    const dropdownItems = document.querySelectorAll('.orders-dropdown .dropdown-item');
    const sortBtn = document.querySelector('.orders-sort-btn');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const selectedText = this.textContent.trim();
            if (sortBtn) {
                sortBtn.innerHTML = `<span>Sort By:</span> ${selectedText}`;
            }

            if (selectedText.includes('Latest')) {
                currentSort = 'latest';
            } else if (selectedText.includes('Oldest')) {
                currentSort = 'oldest';
            } else if (selectedText.includes('Highest')) {
                currentSort = 'highest';
            } else if (selectedText.includes('Lowest')) {
                currentSort = 'lowest';
            }

            currentPage = 1;
            renderOrders(allOrders);
        });
    });

    // 3. Filter chips click event listeners
    const filterChips = document.querySelectorAll('.orders-filter-chip');
    filterChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const baseText = this.textContent.replace(/\s*\(\d+\)/g, '').trim();
            currentFilter = baseText.toLowerCase().replace(/\s+/g, '');
            currentPage = 1;
            renderOrders(allOrders);
        });
    });
}

function updateChipCounts() {
    const filterChips = document.querySelectorAll('.orders-filter-chip');
    if (filterChips.length === 0) return;

    // Calculate count totals dynamically from allOrders data
    const counts = { all: allOrders.length };
    allOrders.forEach(order => {
        const key = order.status.toLowerCase().replace(/\s+/g, '');
        counts[key] = (counts[key] || 0) + 1;
    });

    filterChips.forEach(chip => {
        const baseText = chip.textContent.replace(/\s*\(\d+\)/g, '').trim();
        const key = baseText.toLowerCase().replace(/\s+/g, '');
        const count = key === 'all' ? counts.all : (counts[key] || 0);
        chip.textContent = `${baseText} (${count})`;
        
        if (key === currentFilter) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
}

// Render pagination controls dynamically based on filtered length
function renderPagination(filteredList) {
    const paginationContainer = document.getElementById('orderPagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.style.setProperty('display', 'none', 'important');
        return;
    } else {
        paginationContainer.style.display = 'flex';
        paginationContainer.style.gap = '8px';
    }

    paginationContainer.innerHTML = '';

    // PREVIOUS Button
    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.className = `text-decoration-none fw-bold me-2 ${currentPage === 1 ? 'text-muted' : ''}`;
    prevLink.style.color = currentPage === 1 ? '#adb5bd' : '#4b70f5';
    prevLink.style.fontSize = '0.9rem';
    prevLink.style.display = 'flex';
    prevLink.style.alignItems = 'center';
    prevLink.innerHTML = '&laquo; PREVIOUS';
    if (currentPage > 1) {
        prevLink.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage--;
            renderOrders(allOrders);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        prevLink.style.pointerEvents = 'none';
    }
    paginationContainer.appendChild(prevLink);

    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(totalPages, startPage + 9);

    if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9);
    }

    // Page Numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = 'd-flex align-items-center justify-content-center text-decoration-none rounded-circle fw-bold';
        pageLink.style.width = '36px';
        pageLink.style.height = '36px';
        pageLink.style.fontSize = '0.95rem';
        pageLink.style.flexShrink = '0';
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.style.backgroundColor = '#4b70f5';
            pageLink.style.color = '#fff';
        } else {
            pageLink.style.backgroundColor = 'transparent';
            pageLink.style.color = '#1a1a1a';
        }

        pageLink.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderOrders(allOrders);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        paginationContainer.appendChild(pageLink);
    }

    // NEXT Button
    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.className = `text-decoration-none fw-bold ms-2 ${currentPage === totalPages ? 'text-muted' : ''}`;
    nextLink.style.color = currentPage === totalPages ? '#adb5bd' : '#4b70f5';
    nextLink.style.fontSize = '0.9rem';
    nextLink.style.display = 'flex';
    nextLink.style.alignItems = 'center';
    nextLink.innerHTML = 'NEXT &raquo;';
    if (currentPage < totalPages) {
        nextLink.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage++;
            renderOrders(allOrders);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        nextLink.style.pointerEvents = 'none';
    }
    paginationContainer.appendChild(nextLink);
}
