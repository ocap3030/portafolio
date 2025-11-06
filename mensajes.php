<?php
require_once 'Mensajes.php';

$gestorMensajes = new Mensajes();
$mensajes = $gestorMensajes->getMensajes();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Libro de Visitas</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header class="site-header">
            <h1>Libro de Visitas</h1>
            <p>Deja tu mensaje para demostrar que el backend con PHP funciona.</p>
        </header>

        <main>
            <section class="card" style="margin-bottom: 2rem;">
                <h2 style="margin-top: 0;">Deja tu Mensaje</h2>
                <form id="message-form">
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label for="titulo" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Título</label>
                        <input type="text" id="titulo" name="titulo" required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 8px; font-family: 'Inter', sans-serif;">
                    </div>
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label for="contenido" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Mensaje</label>
                        <textarea id="contenido" name="contenido" rows="4" required style="width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 8px; font-family: 'Inter', sans-serif; resize: vertical;"></textarea>
                    </div>
                    <button type="submit" class="btn-primary" style="width: 100%; padding: 1rem; border: none; font-size: 1rem; cursor: pointer;">Enviar Mensaje</button>
                    <div id="form-feedback" style="margin-top: 1rem; text-align: center;"></div>
                </form>
            </section>

            <section class="messages-display-section">
                <h2>Mensajes Guardados</h2>
                <div id="messages-list" class="gallery" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
                    <?php if (empty($mensajes)): ?>
                        <p>Todavía no hay mensajes. ¡Sé el primero en escribir!</p>
                    <?php else: ?>
                        <?php foreach (array_reverse($mensajes) as $mensaje): ?>
                            <article class="card">
                                <h3><?php echo htmlspecialchars($mensaje['titulo']); ?></h3>
                                <p><?php echo htmlspecialchars($mensaje['contenido']); ?></p>
                                <div class="meta" style="margin-top: 1rem;">
                                    <span class="tag" style="font-size: 0.8rem;"><?php echo htmlspecialchars($mensaje['fecha']); ?></span>
                                </div>
                            </article>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </section>
        </main>
        
        <footer style="text-align: center; margin-top: 3rem;">
             <a class="cv-download" href="index.html" style="text-decoration: none;">Volver al Inicio</a>
        </footer>
    </div>

    <script src="mensajes.js"></script>
</body>
</html>
