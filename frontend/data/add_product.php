<?php
header('Content-Type: application/json');

// Check if form data is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Read existing products from the products.json file
    $productsFile = 'products.json';
    $productsData = json_decode(file_get_contents($productsFile), true);
    
    // Get the form data
    $name = $_POST['name'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $url2 = $_POST['url2'];
    $newCategory = $_POST['newCategory'];
    $detail = $_POST['detail'];  // New field for product detail

    // If a new category is provided, use that; otherwise, use the selected category
    if (!empty($newCategory)) {
        $category = $newCategory;
    }

    // Generate a new ID by checking the existing IDs in the products file
    $newId = max(array_column($productsData['products'], 'id')) + 1;
    
    // Save the uploaded image to the server
    $targetDir = "D:/Start Project Website with Login and Registration/frontend/images/mynew/";
    $imageFile = $targetDir . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], $imageFile);

    // Capitalize the title to match the desired format (convert spaces to underscores and capitalize each word)
    $formattedTitle = ucwords(str_replace(" ", "_", $name));

    // Prepare the new product data with proper formatting
    $newProduct = [
        "id" => $newId,
        "title" => ucwords(str_replace("_", "_", $formattedTitle)), // Capitalize title with underscores
        "titlea" => $formattedTitle, // titlea is same as title with underscores
        "name" => ucwords($name),
        "price" => $price,
        "url" => "/frontend/images/mynew/" . basename($_FILES['image']['name']),  // Ensure correct file path with forward slashes
        "url2" => $url2,
        "category" => $category,
        "detail" => $detail  // Save the product detail
    ];

    // Manually ensure the paths have no backslashes (escaping issues in JSON)
    $newProduct['url'] = str_replace('\\', '/', $newProduct['url']); // Ensure single forward slashes
    $newProduct['url2'] = str_replace('\\', '/', $newProduct['url2']); // Ensure single forward slashes

    // Add the new product to the array
    $productsData['products'][] = $newProduct;

    // Save the updated products data back to the JSON file
    $jsonData = json_encode($productsData, JSON_PRETTY_PRINT);

    // Remove unwanted escape characters from the JSON string
    $jsonData = str_replace('\\/', '/', $jsonData); // Remove extra escaped slashes

    // Save the cleaned data to the JSON file
    if (file_put_contents($productsFile, $jsonData)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
