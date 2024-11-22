<?php
// Path to the users.json file
$usersFile = '../login/users.json';

// Check if the 'users.json' file exists
if (!file_exists($usersFile)) {
    die(json_encode(['success' => false, 'message' => 'Error: users.json file not found.']));
}

// Read the existing data from the 'users.json' file
$usersData = file_get_contents($usersFile);
$users = json_decode($usersData, true);

// Check if the received data is in JSON format and contains the required fields
$data = json_decode(file_get_contents('php://input'), true);

// Debugging the input data
file_put_contents('php://stderr', print_r($data, true)); // Log received data

if (isset($data['EmailAdmin'])) {
    $EmailAdmin = $data['EmailAdmin'];

    // Search for the user with the matching EmailAdmin
    $userIndex = -1;
    foreach ($users['users'] as $index => $user) {
        if (strtolower($user['EmailAdmin']) === strtolower($EmailAdmin)) {
            $userIndex = $index;
            break;
        }
    }

    // If the user is found, update the profile
    if ($userIndex !== -1) {
        $updated = false;

        // Only update phone if provided
        if (isset($data['phone']) && !empty($data['phone'])) {
            $users['users'][$userIndex]['phone'] = $data['phone'];
            $updated = true;
        }

        // Only update address if provided
        if (isset($data['address']) && !empty($data['address'])) {
            $users['users'][$userIndex]['address'] = $data['address'];
            $updated = true;
        }

        // If any update was made, write back to the file
        if ($updated) {
            // Write the updated data back to the 'users.json' file
            $updatedData = json_encode($users, JSON_PRETTY_PRINT);
            if (file_put_contents($usersFile, $updatedData)) {
                echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
            } else {
                // Log error if the file couldn't be saved
                error_log('Error: Failed to save profile data to users.json');
                echo json_encode(['success' => false, 'message' => 'Failed to update profile, error saving data.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No data to update.']);
        }
    } else {
        // If the user is not found
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} else {
    // If the required data is not provided
    echo json_encode(['success' => false, 'message' => 'Invalid data received']);
}
?>