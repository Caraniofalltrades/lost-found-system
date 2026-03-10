<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Dashboard - UOE</title>
    <?php include '../includes/header.php'; ?>
</head>
<body>
    <div class="container main-content mt-4">
        <div id="alert-container"></div>
        
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 class="fw-bold">My Dashboard</h2>
                <p class="text-muted">Overview of all reported items</p>
            </div>
            <div>
                <a href="report_lost.php" class="btn btn-danger rounded-pill px-4"><i class="fas fa-exclamation-circle me-2"></i>Report Lost</a>
                <a href="report_found.php" class="btn btn-success rounded-pill px-4"><i class="fas fa-check-circle me-2"></i>Report Found</a>
            </div>
        </div>

        <div class="row g-4" id="user-items-list">
            <!-- Items injected via JS -->
        </div>
    </div>
    <?php include '../includes/footer.php'; ?>
</body>
</html>