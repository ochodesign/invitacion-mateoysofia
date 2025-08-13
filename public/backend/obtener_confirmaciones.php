<?php
require_once 'config.php';

// Verificar que sea una solicitud GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Conectar a la base de datos
$conexion = conectarDB();
if (!$conexion) {
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit();
}

try {
    // Preparar la consulta SQL
    $sql = "SELECT * FROM confirmaciones ORDER BY fecha_registro DESC";
    $resultado = $conexion->query($sql);

    if (!$resultado) {
        throw new Exception("Error en la consulta: " . $conexion->error);
    }

    // Obtener todos los resultados
    $confirmaciones = [];
    while ($fila = $resultado->fetch_assoc()) {
        $confirmaciones[] = $fila;
    }

    // Devolver los resultados
    echo json_encode([
        'success' => true,
        'data' => $confirmaciones
    ]);

} catch (Exception $e) {
    error_log("Error en obtener_confirmaciones.php: " . $e->getMessage());
    echo json_encode([
        'error' => 'Error al obtener las confirmaciones',
        'details' => $e->getMessage()
    ]);
} finally {
    $conexion->close();
}
?>
