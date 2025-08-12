<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Incluir configuración segura de la base de datos
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Sanitizar y obtener datos
$honeypot = isset($_POST['hp']) ? trim($_POST['hp']) : '';
$nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
$mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

// Si el honeypot tiene contenido, es spam
if (!empty($honeypot)) {
    echo json_encode(['success' => false, 'message' => 'Error de validación.']);
    exit;
}

if (!$nombre || !$email || !$mensaje) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios']);
    exit;
}

// Conexión a la base de datos
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    error_log('DB Connection Error: ' . $conn->connect_error);
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO contactos (nombre, email, telefono, mensaje, fecha) VALUES (?, ?, ?, ?, NOW())");
if (!$stmt) {
    error_log('Prepare failed: ' . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta']);
    $conn->close();
    exit;
}
$stmt->bind_param("ssss", $nombre, $email, $telefono, $mensaje);


if ($stmt->execute()) {
    // Enviar email a ochodesignweb@gmail.com
    $to = 'ochodesignweb@gmail.com';
    $subject = 'Nuevo mensaje de contacto desde la web';
    $body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";
    $headers = "From: noreply@" . $_SERVER['SERVER_NAME'] . "\r\n" .
               "Reply-To: $email\r\n" .
               "Content-Type: text/plain; charset=UTF-8";
    @mail($to, $subject, $body, $headers);
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado correctamente!']);
} else {
    error_log('Execute failed: ' . $stmt->error);
    echo json_encode([
        'success' => false,
        'message' => 'Error al guardar en la base de datos: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
