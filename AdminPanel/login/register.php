<?php

// Get the incoming data (UsernameAdmin, EmailAdmin, password)
$UsernameAdmin = $_POST['UsernameAdmin'];
$EmailAdmin = $_POST['EmailAdmin'];
$password = $_POST['password'];

// Path to the users and pending requests files
$usersFile = 'users.json';
$pendingFile = 'pending_requests.json';

// Check if the users.json file exists, if not, create an empty array
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode(['users' => []], JSON_PRETTY_PRINT));
}

// Check if the pending_requests.json file exists, if not, create an empty array
if (!file_exists($pendingFile)) {
    file_put_contents($pendingFile, json_encode(['requests' => []], JSON_PRETTY_PRINT));
}

// Load existing data
$users = json_decode(file_get_contents($usersFile), true);
$pendingRequests = json_decode(file_get_contents($pendingFile), true);

// Check if the UsernameAdmin or EmailAdmin already exists in users.json
foreach ($users['users'] as $user) {
    if ($user['EmailAdmin'] === $EmailAdmin) {
        echo "This EmailAdmin is already registered.";
        exit;
    }
    if ($user['UsernameAdmin'] === $UsernameAdmin) {
        echo "This UsernameAdmin is already taken.";
        exit;
    }
}

// Check if the EmailAdmin or UsernameAdmin already exists in pending_requests.json
foreach ($pendingRequests['requests'] as $request) {
    if ($request['EmailAdmin'] === $EmailAdmin) {
        echo "This EmailAdmin is already pending approval.";
        exit;
    }
    if ($request['UsernameAdmin'] === $UsernameAdmin) {
        echo "This UsernameAdmin is already pending approval.";
        exit;
    }
}

// If no duplicates are found, store the registration details in pending_requests.json
$newRequest = [
    'UsernameAdmin' => $UsernameAdmin,
    'EmailAdmin' => $EmailAdmin,
    'password' => $password
];

$pendingRequests['requests'][] = $newRequest;

// Save the updated pending requests back to the file
file_put_contents($pendingFile, json_encode($pendingRequests, JSON_PRETTY_PRINT));

// Respond to the user with a success message
echo "Your registration has been submitted and is awaiting approval.";
?>
