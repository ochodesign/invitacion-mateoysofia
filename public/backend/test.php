<?php
require_once 'config.php';

error_log("=== INICIO TEST DE CONEXIÓN ===");

try {
    // 1. Probar conexión
    $conexion = conectarDB();
    if (!$conexion) {
        throw new Exception("No se pudo establecer la conexión");
    }
    error_log("✓ Conexión exitosa");

    // 2. Crear tabla si no existe (incluye campo invitados)
    $sql_crear_tabla = "CREATE TABLE IF NOT EXISTS confirmaciones (
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
    error_log("✓ Tabla verificada/creada correctamente");

    // 3. Insertar dato de prueba
    $sql_insertar = "INSERT INTO confirmaciones (nombre, whatsapp, asistencia, mensaje, musica, invitados) 
                     VALUES ('Test Usuario', '11 1234 5678', 'si', 'Mensaje de prueba', 'La Cumbita', 'María (esposa), Juan (hijo)')";
    
    if (!$conexion->query($sql_insertar)) {
        throw new Exception("Error insertando dato de prueba: " . $conexion->error);
    }
    error_log("✓ Dato de prueba insertado correctamente");

    // 4. Leer dato insertado
    $sql_leer = "SELECT * FROM confirmaciones ORDER BY id DESC LIMIT 1";
    $resultado = $conexion->query($sql_leer);
    
    if (!$resultado) {
        throw new Exception("Error leyendo datos: " . $conexion->error);
    }
    
    $fila = $resultado->fetch_assoc();
    error_log("✓ Dato leído correctamente: " . print_r($fila, true));

    // Todo OK
    echo json_encode([
        'success' => true,
        'message' => 'Todas las pruebas completadas exitosamente',
        'ultimo_registro' => $fila
    ]);

} catch (Exception $e) {
    error_log("✗ ERROR: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} finally {
    if (isset($conexion)) {
        $conexion->close();
    }
}

error_log("=== FIN TEST DE CONEXIÓN ===");
?>
