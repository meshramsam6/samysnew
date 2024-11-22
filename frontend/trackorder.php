<?php
session_start();

// Assuming you receive POST data from a form
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Customer details from the form
    $_SESSION['customer'] = [
        'name' => $_POST['name'],
        'phone' => $_POST['phone'],
        'address' => $_POST['address'],
        'city' => $_POST['city'],
        'country' => $_POST['country'],
    ];

    // Cart data (this should ideally be populated from your cart logic)
    $_SESSION['cart'] = [
        [
            'title' => 'Product 1',
            'quantity' => 2,
            'price' => 100,
        ],
        [
            'title' => 'Product 2',
            'quantity' => 1,
            'price' => 200,
        ],
        // Add more products as needed
    ];

    // Redirect to the invoice generation page
    header('Location: invoice.php');
    exit;
}
?>
