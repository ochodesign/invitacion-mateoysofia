<?php
// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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
