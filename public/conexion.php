<?php

$host = 'localhost';
$user = 'u506439444_mateoysofi';
$pass = 'Armani11!';
$db = 'u506439444_bd_mateoysofi';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos: ' . $conn->connect_error]);
    exit;
}
?>
