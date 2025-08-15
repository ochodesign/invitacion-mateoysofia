<?php
// Test de conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode(['timestamp' => date('Y-m-d H:i:s'), 'message' => 'Iniciando test...']) . "\n";

    require_once 'conexion.php';

try {
    echo json_encode(['step' => 'Conectando a BD...']) . "\n";
    
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        throw new Exception('Error de conexión: ' . $conn->connect_error);
    }
    
    echo json_encode(['step' => 'Conexión exitosa!']) . "\n";
    
    // Verificar tabla
    $result = $conn->query("SHOW TABLES LIKE 'confirmaciones'");
    if ($result->num_rows > 0) {
        echo json_encode(['step' => 'Tabla confirmaciones existe']) . "\n";
        
        // Describir tabla
        $result = $conn->query("DESCRIBE confirmaciones");
        $columns = [];
        while ($row = $result->fetch_assoc()) {
            $columns[] = $row['Field'];
        }
        echo json_encode(['step' => 'Columnas disponibles', 'columns' => $columns]) . "\n";
        
    } else {
        echo json_encode(['step' => 'Tabla confirmaciones NO existe']) . "\n";
    }
    
    // Test de inserción
    $sql = "INSERT INTO confirmaciones (nombre, asistencia, invitados, wsp, musica, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception('Error preparando consulta: ' . $conn->error);
    }
    
    $test_data = [
        'TEST Usuario',
        'Asistiré',
        '[]',
        '+5491112345678',
        'Cumbia',
        'Test mensaje',
    ];
    
    $stmt->bind_param('ssssss', ...$test_data);
    
    if ($stmt->execute()) {
        echo json_encode(['step' => 'Test de inserción exitoso', 'id' => $conn->insert_id]) . "\n";
        
        // Eliminar el registro de test
        $conn->query("DELETE FROM confirmaciones WHERE id = " . $conn->insert_id);
        echo json_encode(['step' => 'Registro de test eliminado']) . "\n";
    } else {
        throw new Exception('Error en inserción: ' . $stmt->error);
    }
    
    $stmt->close();
    $conn->close();
    
    echo json_encode(['status' => 'success', 'message' => 'Todos los tests pasaron correctamente!']) . "\n";
    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]) . "\n";
}
?>
