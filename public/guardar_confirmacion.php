<?php
// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
    die('Error de conexión: ' . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'] ?? '';
$asistencia = $_POST['asistencia'] ?? '';
$wsp = $_POST['wsp'] ?? '';
$musica = $_POST['musica'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';
$invitados = isset($_POST['invitados']) ? json_encode($_POST['invitados']) : '';

// Insertar en la base de datos
$sql = "INSERT INTO confirmaciones (nombre, asistencia, invitados, wsp, musica, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssss', $nombre, $asistencia, $invitados, $wsp, $musica, $mensaje);

if ($stmt->execute()) {
    // Notificar al servidor WebSocket
    $msg = json_encode(['action' => 'add', 'data' => [
        'nombre' => $nombre,
        'asistencia' => $asistencia,
        'invitados' => json_decode($invitados),
        'wsp' => $wsp,
        'musica' => $musica,
        'mensaje' => $mensaje,
        'fecha' => date('Y-m-d H:i:s')
    ]]);
    $socket = stream_socket_client("tcp://127.0.0.1:8080", $errno, $errstr);
    if ($socket) {
        fwrite($socket, $msg . "\n");
        fclose($socket);
    }
    echo 'ok';
} else {
    echo 'error';
}

$stmt->close();
$conn->close();
?>
