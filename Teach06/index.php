<?php
// Start the session
session_start();

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
    <title>Scripture Resource</title>
</head>
<body>
    <h1>Scripture Resource</h1>

        <form action="scriptures.php" method="post">
            <input type="text" name="book" id="book" placeholder="Book"><br>
            <input type="text" name="chapter" id="chapter" placeholder="Chapter"> <br>
            <input type="text" name="verse" id="verse" placeholder="Verse"> <br>
            <textarea id="content" rows="4" cols="50" placeholder="Write content here..."></textarea> <br>        
            <p>Topics:</p>
            <?php
            foreach ($db->query('SELECT DISTINCT name FROM topics') as $row) {                
                echo '<input type="checkbox" name="topics[]" value="'. $row['name'] . '" >' . $row['name'] . '</br>';
            }
            ?>
            <input type="submit">
        </form>
        
        
</body>
</html>
