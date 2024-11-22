<?php

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Check if files are uploaded correctly
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Get the uploaded file
        $imageFile = $_FILES['image'];

        // Generate unique ID for the new product
        $jsonData = file_get_contents('products.json');
        $products = json_decode($jsonData, true);

        // Check if products.json is not empty and calculate new ID
        $lastId = (count($products['products']) > 0) ? $products['products'][count($products['products']) - 1]['id'] : 0;
        $newId = $lastId + 1;

        // Get product data from POST
        $productData = json_decode($_POST['productData'], true);

        // Handle image upload
        $imageDir = 'frontend/images/mynew/';
        $imagePath = $imageDir . basename($imageFile['name']);

        // Check if file is moved to the target directory
        if (move_uploaded_file($imageFile['tmp_name'], $imagePath)) {
            // Update product data with the new image URL
            $productData['id'] = $newId;
            $productData['url'] = '/frontend/images/mynew/' . basename($imageFile['name']);

            // Add new product to the products array
            $products['products'][] = $productData;

            // Save updated data back to products.json
            if (file_put_contents('products.json', json_encode($products, JSON_PRETTY_PRINT))) {
                echo json_encode(['status' => 'success', 'product' => $productData]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update products.json']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload image']);
        }

    } else {
        echo json_encode(['status' => 'error', 'message' => 'No image uploaded or file upload error']);
    }

} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
