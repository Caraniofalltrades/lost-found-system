<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report Lost - UOE</title>
    <?php include '../includes/header.php'; ?>
</head>
<body>
    <div class="container main-content mt-4">
        <div id="alert-container"></div>
        <a href="dashboard.php" class="btn btn-outline-secondary mb-3 rounded-pill"><i class="fas fa-arrow-left"></i> Back</a>
        <div class="card shadow-sm border-0 rounded-4">
            <div class="card-header bg-danger text-white rounded-top-4 py-3">
                <h4 class="m-0"><i class="fas fa-exclamation-triangle me-2"></i>Report Lost Item</h4>
            </div>
            <div class="card-body p-4">
                <form onsubmit="handleReportItem(event, 'Lost')">
                    <div class="row">
                        <div class="col-md-6 mb-3"><label>Title</label><input type="text" name="title" class="form-control" required></div>
                        <div class="col-md-6 mb-3">
                            <label>Category</label>
                            <select name="category" class="form-select" required>
                                <option value="Electronics">Electronics</option>
                                <option value="Documents">Documents</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3"><label>Location</label><input type="text" name="location" class="form-control" required></div>
                        <div class="col-md-6 mb-3"><label>Date</label><input type="date" name="date" class="form-control" required></div>
                    </div>
                    <div class="mb-3"><label>Description</label><textarea name="description" class="form-control" rows="3"></textarea></div>
                    <button type="submit" class="btn btn-danger rounded-pill px-4">Submit Report</button>
                </form>
            </div>
        </div>
    </div>
    <?php include '../includes/footer.php'; ?>
</body>
</html>