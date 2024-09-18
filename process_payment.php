<?php
// Configuración del correo
$to = "info@gamehub.com"; // Asegúrate de cambiar esto a tu dirección de correo real
$subject = "Información de Pago Recibida";
$headers = "From: no-reply@gamehub.com\r\n";
$headers .= "Reply-To: no-reply@gamehub.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Verificar si los datos están presentes
if (isset($_POST['account_holder']) && isset($_POST['account_number']) && isset($_POST['bank']) && isset($_POST['amount'])) {
    $account_holder = htmlspecialchars($_POST['account_holder']);
    $account_number = htmlspecialchars($_POST['account_number']);
    $bank = htmlspecialchars($_POST['bank']);
    $amount = htmlspecialchars($_POST['amount']);

    // Crear el mensaje
    $message = "Información de Pago Recibida:\n\n";
    $message .= "Nombre del Titular de la Cuenta: " . $account_holder . "\n";
    $message .= "Número de Cuenta: " . $account_number . "\n";
    $message .= "Banco: " . $bank . "\n";
    $message .= "Monto: " . $amount . "\n";

    // Enviar el correo
    if (mail($to, $subject, $message, $headers)) {
        // Redirigir a una página de agradecimiento
        header("Location: thank-you.html");
        exit();
    } else {
        echo "Hubo un problema al enviar la información. Inténtalo de nuevo más tarde.";
    }
} else {
    echo "Datos del formulario no están completos.";
}
?>
