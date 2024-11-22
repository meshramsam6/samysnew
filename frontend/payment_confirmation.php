<?php
header('Content-Type: application/json');

// Get JSON input from the request
$data = json_decode(file_get_contents("php://input"), true);

// Simulating a payment confirmation logic (replace with actual logic)
$paymentSuccessful = !empty($data['amount']) && !empty($data['upiId']); // Placeholder condition

if ($paymentSuccessful) {
    // Process successful payment
    echo json_encode(["message" => "Payment successful"]);
} else {
    // Handle payment failure
    http_response_code(400);
    echo json_encode(["message" => "Payment failed"]);
}
?>
