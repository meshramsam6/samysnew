<?php
header('Content-Type: application/json');

$file = '/';  // Path to your JSON file

if (file_exists($file)) {
    // Read the file content
    $jsonData = file_get_contents($file);
    
    // Output the JSON data
    echo $jsonData;
} else {
    // Return empty array if the file doesn't exist
    echo json_encode([]);
}
?>