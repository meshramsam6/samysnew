<?php
// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Path to the reviews file
$reviewsFile = 'review.json';

// Check if the reviews file exists and get the current data
if (file_exists($reviewsFile)) {
    $reviews = json_decode(file_get_contents($reviewsFile), true);
} else {
    $reviews = [];
}

// Add the new review to the reviews array
$reviews[] = [
    'name' => $data['name'],
    'email' => $data['email'],
    'review' => $data['review'],
    'rating' => $data['rating'],
    'productId' => $data['productId'],
    'productName' => $data['productName'], // Store product name as well
    'date' => $data['date']
];

// Save the updated reviews back to the JSON file
if (file_put_contents($reviewsFile, json_encode($reviews, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save the review.']);
}
?>
