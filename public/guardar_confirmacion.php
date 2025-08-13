<?php
// Configuración de la base de datos

$host = 'localhost';
$user = 'u506439444_juliyari';
$pass = 'Julieta8a';
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
    echo 'ok';
} else {
    echo 'error';
}

$stmt->close();
$conn->close();
?>
