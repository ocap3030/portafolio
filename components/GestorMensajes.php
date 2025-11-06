<?php

class GestorMensajes {
    private $titulo;
    private $contenido;
    private $fecha;

    /**
     * Constructor que inicializa los datos.
     * @param string $titulo El título del mensaje.
     * @param string $contenido El contenido del mensaje.
     */
    public function __construct($titulo, $contenido) {
        $this->titulo = $titulo;
        $this->contenido = $contenido;
        $this->fecha = date('Y-m-d H:i:s'); // Asigna la fecha y hora actual
    }

    /**
     * Guarda los datos en un archivo de texto.
     * Los datos se guardan en formato JSON, uno por línea.
     * @return bool Devuelve true si se guardó correctamente, false en caso de error.
     */
    public function guardar() {
        $datos = [
            'titulo' => $this->titulo,
            'contenido' => $this->contenido,
            'fecha' => $this->fecha
        ];

        // Convierte el array a formato JSON y añade un salto de línea
        $linea = json_encode($datos) . PHP_EOL;

        // Guarda la línea en el archivo 'mensajes.txt'
        // FILE_APPEND para añadir al final, LOCK_EX para evitar escrituras simultáneas
        if (file_put_contents('mensajes.txt', $linea, FILE_APPEND | LOCK_EX) !== false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Devuelve el contenido formateado en HTML.
     * @return string El mensaje formateado en HTML.
     */
    public function mostrar() {
        // Escapa los caracteres especiales para evitar inyección de HTML (XSS)
        $tituloSeguro = htmlspecialchars($this->titulo, ENT_QUOTES, 'UTF-8');
        $contenidoSeguro = htmlspecialchars($this->contenido, ENT_QUOTES, 'UTF-8');
        $fechaSegura = htmlspecialchars($this->fecha, ENT_QUOTES, 'UTF-8');

        $html = "
        <article class='mensaje'>
            <header>
                <h2>{$tituloSeguro}</h2>
                <time datetime='{$fechaSegura}'>{$fechaSegura}</time>
            </header>
            <p>{$contenidoSeguro}</p>
        </article>";

        return $html;
    }
}

?>