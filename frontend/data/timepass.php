<?php
$targetDir = "D:/Start Project Website with Login and Registration/frontend/images/mynew/";

if (is_dir($targetDir)) {
    echo "The directory exists: " . realpath($targetDir);
} else {
    echo "The directory does not exist or the path is incorrect.";
}
?>
