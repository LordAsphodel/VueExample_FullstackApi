<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты 
include_once '../config/database.php';
$table_name = 'Reviews';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// выбираем все записи 
$query = "SELECT * FROM " . $table_name;

// подготовка запроса 
$stmt = $db->prepare($query);

// выполняем запрос 
$stmt->execute();

$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num > 0) {

    // массив отзывов 
    $reviews_arr = array();
    $reviews_arr["records"] = array();

    // получаем содержимое нашей таблицы 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        // извлекаем строку 
        extract($row);

        $review_item = array(
            "ID" => $row["ID"],
            "name" => $row["Name"],
            "review" => $row["Review"],
            "rating" => $row["Rating"],
            "recommend" => $row["Recommend"]
        );
        
        array_push($reviews_arr["records"], $review_item);
    }

    // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($reviews_arr);
} else {

    // установим код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщаем пользователю, что Отзывы не найдены 
    echo json_encode(array("message" => "Отзывы не найдены."), JSON_UNESCAPED_UNICODE);
}