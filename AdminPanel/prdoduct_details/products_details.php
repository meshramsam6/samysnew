<?php
// Path to the products.json file
$jsonFilePath = 'products.json';

// Handle POST requests for updating product details
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read incoming data (JSON)
    $rawData = file_get_contents('php://input');
    $updatedData = json_decode($rawData, true);

    // Debugging: Log raw input and parsed data
    file_put_contents('php_debug.log', "Raw Data: $rawData\n", FILE_APPEND);
    file_put_contents('php_debug.log', "Parsed Data: " . print_r($updatedData, true) . "\n", FILE_APPEND);

    // Validate required fields
    $requiredFields = ['id', 'price', 'url', 'url2', 'category', 'detail'];
    foreach ($requiredFields as $field) {
        if (!isset($updatedData[$field])) {
            echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
            exit;
        }
    }

    // Load existing data from products.json
    if (!file_exists($jsonFilePath)) {
        echo json_encode(['status' => 'error', 'message' => 'Products file not found.']);
        exit;
    }

    $productsData = json_decode(file_get_contents($jsonFilePath), true);

    if (!$productsData || !isset($productsData['products'])) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON structure in products file.']);
        exit;
    }

    // Find the product by ID and update its data
    $productFound = false;
    foreach ($productsData['products'] as &$product) {
        if ($product['id'] == $updatedData['id']) {
            // Update allowed fields
            $product['price'] = $updatedData['price'];
            $product['url'] = $updatedData['url'];
            $product['url2'] = $updatedData['url2'];
            $product['category'] = $updatedData['category'];
            $product['detail'] = $updatedData['detail'];
            $productFound = true;
            break;
        }
    }

    if (!$productFound) {
        echo json_encode(['status' => 'error', 'message' => 'Product not found.']);
        exit;
    }

    // Save updated data back to the JSON file
    $result = file_put_contents($jsonFilePath, json_encode($productsData, JSON_PRETTY_PRINT));

    if ($result === false) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save data.']);
    } else {
        echo json_encode(['status' => 'success', 'message' => 'Product updated successfully.']);
    }
    exit;
}

// Handle image upload requests
if (isset($_FILES['image'])) {
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/frontend/images/mynew/";
    $fileName = basename($_FILES['image']['name']);
    $targetFilePath = $targetDir . $fileName;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    // Validate file type (only PNG allowed)
    if (in_array($fileType, ['png', 'PNG'])) {
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            echo json_encode(['status' => 'success', 'url' => "/frontend/images/mynew/" . $fileName]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error uploading the image.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Only .png and .PNG allowed.']);
    }
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
?>
