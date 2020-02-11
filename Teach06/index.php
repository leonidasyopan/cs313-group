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

        <form action="index.php" method="post">
            <input type="text" name="book" id="book" placeholder="Book"><br>
            <input type="text" name="chapter" id="chapter" placeholder="Chapter"> <br>
            <input type="text" name="verse" id="verse" placeholder="Verse"> <br>
            <input type="text" name="content" id="content" placeholder="Content"> <br>        
            <p>Topics:</p>
            <?php

            foreach ($db->query('SELECT DISTINCT * FROM topics') as $row) {                
                echo '<input type="checkbox" name="topics[]" value="'. $row['topics_id'] . '" >' . $row['name'] . ' - ' . $row['id'] . '</br>';
            }
            ?>
            <input type="submit">
        </form>
        
        <?php
            if (isset($_POST)) {

                echo '<p>post is set!</p>';

                $book = htmlspecialchars($_POST[book]);
                echo '<p>Book: ' . $book . '</p>';
                $chapter = htmlspecialchars($_POST[chapter]);
                echo '<p>Chapter: ' . $chapter . '</p>';
                $verse = htmlspecialchars($_POST[verse]);
                echo '<p>Verse: ' . $verse . '</p>';
                $content = htmlspecialchars($_POST[content]);
                echo '<p>Content: ' . $content . '</p>';    
                
                echo '<pre>'; print_r($_POST['topics']); echo '</pre>';
                
                $stmt = $db->prepare("INSERT INTO scriptures (book, chapter, verse, content) VALUES (:book, :chapter, :verse, :content);");
                $stmt->bindValue(':book', $book, PDO::PARAM_STR);
                $stmt->bindValue(':chapter', $chapter, PDO::PARAM_STR);
                $stmt->bindValue(':verse', $verse, PDO::PARAM_STR);
                $stmt->bindValue(':content', $content, PDO::PARAM_STR);
                
                $stmt->execute();

                echo '<p>' . $result . '</p>';

                $newID = $db->query("SELECT max(scriptures_id) FROM scriptures");
                echo 'New ID: ' . $newID;


                
                for ($i = 0; $i < count($_POST['topics']); $i++) {

                    echo '<p>inserting ' . $_POST['topics'][$i] . '...</p>';
                    $stmt = $db->prepare("INSERT INTO lookup (scriptures_id, topics_id) VALUES (:scriptures_id, :topics_id);");
                    $stmt->bindValue(':scriptures_id', $newID, PDO::PARAM_INT);
                    $stmt->bindValue(':topics_id', $_POST['topics'][$i], PDO::PARAM_INT);
                    $stmt->execute();
                    echo 'finished for loop';
                
                $stmt->execute();

                echo '<p>' . $result . '</p>';

                $newID = $db->query("SELECT max(scriptures_id) FROM scriptures");


                
                for ($i = 0; $i < count($_POST['topics']); $i++) {

                    echo 'inserting ' . $_POST['topics'][$i] . '...';
                    $stmt = $db->prepare ("INSERT INTO lookup (scriptures_id, topics_id) VALUES (:scriptures_id, :topics_id);");
                    $stmt->bindValue(':scriptures_id', $scriptures_id, PDO::PARAM_INT);
                    $stmt->bindValue(':topics_id', $_POST['topics'][$i], PDO::PARAM_INT);
                    $stmt->execute();
                    echo 'finished for loop';
                }

            }
        ?>