<?php
// Test de conexión y datos
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h2>Test de Conexión y Datos</h2>";

// Probar con las credenciales unificadas
$host = 'localhost';
$user = 'u506439444_mateoysofi';
$pass = 'Julieta8a';
$db = 'u506439444_bd_juliyari';

echo "<h3>1. Probando conexión unificada:</h3>";
$conn1 = new mysqli($host, $user, $pass, $db);
if ($conn1->connect_error) {
    echo "❌ Error: " . $conn1->connect_error . "<br>";
} else {
    echo "✅ Conectado con credenciales unificadas<br>";
    
    // Contar registros
    $result = $conn1->query("SELECT COUNT(*) as total FROM confirmaciones");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "📊 Registros en tabla confirmaciones: " . $row['total'] . "<br>";
        
        // Mostrar últimos 3 registros
        $result2 = $conn1->query("SELECT nombre, fecha FROM confirmaciones ORDER BY fecha DESC LIMIT 3");
        if ($result2 && $result2->num_rows > 0) {
            echo "<strong>Últimas confirmaciones:</strong><br>";
            while ($row2 = $result2->fetch_assoc()) {
                echo "- " . $row2['nombre'] . " (" . $row2['fecha'] . ")<br>";
            }
        } else {
            echo "No hay registros en la tabla<br>";
        }
    }
    $conn1->close();
}

// Probar con credenciales anteriores del admin
echo "<h3>2. Probando credenciales anteriores del admin:</h3>";
$host2 = 'localhost';
$user2 = 'u506439444_admin_jul';
$pass2 = 'ochodesign2024';
$db2 = 'u506439444_bd_juliyari';

$conn2 = new mysqli($host2, $user2, $pass2, $db2);
if ($conn2->connect_error) {
    echo "❌ Error: " . $conn2->connect_error . "<br>";
} else {
    echo "✅ Conectado con credenciales anteriores del admin<br>";
    
    // Contar registros
    $result = $conn2->query("SELECT COUNT(*) as total FROM confirmaciones");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "📊 Registros en tabla confirmaciones: " . $row['total'] . "<br>";
        
        // Mostrar últimos 3 registros
        $result2 = $conn2->query("SELECT nombre, fecha FROM confirmaciones ORDER BY fecha DESC LIMIT 3");
        if ($result2 && $result2->num_rows > 0) {
            echo "<strong>Últimas confirmaciones:</strong><br>";
            while ($row2 = $result2->fetch_assoc()) {
                echo "- " . $row2['nombre'] . " (" . $row2['fecha'] . ")<br>";
            }
        } else {
            echo "No hay registros en la tabla<br>";
        }
    }
    $conn2->close();
}
?>
