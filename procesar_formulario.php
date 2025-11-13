<?php
// Establecer un encabezado para indicar que la respuesta es HTML con codificación UTF-8
header('Content-Type: text/html; charset=utf-8');

// Incluir las dependencias necesarias
require_once 'supabase_config.php';
require_once 'api/GestorContactos.php';

// Variable para almacenar el resultado de la operación con la base de datos
$guardado_con_exito = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Limpiar y capturar los datos del formulario
    $nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : 'Invitado';
    $correo = isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : 'no proporcionado';
    $mensaje = isset($_POST['mensaje']) ? htmlspecialchars($_POST['mensaje']) : 'ninguno';
    $celular = isset($_POST['celular']) && !empty($_POST['celular']) ? htmlspecialchars($_POST['celular']) : null;

    // Intentar guardar los datos en Supabase
    $guardado_con_exito = GestorContactos::guardarMensaje($supabase_url, $supabase_key, $nombre, $correo, $celular, $mensaje);

    // Incluir los estilos para una apariencia consistente
    echo '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">';
    echo '<link rel="stylesheet" href="styles.css">';

    // Mostrar la página de respuesta al usuario
    echo '<div class="container" style="padding-top: 4rem;">';
    echo '  <article class="card" style="text-align: center;">';
    echo "    <h1>¡Gracias por contactarme, {$nombre}!</h1>";
    echo "    <p>He recibido tu mensaje y te responderé pronto al correo: <strong>{$correo}</strong>.</p>";
    
    if ($guardado_con_exito) {
        echo '<p style="color: green; font-weight: bold;">Tu mensaje ha sido guardado correctamente en la base de datos.</p>';
    } else {
        echo '<p style="color: red; font-weight: bold;">Hubo un error al guardar tu mensaje en la base de datos.</p>';
    }

    echo '    <hr style="border: 1px solid #eee; margin: 2rem 0;">';
    echo '    <h3>Resumen de la información recibida:</h3>';
    echo "    <p><strong>Mensaje:</strong> {$mensaje}</p>";
    $celular_display = $celular ? $celular : 'no proporcionado';
    echo "    <p><strong>Celular:</strong> {$celular_display}</p>";
    echo '    <br>';

    // --- BLOQUE CORREGIDO ---
    // Se reescribe usando concatenación para máxima compatibilidad y evitar errores de sintaxis.
    echo '    <div style="background-color: #f5f5f5; padding: 1rem; border-radius: 8px; text-align: left; font-size: 0.9rem; color: #555;">';
    echo '      <p><strong>Detalles de la solicitud:</strong></p>';
    echo '      <ul>';
    echo '        <li><strong>Método:</strong> ' . $_SERVER['REQUEST_METHOD'] . '</li>';
    echo '        <li><strong>IP del cliente:</strong> ' . $_SERVER['REMOTE_ADDR'] . '</li>';
    echo '        <li><strong>Software del servidor:</strong> ' . $_SERVER['SERVER_SOFTWARE'] . '</li>';
    echo '      </ul>';
    echo '    </div>';
    // --- FIN DE LA CORRECCIÓN ---

    echo '    <br>';
    echo '    <a class="cv-download" href="javascript:history.back()">Volver al formulario</a>';
    echo '  </article>';
    echo '</div>';

} else {
    // Si se intenta acceder al script directamente, muestra un error
    echo "<h1>Acceso no permitido</h1>";
    echo "<p>Por favor, envía el formulario desde la página de contacto.</p>";
}
?>