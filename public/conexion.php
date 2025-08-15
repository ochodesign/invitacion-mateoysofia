<?php
// Archivo único de conexión para todos los scripts
$host = 'localhost';
$user = 'u506439444_juliyari';
$pass = 'Julieta8a';
$db = 'u506439444_bd_juliyari';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Error de conexión a la base de datos: ' . $conn->connect_error);
}
?>
