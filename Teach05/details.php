<?php
// Start the session
session_start();

if(isset($_GET['id'])){
    $i = $_GET['id'];
    
} else {
    echo "No scripture was selected.";
}

?>
<?php

try
{
    $dbUrl = getenv('DATABASE_URL');

    $dbOpts = parse_url($dbUrl);

    $dbHost = $dbOpts["host"];
    $dbPort = $dbOpts["port"];
    $dbUser = $dbOpts["user"];
    $dbPassword = $dbOpts["pass"];
    $dbName = ltrim($dbOpts["path"],'/');

    $db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);

    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $ex)
{
    echo 'Error!: ' . $ex->getMessage();
    die();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Details</title>
</head>
<body>

    <?php
        //$db->query("SELECT * FROM 'scriptures' WHERE 'id' = '$i'") as $row

        $db->query('SELECT * FROM scriptures WHERE id = ' . $i . "'") as $row

        echo '<p><strong>' . $row['book'] . ' ' . $row['chapter'] . ':' . $row['verse'];
        echo '</strong>';
        echo  ' - ' . '"' . $row['content'] . '"';
        echo '</p>';

    ?>

    
</body>
</html>