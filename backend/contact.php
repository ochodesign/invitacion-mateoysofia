<?php
// Simple handler para formulario de contacto
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    header('Content-Type: application/json');
    $nombre = htmlspecialchars(trim($_POST["nombre"] ?? ''));
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST["telefono"] ?? ''));
    $mensaje = htmlspecialchars(trim($_POST["mensaje"] ?? ''));

    $to = "chodesignweb@gmail.com";
    $subject = "Nuevo mensaje de contacto";
    $body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(["success" => true, "message" => "Mensaje enviado correctamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al enviar el mensaje."]);
    }
    exit;
}
?>
