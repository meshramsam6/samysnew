<?php

// File paths
$usersFile = 'users.json';
$pendingFile = 'pending_requests.json';

// Ensure users.json and pending_requests.json files exist
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode(['users' => []], JSON_PRETTY_PRINT));
}
if (!file_exists($pendingFile)) {
    file_put_contents($pendingFile, json_encode(['requests' => []], JSON_PRETTY_PRINT));
}

// Load data from files
$pendingRequests = json_decode(file_get_contents($pendingFile), true);
$users = json_decode(file_get_contents($usersFile), true);

// Get the action and index from the incoming request data
$data = json_decode(file_get_contents('php://input'), true);
$action = isset($data['action']) ? $data['action'] : '';
$index = isset($data['index']) ? (int)$data['index'] : -1;

// Validate the index
if ($index < 0 || $index >= count($pendingRequests['requests'])) {
    echo 'Invalid request index';
    exit;
}

// Process the admin action
if ($action === 'approve') {
    // Move the selected user from pending_requests.json to users.json
    $newUser = $pendingRequests['requests'][$index];
    
    // Add the new user to the users array
    $users['users'][] = $newUser;

    // Debug output to verify $users structure
    // print_r($users);
    
    // Save the updated users.json file
    if (file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT)) === false) {
        echo 'Error saving to users.json';
        error_log("Failed to write to $usersFile");
        exit;
    }
    echo 'User approved and added to users.json';
} elseif ($action === 'reject') {
    echo 'User rejected';
} else {
    echo 'Invalid action';
    exit;
}

// Remove the request from pending_requests.json
array_splice($pendingRequests['requests'], $index, 1);

// Save the updated pending_requests.json file
if (file_put_contents($pendingFile, json_encode($pendingRequests, JSON_PRETTY_PRINT)) === false) {
    echo 'Error updating pending_requests.json';
    error_log("Failed to update $pendingFile");
    exit;
}

echo "Pending requests updated successfully.";

?>
