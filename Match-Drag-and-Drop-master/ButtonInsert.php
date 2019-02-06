<?php

require_once 'connect.php';

if(isset($_POST['BtnsInsert']) and isset($_POST['Maxpossiblepts']) and isset($_POST['WordIds']) and isset($_POST['Qnum'])) {
    $btn_insert = mysqli_real_escape_string($conn,test_input($_POST['BtnsInsert']));
    $max_pts = mysqli_real_escape_string($conn,test_input($_POST['Maxpossiblepts']));
    $word_ids = mysqli_real_escape_string($conn,test_input($_POST['WordIds']));
    $sent_set = mysqli_real_escape_string($conn,test_input($_POST['Qnum']));
    $earn_pts = 0;
    echo "<script> alert( '/BtnsInsert: " . $btn_insert . " /Maxpossiblepts: " . $max_pts ." /WordIds: " . $word_ids ." /Sentence: " . $sent_set . "' );</script>";
    $insert_status= mysqli_query($conn," INSERT INTO sentenceset2 (Name, QuestionNo, WordID, Words, Maxpts, Earnedpts) VALUES ('Hrishi', '$sent_set', '$word_ids', '$btn_insert', '$max_pts', '$earn_pts')")  ;
}


function test_input($data) {
                                                  $data = trim($data);
                                                  $data = stripslashes($data);
                                                  $data = htmlspecialchars($data);
                                                  return $data;
                                                }

?>