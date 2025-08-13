<?php
// Configuración de la base de datos
$host = 'localhost';

$db = 'u506439444_bd_juliyari';
$user = 'u506439444_juliyari'; // Reemplaza por tu usuario
$pass = 'Julieta8a'; // Contraseña actualizada

// Conexión
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}

// Recibir datos del formulario
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$cantidad = $_POST['cantidad'] ?? 1;
$wsp = $_POST['wsp'] ?? '';
$musica = $_POST['musica'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';

// Insertar en la base de datos
$sql = "INSERT INTO confirmaciones (nombre, email, cantidad, wsp, musica, mensaje) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssisss', $nombre, $email, $cantidad, $wsp, $musica, $mensaje);

if ($stmt->execute()) {
    echo 'Confirmación guardada correctamente.';
} else {
    echo 'Error al guardar la confirmación: ' . $stmt->error;
}

$stmt->close();
$conn->close();
?>
