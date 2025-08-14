<?php
// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        throw new Exception('Error de conexión: ' . $conn->connect_error);
    }

    // Recibir datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $asistencia = $_POST['asistencia'] ?? '';
    $wsp = $_POST['wsp'] ?? '';
    $musica = $_POST['musica'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';
    $invitados = isset($_POST['invitados']) ? $_POST['invitados'] : '';

    // Validar campos requeridos
    if (empty($nombre) || empty($asistencia)) {
        throw new Exception('Faltan campos obligatorios');
    }

    // Insertar en la base de datos
    $sql = "INSERT INTO confirmaciones (nombre, asistencia, invitados, wsp, musica, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception('Error en la preparación de la consulta: ' . $conn->error);
    }
    
    $stmt->bind_param('ssssss', $nombre, $asistencia, $invitados, $wsp, $musica, $mensaje);

    if ($stmt->execute()) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Confirmación guardada exitosamente']);
    } else {
        throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
