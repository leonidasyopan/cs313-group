<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] != true){
    header("location: login.php");
    exit;
}
 
//Connect to Database
require_once "connect.php";



$sql = 'SELECT * FROM user_accounts WHERE user_id = 3';
        $row = $db->query($sql)->fetch();

        $welcome = "Welcome, " . $row["username"] . $_SESSION["id"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
<body>
    <h1><?php echo $welcome; ?></h1>
</body>
</html>