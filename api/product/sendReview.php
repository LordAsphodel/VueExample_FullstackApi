<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// получаем соединение с базой данных 
include_once '../config/database.php';

// создание объекта товара 
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();
$table_name = 'Reviews';

// получаем отправленные данные 
$data = json_decode(file_get_contents("php://input"));
 
// убеждаемся, что данные не пусты 
if (
    !empty($data->Name) &&
    !empty($data->Review) &&
    !empty($data->Rating) &&
    !empty($data->Recommend)
){

    $NAME = htmlspecialchars(strip_tags($data->Name));
    $REVIEW = htmlspecialchars(strip_tags($data->Review));
    $RATING = htmlspecialchars(strip_tags($data->Rating));
    $RECOMMEND = htmlspecialchars(strip_tags($data->Recommend));

    //if(!filter_var($RATING, FILTER_VALIDATE_INT)) die();
    //if(!filter_var($RECOMMEND, FILTER_VALIDATE_INT)) die();

    // запрос для вставки (создания) записей 
    $query = "INSERT INTO
    " . $table_name . "
    (ID, Name, Review, Rating, Recommend) VALUES (NULL,'"
    . $NAME . "', '" 
    . $REVIEW . "', '" 
    . $RATING . "', '" 
    . $RECOMMEND . "')";


    // подготовка запроса 
    $stmt = $db->prepare($query);

    // создание товара 
    if($stmt->execute()){

        // установим код ответа - 201 создано 
        http_response_code(201);

        // сообщим пользователю 
        echo json_encode(array("message" => "Товар был создан."), JSON_UNESCAPED_UNICODE);
    }

    // если не удается создать товар, сообщим пользователю 
    else {

        // установим код ответа - 503 сервис недоступен 
        http_response_code(503);

        // сообщим пользователю 
        echo json_encode(array("message" => "Невозможно создать товар."), JSON_UNESCAPED_UNICODE);
    }
}

// сообщим пользователю что данные неполные 
else {

    // установим код ответа - 400 неверный запрос 
    http_response_code(400);

    // сообщим пользователю 
    echo json_encode(array("message" => "Невозможно создать товар. Данные неполные."), JSON_UNESCAPED_UNICODE);
}
?>
