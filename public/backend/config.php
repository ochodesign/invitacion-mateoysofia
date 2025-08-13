<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'u506439444_bd_juliyari');
define('DB_USER', 'u506439444_juliyari');
define('DB_PASS', 'Julieta8a');

// Configuración de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Función para conectar a la base de datos
function conectarDB() {
    try {
        $conexion = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conexion->connect_error) {
            throw new Exception("Error de conexión: " . $conexion->connect_error);
        }
        
        $conexion->set_charset("utf8");
        return $conexion;
        
    } catch (Exception $e) {
        error_log("Error de conexión: " . $e->getMessage());
        return false;
    }
}
?>
