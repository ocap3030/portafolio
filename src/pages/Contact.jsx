import { useState } from 'react'
import { supabase } from '../services/supabaseClient'

export default function Contact() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    })
    const [status, setStatus] = useState(null) // success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)

        // Opción A: Guardar en Supabase (requiere tabla 'contactos')
        // Opción B: Simular envío (para demo)

        try {
            // Intentamos guardar en una tabla 'contactos' si existe, o 'mensajes' como fallback
            const { error } = await supabase
                .from('mensajes') // Usamos mensajes por ahora para asegurar que funcione con la tabla existente
                .insert([{
                    titulo: `Contacto de ${formData.nombre} (${formData.email})`,
                    contenido: formData.mensaje
                }])

            if (error) throw error

            setStatus('success')
            setFormData({ nombre: '', email: '', mensaje: '' })
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <div className="container">
            <header className="site-header">
                <h1>Contacto</h1>
                <p>Envíame un mensaje directo.</p>
            </header>

            <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} id="formulario-publicacion">
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={formData.nombre}
                            onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mensaje">Mensaje:</label>
                        <textarea
                            id="mensaje"
                            value={formData.mensaje}
                            onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                            required
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit">Enviar Mensaje</button>

                    {status === 'success' && (
                        <div className="feedback success">¡Mensaje enviado con éxito!</div>
                    )}
                    {status === 'error' && (
                        <div className="feedback error">Hubo un error al enviar el mensaje.</div>
                    )}
                </form>
            </div>
        </div>
    )
}
