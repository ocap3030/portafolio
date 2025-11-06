# Portafolio Profesional con Libro de Visitas y Formulario de Contacto Dinámico

## 1. Resumen del Proyecto

Este proyecto comenzó como un portafolio web estático. La evolución clave fue la integración de un backend con PHP para añadir dos funcionalidades dinámicas: un "Libro de Visitas" con envío asíncrono (AJAX) y un "Formulario de Contacto" con procesamiento en el servidor. Estas mejoras transformaron el sitio, demostrando una arquitectura de cliente-servidor funcional y desacoplada, y mostrando dos métodos distintos de interacción con el backend.

---

## 2. Estado Inicial del Proyecto (El Legado)

El punto de partida fue un portafolio moderno, pero completamente estático.

- **Tecnologías:** HTML5, CSS3, y JavaScript (Vanilla).
- **Funcionalidades:**
    - Galería de proyectos filtrable.
    - Componentes de UI interactivos construidos con JavaScript.
    - Un formulario de registro (`registro.html`) con **validación puramente en el lado del cliente (frontend)**, que fue conservado como ejemplo de validación con JavaScript.
- **Limitación Principal:** La naturaleza estática del proyecto impedía cualquier tipo de persistencia de datos o interacción real con un servidor.

---

## 3. Mejoras y Funcionalidades Agregadas (La Evolución)

Para dar vida al proyecto, se integró un backend con PHP, añadiendo las siguientes características en etapas:

### a. Backend con PHP para un Libro de Visitas (AJAX)

La primera gran mejora fue añadir una funcionalidad de "Libro de Visitas" que permite a los usuarios dejar mensajes que se guardan en el servidor sin recargar la página.

- **`mensajes.php`:** Interfaz principal para el libro de visitas.
- **`guardar_mensaje.php`:** Endpoint de la API que recibe los datos y los guarda.
- **`mensajes.txt`:** Base de datos de archivo plano donde se almacenan los mensajes en formato JSON.
- **`Mensajes.php` (Clase):** Clase que encapsula la lógica de negocio para leer y escribir mensajes.
- **Interactividad Asíncrona:** Se usa la API `fetch` de JavaScript para enviar datos sin recargar la página, ofreciendo una experiencia de usuario moderna.

### b. Formulario de Contacto con Procesamiento en Servidor (Tradicional)

La segunda mejora fue la implementación de un formulario de contacto clásico para demostrar un ciclo de solicitud-respuesta donde el servidor genera la página de respuesta.

- **`formulario.html`:** Un nuevo formulario de contacto diseñado para enviar datos a un script PHP.
- **`procesar_formulario.php`:** Script que recibe la información, la procesa de forma segura y genera una página de respuesta HTML dinámica para el usuario.
- **Uso de Superglobales `$_POST` y `$_SERVER`**: El script utiliza `$_POST` para acceder a los datos y `$_SERVER` para verificar el método de la solicitud, mostrando también información del entorno del servidor.

### c. Arquitectura de Servidores Dual (Vite + PHP)

El desafío técnico fue hacer que dos servidores distintos (Vite para el frontend y PHP para el backend) trabajaran juntos.

**Solución Implementada:** Los botones en el `index.html` fueron configurados como enlaces absolutos que apuntan directamente al servidor de PHP (`http://localhost:8000`), permitiendo al usuario navegar de forma transparente desde el frontend estático al backend dinámico.

```html
<!-- En index.html -->
<div class="hero-buttons">
  <a class="cv-download" href="#">Descargar CV</a>
  <a class="cv-download" href="http://localhost:8000/formulario.html" target="_blank">Contacto PHP</a>
  <a class="cv-download" href="http://localhost:8000/mensajes.php" target="_blank">Libro de Visitas</a>
</div>
```

### d. Unificación del Diseño Visual

Todas las nuevas páginas PHP (`mensajes.php` y la respuesta de `procesar_formulario.php`) fueron diseñadas para integrarse perfectamente con la estética del portafolio, enlazando la misma hoja de estilos (`styles.css`) y reutilizando las clases existentes.

---

## 4. Cómo Ejecutar el Proyecto

Para poner en marcha este proyecto, necesitas tener dos servidores corriendo simultáneamente.

**Prerrequisitos:**

Para poder trabajar con este proyecto en tu máquina local, asegúrate de tener instalado el siguiente software:

- **[Node.js](https://nodejs.org/) (que incluye npm):** Necesario para gestionar las dependencias del frontend y ejecutar el servidor de desarrollo Vite.
- **[PHP](https://www.php.net/downloads.php):** Necesario para ejecutar el servidor de backend que procesa la lógica del libro de visitas y el formulario de contacto.

**Pasos:**

1.  **Abre una terminal** e inicia el **servidor de Vite** para el frontend:
    ```bash
    # Instalar dependencias (solo la primera vez)
    npm install
    # Iniciar servidor de desarrollo
    npm run dev
    ```
    Esto levantará el portafolio en una dirección como `http://localhost:5173`.

2.  **Abre una segunda terminal** e **inicia el servidor de PHP** para el backend:
    ```bash
    php -S localhost:8000
    ```

3.  **Accede a la aplicación:** Abre tu navegador y ve a `http://localhost:5173`. Desde allí, podrás usar los botones para navegar a las funcionalidades PHP.

---

## 5. Detalles de la Implementación PHP

### a. Flujo del Libro de Visitas (Asíncrono)

1.  **Cliente:** El usuario llena el formulario en `mensajes.php`.
2.  **Solicitud (AJAX):** JavaScript (`mensajes.js`) usa `fetch` para enviar una solicitud `POST` a `guardar_mensaje.php` en segundo plano.
3.  **Servidor:** `guardar_mensaje.php` procesa los datos y los guarda en `mensajes.txt`.
4.  **Respuesta (JSON):** El servidor devuelve una respuesta JSON indicando éxito o error.
5.  **Cliente:** JavaScript recibe la respuesta y actualiza el DOM para mostrar el nuevo mensaje o un error, sin recargar la página.

### b. Flujo del Formulario de Contacto (Renderizado en Servidor)

1.  **Cliente:** El usuario llena el formulario en `formulario.html` y hace clic en "Enviar".
2.  **Solicitud (Tradicional):** El navegador crea una solicitud `POST` a `http://localhost:8000/procesar_formulario.php` y espera una nueva página.
3.  **Servidor:** `procesar_formulario.php` usa las superglobales `$_POST` y `$_SERVER` para procesar los datos.
4.  **Respuesta (HTML):** El script genera una página HTML completa como respuesta.
5.  **Cliente:** El navegador recibe y renderiza la nueva página HTML, mostrando el mensaje de agradecimiento personalizado.

**Ejemplo del script `procesar_formulario.php`:**

```php
<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario de forma segura
    $nombre = isset($_POST['nombre']) ? htmlspecialchars($_POST['nombre']) : 'Invitado';
    $correo = isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : '';

    // Generar la respuesta personalizada (incluyendo estilos)
    echo '<link rel="stylesheet" href="styles.css">';
    echo '<div class="container" style="padding-top: 4rem;">';
    echo '  <article class="card" style="text-align: center;">';
    echo "    <h1>¡Gracias por contactarme, {$nombre}!</h1>";
    echo "    <p>He recibido tu mensaje y te responderé pronto al correo: <strong>{$correo}</strong>.</p>";
    echo '    <hr>';
    echo "    <small>Método de solicitud: {$_SERVER['REQUEST_METHOD']}</small>";
    echo '  </article>';
    echo '</div>';
} else {
    echo "<h1>Acceso no permitido</h1>";
}
?>
```
