

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mensajes</title>
 
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header class="site-header">
        <h1>Mensajes Guardados</h1>
        <a href="index.html">Volver a la galería</a>
      </header>
      
      <main>
        <?php

        require_once 'components/GestorMensajes.php';

        // Ejemplo de cómo leer y mostrar todos los mensajes guardados
        $mensajesGuardados = file('mensajes.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        if ($mensajesGuardados !== false && count($mensajesGuardados) > 0) {
            foreach ($mensajesGuardados as $linea) {
                $datos = json_decode($linea, true);
                if (is_array($datos)) {
                    // Crea una instancia y muestra el mensaje
                    $mensaje = new GestorMensajes($datos['titulo'], $datos['contenido']);
                    echo $mensaje->mostrar();
                }
            }
        } else {
            echo "<p>No hay mensajes para mostrar.</p>";
        }

        ?>
      </main>

      <footer>
        <p>Fin de los mensajes.</p>
      </footer>
    </div>
  </body>
</html>

