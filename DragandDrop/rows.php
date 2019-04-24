<?php
require_once 'connect.php';

if(isset($_POST['QuestionnumSet'])){
   
$set = $_POST['QuestionnumSet'];
$usrrow = array();
$get_row = "SELECT Name, QuestionSet, Date FROM users where QuestionSet='".$set."'";
$result = $conn->query($get_row);
if($result){
    while ($row = $result->fetch_assoc()){
    array_push($usrrow, $row);
    }
    $myJSON = json_encode($usrrow);
    echo $myJSON;
}
else{
    echo $conn->error;
}
}

?>