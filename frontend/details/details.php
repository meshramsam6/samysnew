<?php
header('Content-Type: application/json');

// Load products.json and return its contents
$file = 'path/to/products.json'; // Update with the actual path
if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    echo json_encode(['error' => 'File not found']);
}
?>
