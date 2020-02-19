<?php
session_start();


if($_SESSION["loggedin"] == true) {
    header('Location: ' . 'welcome.php');
    die();
}

require_once("connect.php");

$password_err = $confirm_err = $username_err = " ";


if (!empty($_POST)) {

    if(!empty(trim(($_POST["username"]))))
    {
        //validate username
        $newUsername = $_POST["username"];

        $sql = $db->prepare("SELECT username FROM user_accounts WHERE username = :username");
        $sql->bindParam(":username", $newUsername);

        if($sql->execute()){
            if($sql->rowCount() == 1){
                $username_err = "This username is already taken.";
            } else{
                $username = trim($_POST["username"]);
            }
        } else{
            echo "Oops! Something went wrong. Please try again later.";
        }
    
    }
    else {
        $username_err = "Please enter a username.";
    }

    if(!empty(trim(($_POST["password"])))) {
        //validate password
        if (trim(strlen($_POST["password"])) < 6)
            $password_err = "Your Password Must be at least 6 characters long";

        if (!preg_match('~[0-9]+~', $_POST["password"])) {
            $password_err = "Your Password Must contain a number";
            }
    }
    else {
        $password_err = "Please Enter A Password.";
    }

    if (!empty(trim(($_POST["confirm-password"])))) {
        if (strlen($_POST["confirm-password"]) < 6)
            $password_err = "Your Password Must be at least 6 characters long";
    }
    else {
        $confirm_err = "Please Enter Your Password Again.";
    }

    if (empty($confirm_err) && empty($password_err)){

        if (($_POST["confirm-password"]) != ($_POST["password"])) {
            $confirm_err = $password_err = "Your Passwords must match";
        }
        else {
            
        }
    }

    if (empty(trim($username_err)) && empty(trim($password_err)) && empty(trim($confirm_err)))
    {

        $newPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);

        //Create new user in database
        $sql = $db->prepare("INSERT into user_accounts (username, password, user_create_date) VALUES (:username, :password, current_timestamp)");
        $sql->bindParam(":username", $newUsername);
        $sql->bindParam(":password", $newPassword);

        // Attempt to execute the prepared statement
        if($sql->execute()){
            // Redirect to login page
            header("location: login.php");
        } else{
            echo "Something went wrong. Please try again later.";
        }
    
    }
    
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=\, initial-scale=1.0">
    <title>Sign-Up</title>
</head>
<body>

    <form action="sign-up.php" method="post">
        <label for="username">Username:</label>
        <input type="text" name="username" placeholder="username" id="username">
        <p class="error"><?php echo $username_err; ?></p>
        
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="password" id="password">
        <p class="error"><?php echo $password_err; ?></p>
        <label for="password">Confirm Password:</label>
        <input type="password" name="confirm-password" placeholder="password" id="confirm-password">
        <p class="error"><?php echo $confirm_err; ?></p>
        
        <input type="submit" value="Submit">


    </form>
    
</body>
</html>