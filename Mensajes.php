<?php
class Mensajes {
    private $archivo = 'mensajes.json';

    public function __construct() {
        // Asegurarse de que el archivo exista
        if (!file_exists($this->archivo)) {
            file_put_contents($this->archivo, '[]');
        }
    }

    /**
     * Obtiene todos los mensajes del archivo.
     * @return array Un array de mensajes.
     */
    public function getMensajes() {
        $contenidoJson = file_get_contents($this->archivo);
        return json_decode($contenidoJson, true);
    }

    /**
     * Guarda un nuevo mensaje.
     * @param string $titulo El título del mensaje.
     * @param string $contenido El contenido del mensaje.
     * @return bool True si se guardó correctamente, false en caso contrario.
     */
    public function guardarMensaje($titulo, $contenido) {
        // Validar que los datos no estén vacíos
        if (empty($titulo) || empty($contenido)) {
            return false;
        }

        $mensajes = $this->getMensajes();

        $nuevoMensaje = [
            'titulo' => htmlspecialchars($titulo), // Escapar datos para seguridad
            'contenido' => htmlspecialchars($contenido),
            'fecha' => date('d-m-Y H:i')
        ];

        $mensajes[] = $nuevoMensaje;

        // Guardar el array actualizado en el archivo
        $resultado = file_put_contents($this->archivo, json_encode($mensajes, JSON_PRETTY_PRINT));

        return $resultado !== false;
    }
}
?>
