<?php

// File path for checkout data
$jsonFilePath = 'checkout.json';

// Get the incoming raw POST data (checkout data)
$data = json_decode(file_get_contents('php://input'), true);

// Check if the incoming data is valid
if ($data) {
    // Read existing checkout data
    $existingData = file_exists($jsonFilePath) ? json_decode(file_get_contents($jsonFilePath), true) : [];

    // Get the user email from the incoming data (if available)
    $email = isset($data['user']['email']) ? $data['user']['email'] : 'no-email-provided';

    // Generate a timestamp for the current checkout
    $timestamp = date('Y-m-d H:i:s');

    // Check if the email already exists in the existing data
    $emailExists = isset($existingData[$email]);

    // Prepare the new checkout entry with a timestamp
    $newCheckoutEntry = [
        'user' => $data['user'],
        'cartItems' => $data['cartItems'],
        'totalQuantity' => $data['totalQuantity'],
        'totalPrice' => $data['totalPrice'],
        'timestamp' => $timestamp
    ];

    // If email exists, add the new checkout entry to the existing user's data
    if ($emailExists) {
        $existingData[$email][] = $newCheckoutEntry;
    } else {
        // If email doesn't exist, create a new entry for this email
        $existingData[$email] = [$newCheckoutEntry];
    }

    // Save the updated data back to the JSON file
    $result = file_put_contents($jsonFilePath, json_encode($existingData, JSON_PRETTY_PRINT));

    // Check if the data was successfully written
    if ($result !== false) {
        echo json_encode(['success' => true, 'message' => 'Checkout data saved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save checkout data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid data received']);
}

?>