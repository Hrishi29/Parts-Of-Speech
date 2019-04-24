<?php

require_once 'connect.php';

//User Validation and Information
if(isset($_POST['Name'])){
    $name = mysqli_real_escape_string($conn,test_input($_POST['Name']));
    $table_name = "questionset2";
    $get_user = "SELECT Name FROM users WHERE Name='".$name."'";
    $result = $conn->query($get_user);
    if($result){
        if ($result->num_rows > 0) {
        // output data of each row
            $row = $result->fetch_assoc(); 
            echo  "Exists";
            
        } 
        else {
        $insert_user = "INSERT INTO users (Name, QuestionSet) VALUES ('$name', '$table_name')";
        $result = $conn->query($insert_user);
        if($result){
            echo "success";
        }
        else {
            echo $conn->error;
        }
        }       
    }

    else{

        echo $conn->error;

    }

}
//Table Data for Admin Table
if(isset($_POST['QuestionnumSet'])){
   
    $set = mysqli_real_escape_string($conn,test_input($_POST['QuestionnumSet']));
    $usrrow = array();
    if($set == 'All'){
        $get_row = "SELECT Name, QuestionSet, Date FROM users";  
    }
    else{
    $get_row = "SELECT Name, QuestionSet, Date FROM users where QuestionSet='".$set."'";
    }
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

// load default set    
if(isset($_POST['currSets'])){
   if(mysqli_real_escape_string($conn,test_input($_POST['currSets'])) == 'set'){
        $query_sets = "SELECT * FROM adminquestionset where Current='live'";
        $query_result = $conn->query($query_sets);
        if($query_result){
            echo "Load Success";
        }
    
        else {
            echo "Error: " . $conn->error;
        }
        
   }
}

//Update Date in AdminSet
                            
if(isset($_POST['UpdateStart']) and isset($_POST['UpdateEnd']) and isset($_POST['UpdateLive'])){

    $startEntry = mysqli_real_escape_string($conn,test_input($_POST['UpdateStart']));
    $endEntry = mysqli_real_escape_string($conn,test_input($_POST['UpdateEnd']));
    $liveEntry = mysqli_real_escape_string($conn,test_input($_POST['UpdateLive']));

    if(empty($startEntry) || empty($endEntry)){ 
        $setNull = "UPDATE adminquestionset SET StartDate = NULL, EndDate = NULL where Username='OduAdmin' AND QuestionSet='".$liveEntry."'";
        $resultnull = $conn->query($setNull);
            if($resultnull){
                echo "Null Success";
            }
        
            else {
                echo "Error: " . $conn->error;
            }
    }
    else{
        $eraselive = "UPDATE adminquestionset SET Current = NULL where Current='live'";
        $resulterase = $conn->query($eraselive);
        if($resulterase){
            $set_date = "UPDATE adminquestionset SET StartDate = '".$startEntry."', EndDate = '".$endEntry."', Current = 'live' where Username='OduAdmin' AND QuestionSet='".$liveEntry."'";
            $resultlive = $conn->query($set_date);
            if($resultlive){
                echo "Update Success";
            }
        
            else {
                echo "Error: " . $conn->error;
            }
        }

        else {
            echo "Error: " . $conn->error;
        }
    }
} 

// Update table from admin portal
if(isset($_POST['TableName']) and isset($_POST['TableQues'])){
    $usrname = mysqli_real_escape_string($conn,test_input($_POST['TableName']));
    $usrques = mysqli_real_escape_string($conn,test_input($_POST['TableQues']));
    $set_date = "UPDATE users SET Date = NULL where Name='".$usrname."' AND QuestionSet='".$usrques."'";
    $result = $conn->query($set_date);
    if($result){
        echo "Date Success";
    }

    else {
        echo "Error: " . $conn->error;
    }
}

//Delete Entries in database with respect to users
if(isset($_POST['TableNameDel']) and isset($_POST['TableQuesDel'])){
    $usrname = mysqli_real_escape_string($conn,test_input($_POST['TableNameDel']));
    $usrques = mysqli_real_escape_string($conn,test_input($_POST['TableQuesDel']));
    $del_user = "DELETE FROM users where Name='".$usrname."' AND QuestionSet='".$usrques."'";
    $result = $conn->query($del_user);
    if($result){
        $del_usertable = "DELETE FROM ".$usrques." where Name='".$usrname."'";
        $resultdel = $conn->query($del_usertable);
        if($resultdel){
            echo "Delete Success";
        }

        else {

            echo "Error: " . $conn->error;
        }
    }

    else {
        echo "Error: " . $conn->error;
    }
}

// Insert date into databse for the user and question set
if(isset($_POST['ChangeName'])){
$usrname = mysqli_real_escape_string($conn,test_input($_POST['ChangeName']));
date_default_timezone_set("America/New_York");
$newDate = date("Y-m-d H:i:s");
$name = "Hrishi";
$table_name = "questionset2";

$set_date = "UPDATE users SET Date='".$newDate."' where Name='".$usrname."' AND QuestionSet='".$table_name."'";
$result = $conn->query($set_date);
if($result){
    echo "Date Success";
}

else {
    echo "Error: " . $conn->error;;
}

}

if(isset($_GET['q'])){
    
    $name = "Hrishi";
    $table_name = "questionset2";
    $check_status = "SELECT DISTINCT QuestionNo FROM ".$table_name." where Name='".$name."' ORDER BY QuestionNo DESC LIMIT 1";
    $result = $conn->query($check_status);
    if($result){
        if ($result->num_rows > 0) {
    // output data of each row
            $row = $result->fetch_assoc(); 
            $numbers = preg_replace('/[^0-9]/', '', $row["QuestionNo"]);
            echo $numbers;
        }
        
        else {
            
            echo "1";
        }
    }
    
    else {
         
        echo "Unsuccess";
    }
        
}

if(isset($_POST['BtnsInsert']) and isset($_POST['Maxpossiblepts']) and isset($_POST['WordIds']) and isset($_POST['Qnum']) and isset($_POST['WordCount'])) {
    $btn_insert = mysqli_real_escape_string($conn,test_input($_POST['BtnsInsert']));
    $max_pts = mysqli_real_escape_string($conn,test_input($_POST['Maxpossiblepts']));
    $word_ids = mysqli_real_escape_string($conn,test_input($_POST['WordIds']));
    $sent_set = mysqli_real_escape_string($conn,test_input($_POST['Qnum']));
    $wordcount = mysqli_real_escape_string($conn,test_input($_POST['WordCount']));
    $speech_word = "Default";// mysqli_real_escape_string($conn,test_input($_POST['WordSpeech']));
    //$earn_pts = 0;
    $name = "Hrishi";
    $table_name = "questionset2";
  //  echo "<script> alert( '/BtnsInsert: " . $btn_insert . " /Maxpossiblepts: " . $max_pts ." /WordIds: " . $word_ids ." /Sentence: " . $sent_set . "' );</script>";
    
    // check if sentence already exists in database
    
    $check_status=mysqli_query($conn, "SELECT QuestionNo FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_set."'  LIMIT 1");
    if($array_status=mysqli_fetch_array($check_status)){
        
        echo "Question exists then ckeck for all words if existing";
        // Count the number of entries to validate on reload
        
        $check_status1=mysqli_query($conn, "SELECT COUNT(QuestionNo) FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_set."' ");
        $array_status1=mysqli_fetch_array($check_status1);
        
        if ($array_status1['COUNT(QuestionNo)'] == $wordcount){
            
            echo "Words already exist";
            //do nothing
        }
        
        // insert each word
        else {
                
             $insert_status= mysqli_query($conn," INSERT INTO ".$table_name." (Name, QuestionNo, WordID, Words, Maxpts) VALUES ('$name', '$sent_set', '$word_ids', '$btn_insert', '$max_pts')")  ;
            echo "Words inserted one by one";
        }
        
    }
    
  
    // Insert all words forming the sentence
    else {
        
        $insert_status= mysqli_query($conn," INSERT INTO ".$table_name." (Name, QuestionNo, WordID, Words, Maxpts) VALUES ('$name', '$sent_set', '$word_ids', '$btn_insert', '$max_pts')")  ;
        
        if($insert_status){
            echo "All words inserted successfully";
        }
        else{
            echo "All words insertion unsuccessfull";
        }
    }
}


if(isset($_POST['CountPts']) and isset($_POST['Wordids']) and isset($_POST['Qnum'])){
    
    $ptsCount = mysqli_real_escape_string($conn,test_input($_POST['CountPts']));
    $idWord = mysqli_real_escape_string($conn,test_input($_POST['Wordids']));
    $sent_set = mysqli_real_escape_string($conn,test_input($_POST['Qnum']));
    $name = "Hrishi";
    $table_name = "questionset2";
    $check_status1=mysqli_query($conn, "SELECT Maxpts FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_set."' and WordID='".$idWord."' ");
    $array_status1=mysqli_fetch_array($check_status1);
    if($array_status1['Maxpts'] != 0){
        $updatePts = $array_status1['Maxpts'] - 1;
        $update_status= mysqli_query($conn," UPDATE ".$table_name." SET Maxpts ='".$updatePts."' where  Name='".$name."' and QuestionNo='".$sent_set."' and WordID='".$idWord."' ");
    }
}

if(isset($_POST['Wordids']) and isset($_POST['Qnum'])){
    
    $idWord = mysqli_real_escape_string($conn,test_input($_POST['Wordids']));
    $sent_set = mysqli_real_escape_string($conn,test_input($_POST['Qnum']));
    $name = "Hrishi";
    $table_name = "questionset2";
    $check_status1=mysqli_query($conn, "SELECT Maxpts FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_set."' and WordID='".$idWord."' ");
    $array_status1=mysqli_fetch_array($check_status1);
    $updatePts = $array_status1['Maxpts'];
    $update_status= mysqli_query($conn," UPDATE ".$table_name." SET  Earnedpts='".$updatePts."' where  Name='".$name."' and QuestionNo='".$sent_set."' and WordID='".$idWord."' ");
}

if(isset($_POST['partsWordlst']) and isset($_POST['wordidlst']) and isset($_POST['Qnum'])){
      $name = "Hrishi";
      $table_name = "questionset2";
      $sent_set = mysqli_real_escape_string($conn,test_input($_POST['Qnum']));

      for ($i = 0; $i < count($_POST['partsWordlst']); $i++)
      {
        $wordSpeech = $_POST['partsWordlst'][$i];
        $idWord = $_POST['wordidlst'][$i];
        
        $update_status= mysqli_query($conn," UPDATE ".$table_name." SET  WordSpeech='".$wordSpeech."' where  Name='".$name."' and QuestionNo='".$sent_set."' and WordID='".$idWord."' ");

        }
        $check_pts="SELECT WordID, WordSpeech FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_set."' and Earnedpts IS NOT NULL";
        $result = $conn->query($check_pts);
        if($result){
              if ($result->num_rows > 0) {
                  
                    $valarr = array();
                    
                   
                   while($row = $result->fetch_assoc()){
                           
                     array_push($valarr, $row['WordID']." ".str_replace(" ", "-", $row['WordSpeech']));
                         
                    }
                    
                    echo  json_encode($valarr); 
            
              }
        
        else {
            
            echo "less";
        }
        
        }
        
        else{
            echo "Points unsuccess";
        }
  
    
}


function test_input($data) {
                                                  $data = trim($data);
                                                  $data = stripslashes($data);
                                                  $data = htmlspecialchars($data);
                                                  return $data;
                                                }

?>