<?php

// Check if the request is a POST request and the file is being uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['avatar']) && isset($_POST['email'])) {

    // Retrieve the uploaded file and email from the POST data
    $avatar = $_FILES['avatar'];
    $email = $_POST['email'];

    // Check if there were any errors in the file upload
    if ($avatar['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'Failed to upload avatar.']);
        exit;
    }

    // Define the upload directory
    $uploadDir = 'uploads/';
    
    // Ensure the upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Generate a unique file name to avoid name conflicts
    $avatarFileName = uniqid('avatar_', true) . '.' . pathinfo($avatar['name'], PATHINFO_EXTENSION);

    // Set the target file path
    $targetFilePath = $uploadDir . $avatarFileName;

    // Move the uploaded file to the target directory
    if (move_uploaded_file($avatar['tmp_name'], $targetFilePath)) {

        // Update the users.json file
        $usersFile = '../../users.json';

        // Read the existing users data from the users.json file
        $usersData = json_decode(file_get_contents($usersFile), true);

        // Check if the users data was retrieved successfully
        if ($usersData && isset($usersData['users'])) {
            // Find the user by email and update their avatar field
            foreach ($usersData['users'] as &$user) {
                if (strtolower($user['email']) === strtolower($email)) {
                    // Correct format for the avatar path without escaping the forward slash
                    $user['avatar'] = $targetFilePath; // Set the new avatar path
                    break;
                }
            }

            // Write the updated users data back to the users.json file
            file_put_contents($usersFile, json_encode($usersData, JSON_PRETTY_PRINT));

            // Return the response with success
            echo json_encode([
                'success' => true,
                'imageUrl' => $targetFilePath // Return the new image path
            ]);
            exit;

        } else {
            echo json_encode(['success' => false, 'message' => 'User not found in the database.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error saving the avatar file.']);
        exit;
    }

} else {
    // Handle invalid requests
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}
?>
