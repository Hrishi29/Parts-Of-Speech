<?php
require_once 'connect.php';
date_default_timezone_set("America/New_York");
echo date("Y-m-d H:i:s");
echo "\r\n";
$newDate = date("Y-m-d H:i:s");
$name = "Hrishi";
$table_name = "questionset2";
/*
$set_date = "INSERT iNTO users (Name, QuestionSet, Date) VALUES  ('$name', '$table_name', '$newDate')";
$result = $conn->query($set_date);
if($result){
    echo "Success";
}

else {
    echo "Error: " . $conn->error;;
}
*/
$get_date = "SELECT Date FROM users WHERE Name='".$name."' AND QuestionSet='".$table_name."'";
$result = $conn->query($get_date);
if ($result->num_rows > 0) {
    // output data of each row
    $row = $result->fetch_assoc(); 
    echo  $row["Date"];
    echo "\r\n";
} 
else {
    echo "0 results";
}
$d=new DateTime($row["Date"]);
$now = new DateTime();

if ($d->diff($now)->format('%r%a') < 7)
{
    echo "less than a week";
}
else {
    echo "Expired";
}

?>