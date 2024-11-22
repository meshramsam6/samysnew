<?php
// Example PHP code to fetch the checkout data and return it as a JSON response

// You can replace this array with your actual data source, such as a database.
$checkoutData = [
    'samm9421@gmail.com' => [
        [
            'user' => [
                'name' => 'John Doe',
                'phone' => '123-456-7890',
                'address' => '1234 Elm Street',
                'city' => 'Los Angeles',
                'country' => 'USA',
                'email' => 'samm9421@gmail.com',
            ],
            'cartItems' => [
                [
                    'product_id' => 'P001',
                    'product_name' => 'Product 1',
                    'quantity' => 2
                ],
                [
                    'product_id' => 'P002',
                    'product_name' => 'Product 2',
                    'quantity' => 1
                ]
            ],
            'totalQuantity' => 3,
            'totalPrice' => 50.00,
            'timestamp' => '2024-11-15 10:30:00'
        ],
        [
            'user' => [
                'name' => 'Jane Smith',
                'phone' => '987-654-3210',
                'address' => '5678 Oak Avenue',
                'city' => 'San Francisco',
                'country' => 'USA',
                'email' => 'samm9421@gmail.com',
            ],
            'cartItems' => [
                [
                    'product_id' => 'P003',
                    'product_name' => 'Product 3',
                    'quantity' => 1
                ]
            ],
            'totalQuantity' => 1,
            'totalPrice' => 30.00,
            'timestamp' => '2024-11-14 15:20:00'
        ]
    ]
];

// Set the appropriate content type for the JSON response
header('Content-Type: application/json');

// Enable CORS for cross-origin requests (if needed)
header('Access-Control-Allow-Origin: *');

// Check if the email is set in the GET request, if not, return data for all users
if (isset($_GET['email']) && !empty($_GET['email'])) {
    $email = $_GET['email'];
    if (isset($checkoutData[$email])) {
        echo json_encode([$email => $checkoutData[$email]]);
    } else {
        echo json_encode(['error' => 'No checkout data found for the provided email.']);
    }
} else {
    // Return all checkout data if no email is specified in the GET request
    echo json_encode($checkoutData);
}
?>
