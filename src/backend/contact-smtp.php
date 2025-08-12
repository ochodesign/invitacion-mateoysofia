<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

if (!empty($honeypot)) {
    echo json_encode(['success' => false, 'message' => 'Error de validación.']);
    exit;
}
if (!$nombre || !$email || !$mensaje) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios']);
    exit;
}

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
    // Envío usando SMTP de Hostinger
    $to = 'ochodesignweb@gmail.com';
    $subject = 'Nuevo mensaje de contacto desde la web';
    $body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";
    
    // Headers para SMTP
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Return-Path: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Configurar sendmail para usar SMTP de Hostinger
    ini_set('SMTP', 'mail.hostinger.com');
    ini_set('smtp_port', 587);
    ini_set('sendmail_from', 'noreply@' . $_SERVER['HTTP_HOST']);
    
    if (mail($to, $subject, $body, $headers)) {
        error_log('Email sent successfully to: ' . $to);
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado y guardado correctamente!']);
    } else {
        error_log('Failed to send email to: ' . $to);
        echo json_encode(['success' => true, 'message' => '¡Mensaje guardado! (Email pendiente)']);
    }
} else {
    error_log('Execute failed: ' . $stmt->error);
    echo json_encode([
        'success' => false,
        'message' => 'Error al guardar en la base de datos: ' . $stmt->error
    ]);
}
$stmt->close();
$conn->close();
