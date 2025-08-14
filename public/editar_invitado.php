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

// Configuración de la base de datos
$host = 'localhost';
$user = 'u506439444_juliyari';
$pass = 'Julieta8a';
$db = 'u506439444_bd_juliyari';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión']);
    exit;
}

// Recibir datos del formulario
$id = $_POST['id'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$asistencia = $_POST['asistencia'] ?? '';
$wsp = $_POST['wsp'] ?? '';
$musica = $_POST['musica'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';
$invitados = isset($_POST['invitados']) ? json_encode($_POST['invitados']) : '';

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID es requerido']);
    exit;
}

// Actualizar en la base de datos
$sql = "UPDATE confirmaciones SET nombre = ?, asistencia = ?, wsp = ?, musica = ?, mensaje = ?, invitados = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssssi', $nombre, $asistencia, $wsp, $musica, $mensaje, $invitados, $id);

if ($stmt->execute()) {
    // Notificar al servidor WebSocket
    $msg = json_encode(['action' => 'update', 'data' => [
        'id' => $id,
        'nombre' => $nombre,
        'asistencia' => $asistencia,
        'invitados' => json_decode($invitados),
        'wsp' => $wsp,
        'musica' => $musica,
        'mensaje' => $mensaje
    ]]);
    $socket = stream_socket_client("tcp://127.0.0.1:8080", $errno, $errstr);
    if ($socket) {
        fwrite($socket, $msg . "\n");
        fclose($socket);
    }
    echo json_encode(['success' => 'Invitado actualizado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al actualizar el invitado']);
}

$stmt->close();
$conn->close();
?>
