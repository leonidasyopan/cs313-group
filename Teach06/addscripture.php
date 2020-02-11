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