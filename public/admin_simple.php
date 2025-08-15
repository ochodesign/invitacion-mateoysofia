<?php
// Panel simple de confirmaciones
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'conexion.php';

session_start();

// Autenticación simple
if (!isset($_SESSION['admin_logged'])) {
    if (isset($_POST['password']) && $_POST['password'] === 'admin123') {
        $_SESSION['admin_logged'] = true;
    } else {
        ?>
        <!DOCTYPE html>
        <html>
        <head><title>Admin</title></head>
        <body>
            <h2>Acceso Admin</h2>
            <form method="post">
                <input type="password" name="password" placeholder="Contraseña" required>
                <button type="submit">Entrar</button>
            </form>
        </body>
        </html>
        <?php
        exit;
    }
}

// Conexión a BD
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Error: ' . $conn->connect_error);
}

// Obtener confirmaciones
$sql = "SELECT * FROM confirmaciones ORDER BY fecha DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Panel Admin - Confirmaciones</title>
    <style>
        body { font-family: Arial; margin: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f2f2f2; }
        .btn { padding: 5px 10px; color: white; background: #007cba; text-decoration: none; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>Panel de Confirmaciones</h1>
    <p><a href="?logout=1" class="btn">Cerrar Sesión</a></p>
    
    <?php if ($result && $result->num_rows > 0): ?>
        <h2>Total: <?= $result->num_rows ?> confirmaciones</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Asistencia</th>
                <th>WhatsApp</th>
                <th>Música</th>
                <th>Mensaje</th>
                <th>Fecha</th>
            </tr>
            <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= $row['id'] ?></td>
                <td><?= htmlspecialchars($row['nombre']) ?></td>
                <td><?= htmlspecialchars($row['asistencia']) ?></td>
                <td><?= htmlspecialchars($row['wsp']) ?></td>
                <td><?= htmlspecialchars($row['musica']) ?></td>
                <td><?= htmlspecialchars($row['mensaje']) ?></td>
                <td><?= $row['fecha'] ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <h2>No hay confirmaciones aún</h2>
    <?php endif; ?>
</body>
</html>
<?php
$conn->close();

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ?');
    exit;
}
?>
