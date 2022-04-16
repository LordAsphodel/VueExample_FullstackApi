<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

try
{
    $user = 'testuser';
	$pass = 'testuserpass';
    $db = new PDO('mysql:host=localhost;dbname=testbase',$user, $pass);
}
catch (PDOException $e)
{
    echo $e->getMessage();
}

$id = trim($_REQUEST['ID']);

if(!filter_var($id, FILTER_VALIDATE_INT)) die();

$q = $db->prepare('SELECT * FROM TestTable WHERE ID = ? LIMIT 1');
$q->execute(array($id));
$product = $q->fetch();


if($product['Sale'] == 1)
{
    $onsale = 'true';
}
if($product['Sale'] == 0)
{
    $onsale = 'false';
}

 // устанавливаем код ответа - 200 OK 
    http_response_code(200);

//echo "[";
//echo "{Name: ",$product['Name'],", Quantity: ",$product['Quantity'],", Onasale: ",$onsale,", Price: ",$product['Price'],"}";
//echo "]" ; 

    echo json_encode($product)
?>
