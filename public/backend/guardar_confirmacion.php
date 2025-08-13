<?php
require_once 'config.php';

// Si es una solicitud OPTIONS, terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener el contenido JSON enviado
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

// Verificar si se pudo decodificar el JSON
if ($datos === null) {
    error_log("Error decodificando JSON: " . json_last_error_msg());
    echo json_encode(['error' => 'Datos inválidos']);
    exit();
}

// Registrar los datos recibidos
error_log("Datos recibidos: " . print_r($datos, true));

// Conectar a la base de datos
$conexion = conectarDB();
if (!$conexion) {
    echo json_encode(['error' => 'Error de conexión a la base de datos']);
    exit();
}

try {
    // Verificar si la tabla existe y crearla si no existe
    $sql_verificar_tabla = "SHOW TABLES LIKE 'confirmaciones'";
    $resultado_tabla = $conexion->query($sql_verificar_tabla);
    
    if ($resultado_tabla->num_rows == 0) {
        // Crear la tabla si no existe
        $sql_crear_tabla = "CREATE TABLE confirmaciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            whatsapp VARCHAR(50) NOT NULL,
            asistencia VARCHAR(10) NOT NULL,
            mensaje TEXT,
            musica TEXT,
            invitados TEXT,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
        
        if (!$conexion->query($sql_crear_tabla)) {
            throw new Exception("Error creando tabla: " . $conexion->error);
        }
        error_log("Tabla 'confirmaciones' creada automáticamente");
    }

    // Preparar la consulta SQL (incluye invitados)
    $sql = "INSERT INTO confirmaciones (nombre, whatsapp, asistencia, mensaje, musica, invitados) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    if (!$stmt) {
        throw new Exception("Error preparando la consulta: " . $conexion->error);
    }

    // Vincular los parámetros
    $stmt->bind_param("ssssss", 
        $datos['nombre'],
        $datos['whatsapp'],
        $datos['asistira'],
        $datos['mensaje'] ?? '',
        $datos['musica'] ?? '',
        $datos['invitados'] ?? ''
    );

    // Ejecutar la consulta
    if (!$stmt->execute()) {
        throw new Exception("Error ejecutando la consulta: " . $stmt->error);
    }

    // Si todo salió bien
    echo json_encode([
        'success' => true,
        'message' => '¡Gracias por confirmar tu asistencia!'
    ]);

} catch (Exception $e) {
    error_log("Error en guardar_confirmacion.php: " . $e->getMessage());
    echo json_encode([
        'error' => 'Error al guardar la confirmación',
        'details' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    $conexion->close();
}
?>
