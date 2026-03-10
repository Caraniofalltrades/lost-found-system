<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - UOE Lost & Found</title>
    <?php include 'includes/header.php'; ?>
</head>
<body>

    <!-- Main Container -->
    <div class="container main-content">
        
        <!-- Hero Section -->
        <section class="text-center py-5">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-8">
                    <!-- School Logo -->
                    <div class="mb-4">
                        <img src="https://placehold.co/150x150/0056b3/ffffff?text=UOE" 
                             alt="University Logo" 
                             class="img-fluid rounded-circle shadow-lg" style="width: 120px; height: 120px;">
                    </div>

                    <h1 class="display-4 fw-bold mb-3">University of Embu</h1>
                    <h2 class="h4 fw-light text-muted mb-4">Smart Lost & Found Management</h2>
                    
                    <p class="lead mb-5 px-md-5">
                        Lost something? Don't worry. Our community is here to help you reunite with your belongings.
                    </p>

                    <div class="d-flex justify-content-center gap-3">
                        <a href="auth/login.php" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">Login</a>
                        <a href="auth/register.php" class="btn btn-outline-primary btn-lg px-5 rounded-pill">Register</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Highlighted Lost Items Section -->
        <section class="py-4 mb-5 bg-white rounded-3 shadow-sm p-4">
            <div class="d-flex justify-content-between align-items-end mb-4 border-bottom pb-2">
                <div>
                    <h3 class="section-title m-0">Urgent: Items Recently Lost</h3>
                    <p class="text-muted small">Help your peers find their belongings</p>
                </div>
                <a href="auth/login.php" class="btn btn-sm btn-outline-primary">View All</a>
            </div>
            
            <div class="row g-4" id="home-lost-items">
                <!-- JS will inject Lost Items here specifically -->
            </div>
        </section>

        <!-- Found Items Section -->
        <section class="py-4 mb-5">
            <div class="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h3 class="section-title m-0">Recently Found Items</h3>
                    <p class="text-muted small">Check if we found what you are looking for</p>
                </div>
            </div>
            
            <div class="row g-4" id="home-found-items">
                <!-- JS will inject Found Items here specifically -->
            </div>
        </section>

    </div>

    <?php include 'includes/footer.php'; ?>
</body>
</html>