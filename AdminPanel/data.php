<?php
// Load the JSON data from a file
$jsonFile = 'checkout.json'; // Update with the correct file path if needed
$jsonData = file_get_contents($jsonFile);

// Decode JSON data into an associative array
$data = json_decode($jsonData, true);

// Check if the data was successfully decoded
if ($data === null) {
    echo "Error: Unable to decode JSON data.";
    exit;
}

// Process the data
foreach ($data as $email => $orders) {
    echo "User Email: $email<br>";
    
    foreach ($orders as $orderIndex => $order) {
        echo "<h3>Order #" . ($orderIndex + 1) . "</h3>";
        echo "Name: " . $order['user']['name'] . "<br>";
        echo "Phone: " . $order['user']['phone'] . "<br>";
        echo "Address: " . $order['user']['address'] . "<br>";
        echo "City: " . $order['user']['city'] . "<br>";
        echo "Country: " . $order['user']['country'] . "<br>";
        echo "Total Quantity: " . $order['totalQuantity'] . "<br>";
        echo "Total Price: " . $order['totalPrice'] . "<br>";
        
        if (isset($order['timestamp'])) {
            echo "Timestamp: " . $order['timestamp'] . "<br>";
        }
        
        echo "<h4>Cart Items:</h4>";
        echo "<ul>";
        foreach ($order['cartItems'] as $item) {
            echo "<li>";
            echo "Product ID: " . $item['product_id'] . "<br>";
            echo "Product Name: " . ($item['product_name'] ?? 'N/A') . "<br>";
            echo "Quantity: " . $item['quantity'] . "<br>";
            echo "</li>";
        }
        echo "</ul>";
        echo "<hr>";
    }
}
?>
