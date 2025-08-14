<?php
// Headers CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuración de la base de datos
$host = 'localhost';
$user = 'u506439444_juliyari';
$pass = 'Julieta8a';
$db = 'u506439444_bd_juliyari';

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_error) {
        throw new Exception('Error de conexión a la base de datos');
    }

    // Recibir datos JSON
    $input = json_decode(file_get_contents('php://input'), true);
    $id = $input['id'] ?? '';

    if (!$id) {
        throw new Exception('ID del invitado es requerido');
    }

    // Verificar que el invitado existe antes de eliminar
    $checkStmt = $conn->prepare("SELECT nombre FROM confirmaciones WHERE id = ?");
    $checkStmt->bind_param('i', $id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('El invitado no existe o ya fue eliminado');
    }
    
    $invitado = $result->fetch_assoc();
    $checkStmt->close();

    // Eliminar el invitado
    $deleteStmt = $conn->prepare("DELETE FROM confirmaciones WHERE id = ?");
    $deleteStmt->bind_param('i', $id);
    
    if ($deleteStmt->execute()) {
        if ($deleteStmt->affected_rows > 0) {
            echo json_encode([
                'success' => true, 
                'message' => "Invitado '{$invitado['nombre']}' eliminado exitosamente"
            ]);
        } else {
            throw new Exception('No se pudo eliminar el invitado');
        }
    } else {
        throw new Exception('Error al ejecutar la eliminación');
    }
    
    $deleteStmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
