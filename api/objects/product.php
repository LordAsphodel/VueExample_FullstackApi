<?php
class Product
{

    // подключение к базе данных и таблице 'products' 
    private $conn;
    private $table_name = "TestTable";

    // свойства объекта 
    public $id;
    public $name;
    public $quantity;
    public $onsale;
    public $price;

    // конструктор для соединения с базой данных 
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // метод read() - получение товаров 
    function read()
    {

        // выбираем все записи 
        $query = "SELECT * FROM " . $this->table_name;

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }
}
