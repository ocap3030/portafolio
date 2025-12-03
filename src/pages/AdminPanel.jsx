import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

export default function AdminPanel() {
    const [projects, setProjects] = useState([])
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        imagen_url: '',
        categoria: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('publicaciones')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) console.error('Error:', error)
        else setProjects(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { id, ...dataToSave } = formData
        let error

        if (id) {
            // Update
            const { error: updateError } = await supabase
                .from('publicaciones')
                .update(dataToSave)
                .eq('id', id)
            error = updateError
        } else {
            // Create
            const { error: insertError } = await supabase
                .from('publicaciones')
                .insert([dataToSave])
            error = insertError
        }

        if (error) {
            alert('Error al guardar: ' + error.message)
        } else {
            setFormData({ id: '', titulo: '', descripcion: '', imagen_url: '', categoria: '' })
            fetchProjects()
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta publicación?')) return

        const { error } = await supabase
            .from('publicaciones')
            .delete()
            .eq('id', id)

        if (error) alert('Error al eliminar: ' + error.message)
        else fetchProjects()
    }

    const handleEdit = (project) => {
        setFormData(project)
        window.scrollTo(0, 0)
    }

    return (
        <div className="container">
            <header className="site-header">
                <h1>Gestión de Publicaciones</h1>
                <p>Panel de administración protegido (Simulado)</p>
            </header>

            <main>
                <form id="formulario-publicacion" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="titulo">Título:</label>
                        <input
                            type="text"
                            id="titulo"
                            value={formData.titulo}
                            onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={formData.descripcion}
                            onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="imagen_url">URL de la Imagen:</label>
                        <input
                            type="text"
                            id="imagen_url"
                            value={formData.imagen_url}
                            onChange={e => setFormData({ ...formData, imagen_url: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoría:</label>
                        <input
                            type="text"
                            id="categoria"
                            value={formData.categoria}
                            onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (formData.id ? 'Actualizar' : 'Guardar')}
                    </button>
                    {formData.id && (
                        <button
                            type="button"
                            onClick={() => setFormData({ id: '', titulo: '', descripcion: '', imagen_url: '', categoria: '' })}
                            style={{ marginTop: '10px', background: '#e53e3e' }}
                        >
                            Cancelar Edición
                        </button>
                    )}
                </form>

                <h2>Publicaciones Existentes</h2>
                <table id="tabla-publicaciones">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(pub => (
                            <tr key={pub.id}>
                                <td>{pub.titulo}</td>
                                <td>{pub.descripcion}</td>
                                <td>{pub.categoria}</td>
                                <td>
                                    <button className="editar" onClick={() => handleEdit(pub)}>Editar</button>
                                    <button className="eliminar" onClick={() => handleDelete(pub.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
