<?php
/*
class User {
     public $fname;
     public $lname;
     
     public function message() {
         
         return "hello";
     }
 }

$user1 = new User();
$user1 -> fname = "John";
$user1 -> lname = "Doe";
$user2 = new User();
$user2 -> fname = 'Jane';
$user2 -> lname = "Doe";

echo $user1 -> message() . ", " .$user1 -> fname . " " . $user1 -> lname;
echo "</br>";
echo $user2 -> message() . ", ". $user2 -> fname . " " . $user2 -> lname;
*/

/*class User {
     public $fname;
     public $lname;
     
     public function message() {
         
         return "hello, <i>" . $this -> fname. " " . $this -> lname . "</i></br>" ;
     }
 }

$user1 = new User();
$user1 -> fname = "John";
$user1 -> lname = "Doe";
$user2 = new User();
$user2 -> fname = "Jonnie";
$user2 -> lname = "Roe";
echo $user1 -> message();
echo $user2 -> message();
*/

/*class Car {
    
    public $tank;
    
    public function fill($float){
        
        $this -> tank += $float;
        
        return $this;
        
    }
    
    public function ride($float){
        
        
        $this -> tank -= $float/50;
        return $this;
    }
    
} 

$bmw = new Car();
$tank = $bmw -> fill(10) -> ride(40) -> tank;
echo "The number of gallons left in the tank: " . $tank ; 
*/

/*
class User {
    
    public $firstName;
 
  // A method that says hello to the user $firstName.
  // The user $firstName property can be approached with the $this keyword.
  public function hello()
  {
        echo "hello, " .  $this -> firstName;
    
        return $this;
  }
    
    public function register(){
        
        echo " >> registered" ;
        return $this;
    }
    
    public function mail() {
        
        echo " >> email sent" ;
        
        
    }
    
    
}
$user1 = new User();
$user1 -> firstName = "Jane";
echo $user1 -> hello() -> register() -> mail() . "</br>";  

class Car {
 
  // public methods and properties.
  public $model;    
 
  public function getModel()
  {
    echo "The car model is " . $this -> model;
  }
}
 
$mercedes = new Car();
//Here we access a property from outside the class
$mercedes -> model = "Mercedes";
//Here we access a method from outside the class
echo $mercedes -> getModel();
*/

/*
class Car {
    
    private $model;
    
    public function setModel($model){
        
        $alloweModels = array("Mercedez", "BMW");
        
        if(in_array($model,$alloweModels)){
            
            $this -> model = $model; 
            return $this;
            
        }
        
        else{
            
            $this -> model = "not in our list of models";
            return $this;
        }
        
    }
    
    public function getModel(){
        
        echo "The car model is, " . $this -> model ;
        
    }
}

$bmw = new Car();
echo $bmw -> setModel("Audi") -> getModel();
*/

/*
class Car {
    
    private $model;
    
    public function __construct($model = null)
    {
        if($model)
        {
        $this -> model = $model; 
        }
    }
    
    public function getModel(){
        
        echo "The model is ". $this -> model;
    }
}

$bmw = new Car("Mercedez");
echo $bmw -> getModel();
*/
/*
class User{
    
    private $fname;
    private $lname;
    
    public function __construct($fname = null, $lname = null){
        
        if($fname && $lname){
            
            $this -> fname = $fname;
            $this -> lname = $lname;
        }
     
    }
    
    public function getFullName(){
        
        echo "The full name is: " . $this -> fname . " " . $this -> lname . ".";
        
    }  
}

$user1 = new User("John", "Doe");
echo $user1 -> getFullName();
*/

interface Shape {
    
    public function calcArea();
}

class Circle implements Shape{
    
    private $radius;

    public function __construct($radius){
        
        $this -> radius = $radius;
        return $this;
    }
    
    public function calcArea(){
        
        return $this -> radius * $this -> radius * pi();
    }
}

class Rectangle implements Shape{
    
    private $length;
    private $width;
    
    public function __construct($length, $width){
        $this -> length = $length;
        $this -> width = $width;
        return $this;
    }
    
    public function calcArea(){
        
        return $this -> width * $this -> length;
    }
}

$circle1 = new Circle(4);
$rectangle1 = new Rectangle(4, 5);
echo $circle1 -> calcArea() . "</br>";
echo $rectangle1 -> calcArea();
?>