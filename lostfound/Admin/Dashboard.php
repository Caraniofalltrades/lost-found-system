<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard - UOE</title>
    <?php include '../includes/header.php'; ?>
</head>
<body>
    <div class="container main-content mt-4">
        <div id="alert-container"></div>
        <h2 class="fw-bold">Admin Dashboard</h2>
        <div class="card mt-4 border-0 shadow-sm rounded-4">
            <div class="card-header bg-white py-3">
                <h5 class="m-0">Manage All Items</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead class="table-light"><tr><th>Img</th><th>Title</th><th>Type</th><th>Location</th><th>Action</th></tr></thead>
                        <tbody id="admin-items-table"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php include '../includes/footer.php'; ?>
</body>
</html>