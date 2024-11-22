<?php
session_start();

// Initialize cart if not set
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Get product ID from request
$productId = isset($_POST['product_id']) ? $_POST['product_id'] : null;

if ($productId) {
    // Check if the product is already in the cart
    $found = false;
    foreach ($_SESSION['cart'] as &$item) {
        if ($item['product_id'] == $productId) {
            $item['quantity'] += 1;
            $found = true;
            break;
        }
    }

    // If not found, add as a new item
    if (!$found) {
        $_SESSION['cart'][] = ['product_id' => $productId, 'quantity' => 1];
    }

    // Redirect to cart page
    header('Location: cart.html');
    exit();
}
?>
