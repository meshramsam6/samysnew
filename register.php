<?php

$jsonData = file_get_contents('users.json');
$users = json_decode($jsonData, true);


$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];


$emailExists = false;
foreach ($users['users'] as $user) {
    if ($user['email'] === $email) {
        $emailExists = true;
        break;
    }
}


if ($emailExists) {
    echo 'Email already exists';
} else {
    
    $newUser = array(
        "username" => $username,
        "email" => $email,
        "password" => $password 
    );

    $users['users'][] = $newUser;


    file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));

    echo 'Registration successful';
}
?>
