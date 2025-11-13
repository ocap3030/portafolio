document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.getElementById('gallery');
    const apiUrl = 'api/publicaciones_api.php';

    if (!galeria) {
        console.warn('El elemento con id "gallery" no fue encontrado en el DOM.');
        return;
    }

    fetch(apiUrl)
        .then(response => {
            // Clonamos la respuesta para poder leerla dos veces si es necesario (una para texto, otra para json)
            const responseClone = response.clone();

            // Si la respuesta no es OK, sabemos que hay un error del servidor (ej. 404, 500)
            if (!response.ok) {
                // Leemos la respuesta como texto y la lanzamos como un error
                return response.text().then(text => {
                    throw new Error(`Error del servidor (${response.status}): ${text}`);
                });
            }

            // Si la respuesta es OK, intentamos procesarla como JSON
            return response.json().catch(error => {
                // Si falla el .json(), es porque la respuesta no es un JSON válido (probablemente un error de PHP)
                // Volvemos a leer del clon la respuesta como texto para ver qué contenía.
                return responseClone.text().then(text => {
                    throw new Error(`La respuesta no es un JSON válido. Contenido: ${text}`);
                });
            });
        })
        .then(publicaciones => {
            galeria.innerHTML = ''; // Limpiamos el mensaje de "Cargando..."

            if (!publicaciones || publicaciones.length === 0) {
                galeria.innerHTML = '<p>Aún no hay proyectos para mostrar. ¡Vuelve pronto!</p>';
                return;
            }

            publicaciones.forEach(pub => {
                const card = document.createElement('article');
                card.className = 'card';
                if (pub.categoria) {
                    card.dataset.category = pub.categoria;
                }

                const imagenHTML = pub.imagen_url
                    ? `<img src="${pub.imagen_url}" alt="${pub.titulo || 'Proyecto'}" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x240?text=Imagen+no+disponible';">`
                    : '';

                card.innerHTML = `
                    ${imagenHTML}
                    <h3>${pub.titulo || 'Sin título'}</h3>
                    <p>${pub.descripcion || 'Sin descripción'}</p>
                `;
                galeria.appendChild(card);
            });
        })
        .catch(error => {
            // Ahora el error que se muestra en consola es mucho más detallado
            console.error('Error detallado al cargar las publicaciones:', error);
            // Cambiamos el mensaje en la página para guiar al usuario
            galeria.innerHTML = '<p style="color: red;">Error al cargar los proyectos. Revisa la consola del navegador (F12) para más detalles.</p>';
        });
});