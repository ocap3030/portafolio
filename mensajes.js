document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('message-form');
    const feedbackDiv = document.getElementById('form-feedback');

    form.addEventListener('submit', function(event) {
        // Evitamos que el formulario se envíe de la forma tradicional (recargando la página)
        event.preventDefault();

        // Obtenemos los valores del formulario
        const titulo = document.getElementById('titulo').value;
        const contenido = document.getElementById('contenido').value;

        // Creamos un objeto con los datos que enviaremos al servidor
        const datos = {
            titulo: titulo,
            contenido: contenido
        };

        // Mostramos un mensaje de "Enviando..."
        feedbackDiv.textContent = 'Enviando mensaje...';
        feedbackDiv.style.color = 'blue';

        // Usamos fetch para enviar los datos a nuestro script de PHP
        fetch('guardar_mensaje.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos) // Convertimos nuestro objeto a una cadena JSON
        })
        .then(response => {
            // Primero, verificamos si la respuesta del servidor fue exitosa (código 200-299)
            if (!response.ok) {
                // Si no fue exitosa, creamos un error para pasar al siguiente .catch()
                throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Convertimos la respuesta del servidor (que es JSON) a un objeto JavaScript
        })
        .then(data => {
            // Aquí manejamos la respuesta exitosa del servidor
            if (data.status === 'success') {
                feedbackDiv.textContent = '¡Mensaje guardado con éxito! La página se recargará.';
                feedbackDiv.style.color = 'green';

                // Limpiamos el formulario
                form.reset();

                // Después de 2 segundos, recargamos la página para ver el nuevo mensaje
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                // Si el servidor nos devuelve un error conocido (ej. datos incompletos)
                throw new Error(data.message || 'Ocurrió un error desconocido.');
            }
        })
        .catch(error => {
            // Aquí manejamos cualquier error que haya ocurrido durante el fetch
            console.error('Error al enviar el mensaje:', error);
            feedbackDiv.textContent = `Error: ${error.message}`;
            feedbackDiv.style.color = 'red';
        });
    });
});
