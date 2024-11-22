<?php

// Set the path to your customer.json file
$file = 'customer.json';

// Check if the EmailAdmin is provided in the POST request
if (isset($_POST['EmailAdmin'])) {
    $EmailAdmin = $_POST['EmailAdmin'];

    // Check if the customer.json file exists, if not create an empty array
    if (file_exists($file)) {
        // Read the existing contents of the file
        $data = json_decode(file_get_contents($file), true);
    } else {
        $data = [];
    }

    // Append the new customer EmailAdmin to the array
    $data[] = $EmailAdmin;

    // Save the updated data back to the JSON file
    if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
        // Send a success response back to the frontend
        echo json_encode(['status' => 'success']);
    } else {
        // Send an error response if something goes wrong
        echo json_encode(['status' => 'error', 'message' => 'Failed to save data']);
    }
} else {
    // Send an error response if no EmailAdmin is provided
    echo json_encode(['status' => 'error', 'message' => 'No EmailAdmin provided']);
}

?>
