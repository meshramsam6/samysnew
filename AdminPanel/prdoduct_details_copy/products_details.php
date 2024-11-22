<?php
// Define constants for file paths
define("JSON_FILE", "products.json");
define("IMAGE_UPLOAD_DIR", "frontend/images/mynew/");

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode the JSON file
    $jsonData = json_decode(file_get_contents(JSON_FILE), true);
    $products = $jsonData['products'];

    // Get the posted data
    $productId = $_POST['id']; // This is the ID of the product to update
    $name = $_POST['name'];
    $price = $_POST['price'];
    $url2 = $_POST['url2'];
    $category = $_POST['category'];
    $detail = $_POST['detail'];

    // Handle image upload if provided
    if (!empty($_FILES['url']['name'])) {
        $uploadedFile = $_FILES['url'];
        $fileExtension = pathinfo($uploadedFile['name'], PATHINFO_EXTENSION);

        // Validate file type
        if (strtolower($fileExtension) !== 'png') {
            echo json_encode(["error" => "Only .png or .PNG files are allowed."]);
            exit;
        }

        // Create a unique name for the uploaded image
        $newFileName = uniqid() . ".png";
        $destination = IMAGE_UPLOAD_DIR . $newFileName;

        // Move the uploaded file to the target directory
        if (!move_uploaded_file($uploadedFile['tmp_name'], $destination)) {
            echo json_encode(["error" => "Failed to upload the image."]);
            exit;
        }

        // Update the `url` field in the product
        $newImagePath = "/frontend/images/mynew/" . $newFileName;
    } else {
        $newImagePath = null; // No new image uploaded
    }

    // Update the product in the array
    foreach ($products as &$product) {
        if ($product['id'] == $productId) {
            $product['name'] = $name;
            $product['price'] = $price;
            $product['url2'] = $url2;
            $product['category'] = $category;
            $product['detail'] = $detail;

            // Update the image path if a new image was uploaded
            if ($newImagePath) {
                $product['url'] = $newImagePath;
            }
            break;
        }
    }

    // Save the updated array back to the JSON file
    $jsonData['products'] = $products;
    if (file_put_contents(JSON_FILE, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        echo json_encode(["success" => "Product updated successfully."]);
    } else {
        echo json_encode(["error" => "Failed to update the JSON file."]);
    }
}
?>
