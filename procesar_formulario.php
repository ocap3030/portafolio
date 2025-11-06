<?php
// Establecer un encabezado para indicar que la respuesta es HTML con codificación UTF-8
header('Content-Type: text/html; charset=utf-8');

// 1. Usar $_SERVER para verificar que la solicitud se hizo con el método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // 2. Usar $_POST para acceder a los datos enviados desde el formulario
    // Se usa htmlspecialchars() para limpiar los datos y prevenir ataques XSS
    $nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : 'Invitado';
    $correo = isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : 'no proporcionado';
    $mensaje = isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : 'ninguno';
    // Campo opcional: celular
    $celular = isset($_POST['celular']) && !empty($_POST['celular']) ? htmlspecialchars($_POST['celular']) : 'no proporcionado';

    // 3. Incluir el mismo estilo del portafolio para una apariencia consistente
    echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="styles.css">';

    // 4. Mostrar una respuesta personalizada en el servidor
    echo '<div class="container" style="padding-top: 4rem;">';
    echo '  <article class="card" style="text-align: center;">';
    echo "    <h1>¡Gracias por contactarme, {$nombre}!</h1>";
    echo "    <p>He recibido tu mensaje y te responderé pronto al correo: <strong>{$correo}</strong>.</p>";
    echo '    <hr style="border: 1px solid #eee; margin: 2rem 0;">';
    echo '    <h3>Resumen de la información recibida:</h3>';
    echo "    <p><strong>Mensaje:</strong> {$mensaje}</p>";
    echo "    <p><strong>Celular:</strong> {$celular}</p>";
    echo '    <br>';

    // 5. Demostración adicional del uso de la superglobal $_SERVER
    echo '    <div style="background-color: #f5f5f5; padding: 1rem; border-radius: 8px; text-align: left; font-size: 0.9rem; color: #555;">';
    echo '      <p><strong>Detalles de la solicitud (demostración de <code>$_SERVER</code>):</strong></p>
';
    echo "      <ul><li><strong>Método de solicitud:</strong> {$_SERVER['REQUEST_METHOD']}</li>";
    echo "      <li><strong>IP del cliente:</strong> {$_SERVER['REMOTE_ADDR']}</li>";
    echo "      <li><strong>Software del servidor:</strong> {$_SERVER['SERVER_SOFTWARE']}</li></ul>";
    echo '    </div>';
    echo '    <br>';
    echo '    <a class="cv-download" href="javascript:history.back()">Volver al formulario</a>';
    echo '  </article>';
    echo '</div>';

} else {
    // Si alguien intenta acceder al script sin enviar datos, muestra un error
    echo "<h1>Acceso no permitido</h1>";
    echo "<p>Por favor, envía el formulario desde la página de contacto.</p>";
}
?>
