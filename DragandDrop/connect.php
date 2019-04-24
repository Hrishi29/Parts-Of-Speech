<?php

$conn = mysqli_connect("localhost","root","");  //database connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
     } 
	
	mysqli_select_db($conn,'grammarcat');  // selecting database
?>