<?php

$jsonData = file_get_contents('users.json');
$users = json_decode($jsonData, true)['users'];


$EmailAdmin = $_POST['EmailAdmin'];
$password = $_POST['password'];


$usernameValid = false;
$passwordValid = false;


foreach ($users as $user) {
    if ($user['EmailAdmin'] === $EmailAdmin) {
        $usernameValid = true; 
        if ($user['password'] === $password) {
            $passwordValid = true; 
            break; 
        }
    }
}


if ($usernameValid && $passwordValid) {
    echo 'Login successful';
} elseif (!$usernameValid && !$passwordValid) {
    echo 'Both username and password are incorrect';
} elseif (!$usernameValid) {
    echo 'Username is incorrect';
} else {
    echo 'Password is incorrect';
}
?>
