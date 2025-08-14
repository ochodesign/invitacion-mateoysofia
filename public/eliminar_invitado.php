<?php
// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos para www.julietayariel.com
$host = 'localhost';
$user = 'u506439444_admin_jul';
$pass = 'ochodesign2024';
$db = 'u506439444_bd_juliyari';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión']);
    exit;
}

// Recibir ID del invitado
$id = $_POST['id'] ?? '';

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID es requerido']);
    exit;
}

// Eliminar de la base de datos
$sql = "DELETE FROM confirmaciones WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    // Notificar al servidor WebSocket
    $msg = json_encode(['action' => 'delete', 'id' => $id]);
    $socket = stream_socket_client("tcp://127.0.0.1:8080", $errno, $errstr);
    if ($socket) {
        fwrite($socket, $msg . "\n");
        fclose($socket);
    }

    echo json_encode(['success' => 'Invitado eliminado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar el invitado']);
}

$stmt->close();
$conn->close();
?>
