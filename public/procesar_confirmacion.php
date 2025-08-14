<?php
// Archivo de procesamiento alternativo usando método tradicional
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Configuración de la base de datos
    $host = 'localhost';
    $user = 'u506439444_admin_jul';
    $pass = 'ochodesign2024';
    $db = 'u506439444_bd_juliyari';
    
    try {
        $conn = new mysqli($host, $user, $pass, $db);
        if ($conn->connect_error) {
            throw new Exception('Error de conexión: ' . $conn->connect_error);
        }

        // Recibir datos del formulario
        $nombre = $_POST['nombre'] ?? '';
        $asistencia = $_POST['asistencia'] ?? '';
        $wsp = $_POST['wsp'] ?? '';
        $musica = $_POST['musica'] ?? '';
        $mensaje = $_POST['mensaje'] ?? '';
        $invitados = isset($_POST['invitados']) ? $_POST['invitados'] : '';

        // Validar campos requeridos
        if (empty($nombre) || empty($asistencia)) {
            throw new Exception('Faltan campos obligatorios');
        }

        // Insertar en la base de datos
        $sql = "INSERT INTO confirmaciones (nombre, asistencia, invitados, wsp, musica, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            throw new Exception('Error en la preparación de la consulta: ' . $conn->error);
        }
        
        $stmt->bind_param('ssssss', $nombre, $asistencia, $invitados, $wsp, $musica, $mensaje);

        if ($stmt->execute()) {
            // Redirigir con mensaje de éxito
            header('Location: /?success=1');
            exit();
        } else {
            throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
        }

        $stmt->close();
        $conn->close();

    } catch (Exception $e) {
        // Redirigir con mensaje de error
        header('Location: /?error=' . urlencode($e->getMessage()));
        exit();
    }
}
?>
