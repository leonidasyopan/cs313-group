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
    <script src="functions.js"></script>
    <title>Scripture Resource</title>
</head>
<body>
    <h1>Scripture Resource</h1>

        <form id="form" method="post">
            <input type="text" name="book" id="book" placeholder="Book"><br>
            <input type="text" name="chapter" id="chapter" placeholder="Chapter"> <br>
            <input type="text" name="verse" id="verse" placeholder="Verse"> <br>
            <input type="text" name="content" id="content" placeholder="Content"> <br>
            <div id="topics">       
            <p>Topics:</p>
            <?php

            foreach ($db->query('SELECT DISTINCT * FROM topics') as $row) {                
                echo '<input type="checkbox" name="topics" value="'. $row['topics_id'] . '" >' . $row['name'] . '</br>';
            }
            ?>
            </div>
            <input type="checkbox" name="newTopic" value="1" id="newTopic"> <input type="text" name="topic" id="topic" placeholder="other"><br>
            <button onclick="submitForm()">Submit</button>
        </form>

            <?php
            
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