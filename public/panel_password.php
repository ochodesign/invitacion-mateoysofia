<?php
// CONFIGURACIÓN - Credenciales originales del admin
$host = 'localhost';
$user = 'u506439444_admin_jul';
$pass = 'ochodesign2024';
$db = 'u506439444_bd_juliyari';

$table   = 'confirmaciones';
$fields  = ['id', 'nombre', 'asistencia', 'invitados', 'wsp', 'musica', 'mensaje', 'fecha'];
$panel_password_hash = password_hash('Julieta8a', PASSWORD_DEFAULT); // Contraseña: Julieta8a

session_start();

// Autenticación
if (isset($_POST['password'])) {
    if (password_verify($_POST['password'], $panel_password_hash)) {
        $_SESSION['panel_auth'] = true;
    } else {
        $error = "Contraseña incorrecta";
    }
}

if (!isset($_SESSION['panel_auth'])):
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Protegido</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; }
        .login-box { max-width: 350px; margin: 80px auto; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
        input[type=password], button { width: 100%; padding: 10px; margin: 8px 0; }
        .error { color: red; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>Acceso al Panel</h2>
        <?php if (!empty($error)) echo "<div class='error'>$error</div>"; ?>
        <form method="post">
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Ingresar</button>
        </form>
    </div>
</body>
</html>
<?php
exit;
endif;

// Consulta segura a la base de datos
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('<div style="color:red">Error de conexión: ' . htmlspecialchars($conn->connect_error) . '</div>');
}

$sql = "SELECT " . implode(',', $fields) . " FROM `$table` ORDER BY fecha DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Datos</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; }
        .container { max-width: 900px; margin: 30px auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px #0001; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px 6px; border: 1px solid #ddd; text-align: left; }
        th { background: #eee; }
        tr:nth-child(even) { background: #f2f2f2; }
        @media (max-width: 600px) {
            .container { padding: 5px; }
            table, th, td { font-size: 12px; }
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Panel de Datos</h1>
    <table>
        <tr>
            <?php foreach ($fields as $f): ?>
                <th><?= htmlspecialchars($f) ?></th>
            <?php endforeach; ?>
        </tr>
        <?php if ($result && $result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <?php foreach ($fields as $f): ?>
                        <td><?= htmlspecialchars($row[$f]) ?></td>
                    <?php endforeach; ?>
                </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr><td colspan="<?= count($fields) ?>">No hay registros.</td></tr>
        <?php endif; ?>
    </table>
</div>
</body>
</html>
<?php
$conn->close();
?>
