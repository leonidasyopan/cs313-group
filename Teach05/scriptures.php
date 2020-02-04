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
    <title>Scripture Resource</title>
</head>
<body>
    <h1>Scripture Resource</h1>

        <form>
            <?php
            foreach ($db->query('SELECT book FROM scriptures') as $book) {                
                echo '<input type="radio" name="book" value="'. $book . '" >' . $book . '</br>';
            }
            ?>
        </form>
        
        <?php
        foreach ($db->query('SELECT * FROM scriptures') as $row ) {
            echo '<p><strong>' . $row['book'] . ' ' . $row['chapter'] . ':' . $row['verse'];
            echo '</strong>';
            echo  ' - ' . '"' . $row['content'] . '"';
            echo '</p>';
        }
        ?>
        
</body>
</html>
