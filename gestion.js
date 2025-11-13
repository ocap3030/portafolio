document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-publicacion');
    const tabla = document.getElementById('tabla-publicaciones').getElementsByTagName('tbody')[0];

    // --- Configuración de Supabase (asegúrate de que sea correcta) ---
    const SUPABASE_URL = 'https://omkujvtezqbveriuikgw.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta3VqdnRlenFidmVyaXVpa2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDgyNTIsImV4cCI6MjA3ODM4NDI1Mn0.kij5Od9C69Q0DSz3pv3pwy7cNQ7hM5IkWxZqalHlTMA';
    const API_ENDPOINT = `${SUPABASE_URL}/rest/v1/publicaciones`;

    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
    };

    // --- Funciones de la API ---

    const obtenerPublicaciones = async () => {
        try {
            const respuesta = await fetch(`${API_ENDPOINT}?select=*&order=created_at.desc`, { headers });
            if (!respuesta.ok) throw new Error(`Error al cargar: ${respuesta.statusText}`);
            
            const publicaciones = await respuesta.json();
            tabla.innerHTML = ''; // Limpiar tabla antes de llenarla
            publicaciones.forEach(pub => {
                const fila = tabla.insertRow();
                // Usamos textContent para seguridad y ?? para evitar "null" o "undefined"
                fila.innerHTML = `
                    <td>${pub.titulo ?? ''}</td>
                    <td>${pub.descripcion ?? ''}</td>
                    <td>${pub.imagen_url ?? ''}</td>
                    <td>${pub.categoria ?? ''}</td>
                    <td>
                        <button class="editar" 
                                data-id="${pub.id}" 
                                data-titulo="${encodeURIComponent(pub.titulo ?? '')}" 
                                data-descripcion="${encodeURIComponent(pub.descripcion ?? '')}" 
                                data-imagen_url="${encodeURIComponent(pub.imagen_url ?? '')}" 
                                data-categoria="${encodeURIComponent(pub.categoria ?? '')}">Editar</button>
                        <button class="eliminar" data-id="${pub.id}">Eliminar</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Error obteniendo publicaciones:", error);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('publicacion-id').value;
        const titulo = document.getElementById('titulo').value;
        // CORRECCIÓN: Usar 'descripcion' para coincidir con el ID del HTML
        const descripcion = document.getElementById('descripcion').value; 
        const imagen_url = document.getElementById('imagen_url').value;
        const categoria = document.getElementById('categoria').value;
        
        // El objeto debe coincidir con las columnas de la base de datos
        const publicacion = { titulo, descripcion, imagen_url, categoria };

        let url = API_ENDPOINT;
        let method = 'POST';

        // Si hay un ID, es una actualización (PATCH), si no, es una creación (POST)
        if (id) {
            url = `${API_ENDPOINT}?id=eq.${id}`;
            method = 'PATCH';
        }

        try {
            const respuesta = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(publicacion)
            });
            if (!respuesta.ok) throw new Error(`Error al guardar: ${await respuesta.text()}`);

            formulario.reset();
            document.getElementById('publicacion-id').value = '';
            obtenerPublicaciones(); // Recargar la tabla con los datos actualizados

        } catch (error) {
            console.error("Error al guardar la publicación:", error);
            alert(`Hubo un error al guardar: ${error.message}`);
        }
    };

    const manejarClickTabla = (e) => {
        const target = e.target;

        // Delegación de eventos para el botón ELIMINAR
        if (target.classList.contains('eliminar')) {
            const id = target.dataset.id;
            if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
                eliminarPublicacion(id);
            }
        }

        // Delegación de eventos para el botón EDITAR
        if (target.classList.contains('editar')) {
            document.getElementById('publicacion-id').value = target.dataset.id;
            // Usamos decodeURIComponent para manejar caracteres especiales en los datos
            document.getElementById('titulo').value = decodeURIComponent(target.dataset.titulo);
            document.getElementById('descripcion').value = decodeURIComponent(target.dataset.descripcion);
            document.getElementById('imagen_url').value = decodeURIComponent(target.dataset.imagen_url);
            document.getElementById('categoria').value = decodeURIComponent(target.dataset.categoria);
            window.scrollTo(0, 0); // Mover la vista al formulario
        }
    };
    
    const eliminarPublicacion = async (id) => {
        try {
            const respuesta = await fetch(`${API_ENDPOINT}?id=eq.${id}`, {
                method: 'DELETE',
                headers
            });
            if (!respuesta.ok) throw new Error(`Error al eliminar: ${await respuesta.text()}`);
            obtenerPublicaciones(); // Recargar la tabla
        } catch (error) {
            console.error("Error eliminando:", error);
            alert(`Hubo un error al eliminar: ${error.message}`);
        }
    }

    // --- Asignar Eventos ---
    formulario.addEventListener('submit', manejarSubmit);
    tabla.addEventListener('click', manejarClickTabla);

    // --- Carga Inicial ---
    obtenerPublicaciones();
});