<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login - UOE</title>
    <?php include '../includes/header.php'; ?>
</head>
<body>
    <div class="container main-content mt-5">
        <div id="alert-container"></div>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body p-5">
                        <h3 class="text-center mb-4 fw-bold">Welcome Back</h3>
                        <form onsubmit="handleLogin(event)">
                            <div class="mb-3">
                                <label>Email Address</label>
                                <input type="email" name="email" class="form-control" required placeholder="user@embu.ac.ke">
                            </div>
                            <div class="mb-3">
                                <label>Password</label>
                                <input type="password" name="password" class="form-control" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 rounded-pill">Sign In</button>
                            <p class="mt-3 text-center">
                                No account? <a href="register.php">Register here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include '../includes/footer.php'; ?>
</body>
</html>