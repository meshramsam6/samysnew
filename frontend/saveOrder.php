<?php
// Set the header to allow JSON response
header('Content-Type: application/json');

// Get the raw POST data
$data = file_get_contents("php://input");

// Decode the JSON data to PHP array
$orderData = json_decode($data, true);

// Check if the data is valid
if (isset($orderData['email']) && isset($orderData['order'])) {
    $email = $orderData['email'];
    $order = $orderData['order'];

    // Define the file path where you want to store the orders (this could be inside a folder called 'orders')
    $filePath = 'orders_data.json';

    // If the file exists, read the existing data; otherwise, create an empty array
    if (file_exists($filePath)) {
        $existingData = json_decode(file_get_contents($filePath), true);
    } else {
        $existingData = [];
    }

    // If the user's email already exists in the data, append the order to their array
    if (isset($existingData[$email])) {
        $existingData[$email][] = $order;
    } else {
        // Otherwise, create a new entry for the user with their order
        $existingData[$email] = [$order];
    }

    // Save the updated data back to the file
    if (file_put_contents($filePath, json_encode($existingData, JSON_PRETTY_PRINT))) {
        // Return success response
        echo json_encode(['success' => true]);
    } else {
        // Return error response
        echo json_encode(['success' => false, 'message' => 'Failed to save data']);
    }
} else {
    // Return error response if required fields are missing
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
}
?>
