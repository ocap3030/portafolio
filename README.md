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

## 4. Detalles de la Implementación PHP

### a. Flujo del Libro de Visitas (Asíncrono)

1.  **Cliente:** El usuario llena el formulario en `mensajes.php`.
2.  **Solicitud (AJAX):** JavaScript (`mensajes.js`) usa `fetch` para enviar una solicitud `POST` a `guardar_mensaje.php` en segundo plano.
3.  **Servidor:** `guardar_mensaje.php` procesa los datos y los guarda en la base de datos de Supabase.
4.  **Respuesta (JSON):** El servidor devuelve una respuesta JSON indicando éxito o error.
5.  **Cliente:** JavaScript recibe la respuesta y actualiza el DOM para mostrar el nuevo mensaje o un error, sin recargar la página.

### b. Flujo del Formulario de Contacto (Renderizado en Servidor)

1.  **Cliente:** El usuario llena el formulario en `formulario.html` y hace clic en "Enviar".
2.  **Solicitud (Tradicional):** El navegador crea una solicitud `POST` a `http://localhost:8000/procesar_formulario.php` y espera una nueva página.
3.  **Servidor:** `procesar_formulario.php` usa las superglobales `$_POST` y `$_SERVER` para procesar los datos.
4.  **Respuesta (HTML):** El script genera una página HTML completa como respuesta.
5.  **Cliente:** El navegador recibe y renderiza la nueva página HTML, mostrando el mensaje de agradecimiento personalizado.

---

## 5. Guía de Implementación y Ejecución con Supabase

Para escalar la aplicación y reemplazar el sistema de archivos de texto (`mensajes.txt`), se migró la persistencia de datos a **Supabase**, una plataforma de Backend as a Service (BaaS) que proporciona una base de datos PostgreSQL.

Esta sección final sirve como una guía completa que detalla tanto los cambios técnicos realizados como los pasos necesarios para configurar y ejecutar el proyecto desde cero.

### a. Análisis de la Migración a Supabase

1.  **Eliminación del Almacenamiento Local:** Se eliminó el uso del archivo `mensajes.txt`, junto con la clase original `Mensajes.php` que lo gestionaba.
2.  **Configuración Centralizada:** Se creó un archivo `supabase_config.php` para almacenar las credenciales de la API de Supabase (URL y llave pública anónima), manteniendo la configuración separada del código de la aplicación.
    ```php
    <?php
    // supabase_config.php
    $supabase_url = 'TU_SUPABASE_URL';
    $supabase_key = 'TU_SUPABASE_KEY';
    ?>
    ```
3.  **Nueva Lógica de Acceso a Datos (`GestorMensajes.php`):** La clase `GestorMensajes.php` fue completamente reescrita para actuar como un cliente de la API de Supabase.
    -   **`guardar()`:** Este método ahora construye una solicitud cURL de tipo `POST` al endpoint `/rest/v1/mensajes` de Supabase, enviando los datos del nuevo mensaje en formato JSON.
    -   **`obtenerTodos()`:** Este método estático realiza una solicitud cURL de tipo `GET` para obtener todos los mensajes, ordenados por fecha de creación descendente (`order=created_at.desc`).
4.  **Adaptación de Endpoints:**
    -   `guardar_mensaje.php`: Se actualizó para instanciar el nuevo `GestorMensajes` y llamar a su método `guardar()`.
    -   `index.php`: Se modificó para usar `GestorMensajes::obtenerTodos()` y renderizar los mensajes recuperados directamente desde la base de datos de Supabase.

### b. Manual de Configuración y Ejecución

Siga esta guía paso a paso para configurar y ejecutar el proyecto completo en su entorno local.

**Paso 1: Instalar Prerrequisitos**

Asegúrese de tener el siguiente software instalado en su sistema:

- **[Node.js](https://nodejs.org/) (versión 18 o superior):** Necesario para gestionar las dependencias del frontend y ejecutar el servidor de desarrollo Vite. Incluye `npm`.
- **[PHP](https://www.php.net/downloads.php) (versión 8 o superior):** Necesario para ejecutar el servidor de backend que procesa la lógica de la base de datos y los formularios.

**Paso 2: Configurar el Backend con Supabase**

1.  **Crear un Proyecto en Supabase:**
    -   Vaya a [supabase.com](https://supabase.com), regístrese y cree un nuevo proyecto.

2.  **Crear la Tabla de Mensajes:**
    -   Dentro de su proyecto de Supabase, vaya al **SQL Editor**.
    -   Copie y pegue el siguiente script SQL y haga clic en **"RUN"**:
      ```sql
      CREATE TABLE public.mensajes (
        id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        titulo TEXT,
        contenido TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ```

3.  **Desactivar Row Level Security (RLS):**
    -   Vaya al **Table Editor**, seleccione la tabla `mensajes`.
    -   Asegúrese de que la opción **"Enable Row Level Security (RLS)"** esté **DESACTIVADA**. Esto es crucial para permitir que la API de PHP pueda escribir y leer datos sin políticas de seguridad complejas.

4.  **Obtener las Credenciales de la API:**
    -   En el menú de la izquierda, vaya a **Project Settings -> API**.
    -   Copie la **URL del Proyecto** y la clave de API **`anon` `public`**.

**Paso 3: Configurar el Proyecto Local**

1.  **Clonar o Descargar el Repositorio:**
    -   Obtenga todos los archivos del proyecto en una carpeta en su máquina.

2.  **Instalar Dependencias del Frontend:**
    -   Abra una terminal en la raíz del proyecto y ejecute:
      ```bash
      npm install
      ```

3.  **Configurar las Credenciales de Supabase:**
    -   Abra el archivo `supabase_config.php`.
    -   Reemplace los valores de ejemplo con las credenciales que obtuvo en el Paso 2:
      ```php
      <?php
      $supabase_url = 'SU_URL_DE_PROYECTO_SUPABASE';
      $supabase_key = 'SU_CLAVE_ANON_PUBLIC_SUPABASE';
      ?>
      ```

**Paso 4: Ejecutar los Servidores**

Para que la aplicación funcione, necesita tener dos servidores corriendo al mismo tiempo en dos terminales separadas.

1.  **Iniciar Servidor Frontend (Vite):**
    -   En su primera terminal, ejecute:
      ```bash
      npm run dev
      ```
    -   Esto iniciará el servidor de desarrollo del frontend, generalmente en `http://localhost:5173`.

2.  **Iniciar Servidor Backend (PHP):**
    -   Abra una **nueva terminal** en la misma carpeta del proyecto.
    -   Ejecute el siguiente comando para iniciar el servidor de PHP:
      ```bash
      php -S localhost:8000
      ```

**Paso 5: Acceder a la Aplicación**

1.  **Abra su Navegador:**
    -   Vaya a la dirección del servidor de Vite: **`http://localhost:5173`**.
2.  **Navegar a las Funcionalidades del Backend:**
    -   Desde la página principal, utilice los botones **"Libro de Visitas"** o **"Contacto PHP"** para acceder a las funcionalidades que se conectan con el backend de PHP y la base de datos de Supabase.

---

## 6. Módulo de Gestión de Contenido (CRUD) - gestion.html

Este módulo es un CMS (Sistema de Gestión de Contenido) que permite administrar las publicaciones del portafolio. Representa la arquitectura más moderna del proyecto al operar sin un backend PHP intermediario.

### a. Resumen Técnico

- **Arquitectura Cliente-Servidor Directa (Serverless):** La página `gestion.html` y su script `gestion.js` se comunican directamente con la API REST de Supabase desde el navegador. Esto elimina la necesidad de un script PHP en el servidor para gestionar la lógica, haciendo el módulo más rápido y eficiente.

- **Comunicación vía API REST:** Todas las operaciones CRUD se mapean a métodos HTTP estándar utilizando la API `fetch` de JavaScript:
    - **`GET /rest/v1/publicaciones`**: Para leer y mostrar todas las publicaciones.
    - **`POST /rest/v1/publicaciones`**: Para crear una nueva publicación.
    - **`PATCH /rest/v1/publicaciones?id=eq.{id}`**: Para actualizar una publicación existente.
    - **`DELETE /rest/v1/publicaciones?id=eq.{id}`**: Para eliminar una publicación.

- **Seguridad Delegada a Supabase (RLS):** La seguridad no reside en un backend, sino en las **Políticas de Seguridad a Nivel de Fila (Row Level Security)** de la base de datos. Las reglas definidas en el script SQL actúan como el verdadero "guardián", decidiendo quién puede leer y escribir datos.

- **Experiencia de Usuario SPA (Single Page Application):** Todas las interacciones del usuario (crear, editar, eliminar) se reflejan instantáneamente en la interfaz sin necesidad de recargar la página. El script `gestion.js` manipula el DOM para mantener la tabla siempre sincronizada con la base de datos.

### b. Configuración Técnica Requerida

El único prerrequisito técnico es configurar correctamente la tabla en Supabase. El script `gestion.js` ya contiene las credenciales de la API necesarias para la comunicación.

1.  **Ir al SQL Editor en Supabase:** Dentro de su proyecto, navegue a la sección "SQL Editor".
2.  **Ejecutar el Script de Creación:** Copie y pegue el siguiente código en el editor y haga clic en **"RUN"**. Este script prepara la base de datos, incluyendo la tabla y sus reglas de seguridad.

    ```sql
    -- Elimina la tabla anterior si existe para evitar conflictos.
    DROP TABLE IF EXISTS public.publicaciones CASCADE;

    -- Crea la tabla con todas las columnas necesarias para los proyectos.
    CREATE TABLE public.publicaciones (
      id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      imagen_url TEXT, -- URL a la imagen del proyecto
      categoria TEXT    -- Categoría para filtrado futuro
    );

    -- Habilita la Seguridad a Nivel de Fila (RLS).
    ALTER TABLE public.publicaciones ENABLE ROW LEVEL SECURITY;

    -- Política 1: Permite que CUALQUIERA pueda LEER (SELECT) los datos.
    -- Esto es necesario para que el portafolio público muestre los proyectos.
    CREATE POLICY "Permitir acceso de lectura público para todos"
    ON public.publicaciones FOR SELECT USING (true);

    -- Política 2: Permite realizar CUALQUIER operación de escritura (INSERT, UPDATE, DELETE).
    -- La seguridad aquí se basa en que solo quien tenga la clave de API (anon key) puede escribir.
    CREATE POLICY "Permitir todas las operaciones de escritura para el servicio"
    ON public.publicaciones FOR ALL USING (true);
    ```

### c. Manual de Uso de la Interfaz

Una vez que la configuración técnica está completa, cualquier usuario puede administrar los proyectos de la siguiente manera:

1.  **Acceder a la Página:** Navegue a `gestion.html` desde el servidor de desarrollo (ej. `http://localhost:5173/gestion.html`).
2.  **Visualizar Proyectos:** Al cargar, la página mostrará una tabla con todos los proyectos almacenados en la base de datos.
3.  **Crear un Nuevo Proyecto:**
    -   Rellene los campos del formulario: **Título, Descripción, URL de la Imagen y Categoría**.
    -   Haga clic en "Guardar". El nuevo proyecto aparecerá en la tabla sin recargar la página.
4.  **Editar un Proyecto:**

    -   Haga clic en el botón "Editar" de la fila que desea modificar.
    -   Los datos del proyecto se cargarán en el formulario en la parte superior de la página.
    -   Modifique la información y haga clic en "Guardar" para aplicar los cambios.
5.  **Eliminar un Proyecto:**
    -   Haga clic en el botón "Eliminar" en la fila del proyecto que desea borrar.
    -   Confirme la acción en el diálogo de alerta. El proyecto será eliminado permanentemente.


#Despliege