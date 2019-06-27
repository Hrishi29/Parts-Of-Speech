<?php

require_once 'connect.php';

if(isset($_GET['labelPt'])){
    
    $sent_setnum = mysqli_real_escape_string($conn,test_input($_GET['labelPt']));
    $name = "Hrishi";
    $table_name = "questionset2";
    $label_pts="SELECT Maxpts FROM ".$table_name." where Name='".$name."' and QuestionNo='".$sent_setnum."'";
    $result_label = $conn->query($label_pts);
    if($result_label){
        $count_labels = 0;
        if($result_label -> num_rows > 0){
            
            while($row_labels = $result_label -> fetch_assoc()){
                
                $count_labels += $row_labels['Maxpts'];
            }
            
            echo $count_labels;
        }
        
        else {
            
            echo "error with label entries";
        }
    }
    
    else{
        
        echo "error with labels";
    }
}


function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

?>

