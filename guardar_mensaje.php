<?php
require_once 'Mensajes.php'; // Incluimos la clase que acabamos de crear

header('Content-Type: application/json');

// Solo procesamos si la petición es de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leemos los datos que nos envía el JavaScript
    $datos = json_decode(file_get_contents('php://input'), true);

    if (isset($datos['titulo']) && isset($datos['contenido'])) {
        // Creamos un nuevo objeto de nuestra clase Mensajes
        $gestorMensajes = new Mensajes();

        // Intentamos guardar el mensaje usando el método de la clase
        if ($gestorMensajes->guardarMensaje($datos['titulo'], $datos['contenido'])) {
            // Si todo fue bien, devolvemos un estado de éxito
            echo json_encode(['status' => 'success', 'message' => 'Mensaje guardado correctamente.']);
        } else {
            // Si hubo un error al guardar
            http_response_code(500); // Internal Server Error
            echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el mensaje.']);
        }
    } else {
        // Si faltan datos en la petición
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos (título o contenido).']);
    }
} else {
    // Si el método no es POST
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}
?>
