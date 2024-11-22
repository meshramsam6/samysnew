<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonFile = 'products.json';
    $imageFolder = 'frontend/images/';
    $response = ['success' => false];

    // Validate inputs
    if (isset($_POST['productName'], $_POST['productPrice'], $_FILES['productImage'])) {
        $name = trim($_POST['productName']);
        $price = number_format((float)$_POST['productPrice'], 2, '.', '');
        $category = trim($_POST['category']);
        $titlea = str_replace(' ', '_', $name);
        $imageName = basename($_FILES['productImage']['name']);
        $imagePath = $imageFolder . $imageName;

        // Upload image and update JSON
        if (move_uploaded_file($_FILES['productImage']['tmp_name'], $imagePath)) {
            $productsData = json_decode(file_get_contents($jsonFile), true);
            $existingIds = array_column($productsData['products'], 'id');
            $newId = max($existingIds) + 1;

            $newProduct = [
                'id' => $newId,
                'title' => $titlea,
                'titlea' => $titlea,
                'name' => $name,
                'price' => $price,
                'url' => '/' . $imagePath,
                'url2' => '',
                'category' => $category,
            ];

            $productsData['products'][] = $newProduct;
            file_put_contents($jsonFile, json_encode($productsData, JSON_PRETTY_PRINT));

            $response['success'] = true;
        } else {
            $response['message'] = 'Failed to upload image.';
        }
    } else {
        $response['message'] = 'Invalid input data.';
    }

    echo json_encode($response);
}
?>
