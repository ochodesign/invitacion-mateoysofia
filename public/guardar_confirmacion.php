<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start();
// Headers para JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos para www.julietayariel.com
require_once 'conexion.php';

// Usar la conexión ya creada en conexion.php
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
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

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param('ssssss', $nombre, $asistencia, $invitados, $wsp, $musica, $mensaje);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Confirmación guardada exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al guardar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
ob_end_clean();
?>
