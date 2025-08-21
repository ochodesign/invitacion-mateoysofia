<?php
header('Content-Type: application/json');
$host = 'srv1940.hstgr.io';
$user = 'u506439444_mateoysofi';
$pass = 'Mateoysofi11';
$db = 'u506439444_bd_mateoysofi';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $conn->connect_error]);
} else {
    echo json_encode(['status' => 'success', 'message' => 'Conexión exitosa a la base de datos']);
}
$conn->close();
?>
