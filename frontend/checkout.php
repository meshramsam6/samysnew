<?php
// save_checkout.php
header('Content-Type: application/json');

// Path to the checkout.json file in the root directory
$checkoutFile = __DIR__ . "/checkout.json";

// Retrieve JSON data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    // Check if the file exists and read its current content
    if (file_exists($checkoutFile)) {
        $existingData = json_decode(file_get_contents($checkoutFile), true);
    } else {
        $existingData = [];
    }

    // Check if the email exists in the provided data
    if (isset($data['user']['email']) && filter_var($data['user']['email'], FILTER_VALIDATE_EMAIL)) {
        // Valid email, add the data with email
        $email = $data['user']['email'];
    } else {
        // If no valid email is found, set the email to a default value (optional)
        $email = 'no-email-provided';
    }

    // Add email and data to the array
    $checkoutData = [
        'user' => [
            'email' => $email,
            'name' => $data['user']['name'],
            'phone' => $data['user']['phone'],
            'address' => $data['user']['address'],
            'city' => $data['user']['city'],
            'country' => $data['user']['country']
        ],
        'cartItems' => $data['cartItems'],
        'totalQuantity' => $data['totalQuantity'],
        'totalPrice' => $data['totalPrice']
    ];

    // Add the checkout data to the existing array
    $existingData[] = $checkoutData;

    // Sort the data array by email
    usort($existingData, function($a, $b) {
        return strcmp($a['user']['email'], $b['user']['email']);
    });

    // Save the sorted data back to checkout.json
    if (file_put_contents($checkoutFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Could not save file']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No data received']);
}
?>
