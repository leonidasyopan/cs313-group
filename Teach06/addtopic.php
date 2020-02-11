<?php


    $newTopic = htmlspecialchars($_POST['topic']);
    //echo '<p>New Topic: ' . $newTopic . '</p>';
    $stmt = $db->prepare("INSERT INTO topics (name) VALUES (:name);");
    $stmt->bindValue(':name', $newTopic, PDO::PARAM_STR);
    $stmt->execute();
    //echo '<p> Inserted </p>';
    $value = $db->lastInsertId("topics_topics_id_seq");
    //echo '<p>$value: ' . $value . '</p>';
    echo $value;

                    
?>