<?php
// Configuración de la base de datos
$host = 'localhost';
$user = 'u506439444_juliyari';
$pass = 'Julieta8a';
$db = 'u506439444_bd_juliyari';

// Conexión a la base de datos
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión']);
    exit;
}

// Obtener confirmaciones
$sql = "SELECT id, nombre, asistencia, wsp, musica, mensaje, invitados, fecha FROM confirmaciones ORDER BY fecha DESC";
$result = $conn->query($sql);
$datos = [];
while ($row = $result->fetch_assoc()) {
    $row['invitados'] = json_decode($row['invitados'], true);
    $datos[] = $row;
}
$conn->close();

header('Content-Type: application/json');
echo json_encode($datos);
