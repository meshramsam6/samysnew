<?php
$file_path = 'customer.json';

// Check if the customer.json file exists
if (file_exists($file_path)) {
    $json_data = file_get_contents($file_path);
    echo $json_data;
} else {
    echo json_encode([]);
}
?>
