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
            <input type="checkbox" name="newTopic" value="1"> <input type="text" name="topic" id="topic" placeholder="other"><br>
            <input type="submit">
        </form>

            <?php
            if (isset($_POST)) {

                

                // echo '<p>post is set!</p>';

                $book = htmlspecialchars($_POST[book]);
                // echo '<p>Book: ' . $book . '</p>';
                $chapter = htmlspecialchars($_POST[chapter]);
                //echo '<p>Chapter: ' . $chapter . '</p>';
                $verse = htmlspecialchars($_POST[verse]);
                //echo '<p>Verse: ' . $verse . '</p>';
                $content = htmlspecialchars($_POST[content]);
                //echo '<p>Content: ' . $content . '</p>';    
                $topics = $_POST['topics'];


                if (isset($_POST['newTopic'])) {
                    $newTopic = htmlspecialchars($_POST['topic']);
                    $stmt = $db->prepare("INSERT INTO topics (name) VALUES :name");
                    $stmt->bindValue(':name', $newTopic, PDO::PARAM_STR);
                    $stmt->execute();

                    $topics->push($db->lastInsertId("topics_topics_id_seq"));
                    }
                
                //echo '<pre>'; print_r($_POST['topics']); echo '</pre>';
                
                $stmt = $db->prepare("INSERT INTO scriptures (book, chapter, verse, content) VALUES (:book, :chapter, :verse, :content);");
                $stmt->bindValue(':book', $book, PDO::PARAM_STR);
                $stmt->bindValue(':chapter', $chapter, PDO::PARAM_STR);
                $stmt->bindValue(':verse', $verse, PDO::PARAM_STR);
                $stmt->bindValue(':content', $content, PDO::PARAM_STR);
                
                $stmt->execute();

                //echo '<p>' . $result . '</p>';

                $scriptureId = $db->lastInsertId("scriptures_scriptures_id_seq");
                //echo '<p>scriptureId: ' . $scriptureId . '</p>';
                

                for ($i = 0; $i < count($topics); $i++) {

                    //echo '<p>inserting ' . $_POST['topics'][$i] . '...</p>';
                    $stmt = $db->prepare("INSERT INTO lookup (scriptures_id, topics_id) VALUES (:scriptures_id, :topics_id);");
                    $stmt->bindValue(':scriptures_id', $scriptureId, PDO::PARAM_INT);
                    $stmt->bindValue(':topics_id', $topics[$i], PDO::PARAM_INT);
                    $stmt->execute();
                    //echo 'finished for loop';

            }
        }
        ?>

            <table>
                            <tr>
                                <th>Topic</th>
                                <th>Reference</th>
                                <th>Content</th>
                            </tr>
                    
                        <?php
                        foreach ($db->query("SELECT l.lookup_id
                        ,       s.book
                        ,       s.chapter
                        ,       s.verse
                        ,       s.content
                        ,       t.name
                        FROM scriptures s
                        INNER JOIN lookup l ON l.scriptures_id = s.scriptures_id
                        INNER JOIN topics t ON t.topics_id = l.topics_id;") as $row) {                
                            
                            echo '<tr>' .
                                '<td>'. $row['name'] . '</td>' .
                                '<td>'. $row['book'] . ' ' . $row['chapter'] . ':'  . $row['verse'] . '</td>' .                
                                '<td>'. $row['content'] . '</td>' .
                            '</tr>';
                            
                        }
                        ?>
                        </table>

                </body>
            </html>