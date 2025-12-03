import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

export default function Guestbook() {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('mensajes')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) console.error('Error fetching messages:', error)
        else setMessages(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        setLoading(true)
        const { error } = await supabase
            .from('mensajes')
            .insert([{ contenido: newMessage, titulo: 'Mensaje de Visitante' }]) // Asumiendo estructura de tabla

        if (error) {
            alert('Error al enviar mensaje: ' + error.message)
        } else {
            setNewMessage('')
            fetchMessages()
        }
        setLoading(false)
    }

    return (
        <div className="container">
            <header className="site-header">
                <h1>Libro de Visitas</h1>
                <p>Deja tu huella en mi portafolio.</p>
            </header>

            <div id="nuevo-mensaje-card" className="card">
                <h2>Nuevo Mensaje</h2>
                <form id="nuevo-mensaje-form" onSubmit={handleSubmit}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                        required
                        rows="4"
                    ></textarea>
                    <button id="guardar-mensaje" type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : 'Publicar Mensaje'}
                    </button>
                </form>
            </div>

            <div id="lista-mensajes">
                {messages.map(msg => (
                    <article key={msg.id} className="mensaje">
                        <header>
                            <h2>{msg.titulo || 'Visitante'}</h2>
                            <time>{new Date(msg.created_at).toLocaleDateString()}</time>
                        </header>
                        <p>{msg.contenido}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}
