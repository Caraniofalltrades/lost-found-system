// --- 1. MOCK DATABASE ---
const initialUsers = [
    { id: 1, name: "Admin User", email: "admin@embu.ac.ke", pass: "admin123", role: "admin", created_at: new Date().toISOString() },
    { id: 2, name: "John Student", email: "student@embu.ac.ke", pass: "user123", role: "user", created_at: new Date().toISOString() }
];

const initialItems = [
    { id: 101, title: "Student ID Card", category: "Documents", location: "Library", date: "2023-10-01", type: "Lost", status: "Pending", description: "UOE Student ID, Reg no. CSC-023-0234", reporter_id: 2, image: "" },
    { id: 102, title: "Blue Backpack", category: "Accessories", location: "Lecture Hall 3", date: "2023-10-02", type: "Found", status: "Available", description: "Blue Nike backpack with books inside.", reporter_id: 1, image: "" }
];

let users = JSON.parse(localStorage.getItem('ue_users')) || initialUsers;
let items = JSON.parse(localStorage.getItem('ue_items')) || initialItems;
let claims = JSON.parse(localStorage.getItem('ue_claims')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('ue_currentUser')) || null;

// --- 2. CORE FUNCTIONS ---
function saveData() {
    localStorage.setItem('ue_users', JSON.stringify(users));
    localStorage.setItem('ue_items', JSON.stringify(items));
    localStorage.setItem('ue_claims', JSON.stringify(claims));
    sessionStorage.setItem('ue_currentUser', JSON.stringify(currentUser));
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `${message} <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    const container = document.getElementById('alert-container');
    if(container) container.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
}

// --- 3. AUTH LOGIC ---
function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;

    const user = users.find(u => u.email === email && u.pass === pass);
    if (user) {
        currentUser = user;
        saveData();
        showAlert("Login Successful!", "success");
        if (user.role === 'admin') window.location.href = '../admin/dashboard.php';
        else window.location.href = '../user/dashboard.php';
    } else {
        showAlert("Invalid credentials.", "danger");
    }
}

function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    if (users.find(u => u.email === form.email.value)) {
        showAlert("Email already exists.", "warning");
        return;
    }
    const newUser = {
        id: Date.now(),
        name: form.fullname.value,
        email: form.email.value,
        pass: form.password.value,
        role: 'user',
        created_at: new Date().toISOString()
    };
    users.push(newUser);
    saveData();
    showAlert("Registration Successful! Please Login.", "success");
    window.location.href = 'login.php';
}

function logout() {
    currentUser = null;
    saveData();
    window.location.href = '../index.php';
}

// --- 4. ITEM LOGIC ---
function handleReportItem(e, type) {
    e.preventDefault();
    const form = e.target;
    const seed = Math.floor(Math.random() * 1000);
    
    const newItem = {
        id: Date.now(),
        title: form.title.value,
        category: form.category.value,
        location: form.location.value,
        date: form.date.value,
        type: type,
        status: type === 'Lost' ? 'Pending' : 'Available',
        description: form.description.value,
        reporter_id: currentUser.id,
        image: `https://picsum.photos/seed/${seed}/300/200`
    };

    items.push(newItem);
    saveData();
    showAlert(`Item reported as ${type}!`, "success");
    window.location.href = 'dashboard.php';
}

function findMatches(foundItem) {
    return items.filter(i => 
        i.type === 'Lost' && 
        i.category === foundItem.category && 
        i.location.toLowerCase() === foundItem.location.toLowerCase() &&
        i.status !== 'Claimed'
    );
}

// --- 5. RENDER LOGIC (UPDATED) ---
function updateNavbar() {
    const nav = document.getElementById('nav-links');
    if (!nav) return;
    nav.innerHTML = '';
    if (currentUser) {
        nav.innerHTML += `<li class="nav-item me-3 nav-link text-white">Hello, <b>${currentUser.name}</b></li>`;
        if (currentUser.role === 'admin') {
             nav.innerHTML += `<li class="nav-item"><a class="nav-link" href="../admin/dashboard.php">Dashboard</a></li>`;
        } else {
             nav.innerHTML += `<li class="nav-item"><a class="nav-link" href="../user/dashboard.php">Dashboard</a></li>
                              <li class="nav-item"><a class="nav-link" href="../user/report_lost.php" style="color: #ff6b6b !important;">Report Lost</a></li>
                              <li class="nav-item"><a class="nav-link" href="../user/report_found.php" style="color: #1dd1a1 !important;">Report Found</a></li>`;
        }
        nav.innerHTML += `<li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>`;
    } else {
        nav.innerHTML += `<li class="nav-item"><a class="nav-link" href="../index.php">Home</a></li>
                          <li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>
                          <li class="nav-item"><a class="nav-link" href="register.php">Register</a></li>`;
    }
}

// Helper to generate HTML for a single card
function createCardHTML(item) {
    const isLost = item.type === 'Lost';
    const badgeClass = isLost ? 'status-lost' : 'status-found';
    const badgeText = isLost ? 'Lost' : 'Found';
    const icon = isLost ? '<i class="fas fa-exclamation-circle me-1"></i>' : '<i class="fas fa-check-circle me-1"></i>';
    
    // Button Logic
    let btnHtml = '';
    if (!isLost && item.status === 'Available') {
        btnHtml = `<button class="btn btn-primary btn-claim w-100" onclick="openClaimModal(${item.id})">Claim This Item</button>`;
    } else if (isLost) {
        btnHtml = `<div class="text-center mt-3 text-muted small"><i class="fas fa-search"></i> Help find this</div>`;
    } else {
        btnHtml = `<div class="text-center mt-3 text-success small"><i class="fas fa-check"></i> Resolved</div>`;
    }

    return `
        <div class="col-md-4 col-sm-6">
            <div class="item-card">
                <div class="card-img-wrapper">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <span class="status-badge ${badgeClass}">${icon} ${badgeText}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="card-meta"><i class="fas fa-map-marker-alt text-danger"></i> ${item.location}</div>
                    <div class="card-meta"><i class="fas fa-calendar-alt text-primary"></i> ${item.date}</div>
                    <p class="card-text mt-2">${item.description}</p>
                    ${btnHtml}
                </div>
            </div>
        </div>
    `;
}

// Home Page Renderers (Separated)
function renderHomeItems() {
    const lostContainer = document.getElementById('home-lost-items');
    const foundContainer = document.getElementById('home-found-items');

    if (!lostContainer && !foundContainer) return;

    const lostItems = items.filter(i => i.type === 'Lost').slice(-3).reverse();
    const foundItems = items.filter(i => i.type === 'Found' && i.status === 'Available').slice(-3).reverse();

    if (lostContainer) {
        if(lostItems.length === 0) {
            lostContainer.innerHTML = '<div class="col-12 text-center text-muted py-4">No items reported lost recently. Great news!</div>';
        } else {
            lostContainer.innerHTML = lostItems.map(createCardHTML).join('');
        }
    }

    if (foundContainer) {
        if(foundItems.length === 0) {
            foundContainer.innerHTML = '<div class="col-12 text-center text-muted py-4">No found items available at the moment.</div>';
        } else {
            foundContainer.innerHTML = foundItems.map(createCardHTML).join('');
        }
    }
}

function renderUserDashboard() {
    const list = document.getElementById('user-items-list');
    if (!list) return;
    if(items.length === 0) {
        list.innerHTML = '<div class="col-12 text-center py-5"><i class="fas fa-box-open fa-3x text-muted mb-3"></i><p>No items found.</p></div>';
    } else {
        list.innerHTML = items.map(createCardHTML).join('');
    }
}

function openClaimModal(id) {
    if(confirm("Are you sure you want to claim this item?")) {
        claims.push({ id: Date.now(), item_id: id, claimant_id: currentUser.id, status: 'Pending', created_at: new Date().toISOString() });
        saveData();
        showAlert("Claim Request Sent!", "success");
        if(document.getElementById('home-found-items')) renderHomeItems();
        else renderUserDashboard();
    }
}

// Admin Render
function renderAdminDashboard() {
    const tbody = document.getElementById('admin-items-table');
    if(!tbody) return;
    tbody.innerHTML = items.map(item => `
        <tr>
            <td><img src="${item.image}" width="50" class="rounded"></td>
            <td><strong>${item.title}</strong></td>
            <td><span class="badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}">${item.type}</span></td>
            <td>${item.location}</td>
            <td><button class="btn btn-sm btn-danger rounded-pill" onclick="deleteItem(${item.id})"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function deleteItem(id) {
    if(confirm("Delete this item?")) {
        items = items.filter(i => i.id !== id);
        saveData();
        renderAdminDashboard();
    }
}

// --- INIT ---
window.onload = function() {
    updateNavbar();
    const path = window.location.pathname;
    if (path.includes('index.php') || path.endsWith('/')) renderHomeItems();
    if (path.includes('user/dashboard.php')) {
        if(!currentUser || currentUser.role !== 'user') window.location.href = '../auth/login.php';
        else renderUserDashboard();
    }
    if (path.includes('admin/dashboard.php')) {
        if(!currentUser || currentUser.role !== 'admin') window.location.href = '../auth/login.php';
        else renderAdminDashboard();
    }
};