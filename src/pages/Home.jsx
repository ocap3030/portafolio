import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { supabase } from '../services/supabaseClient'

export default function Home() {
    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState('all')
    const [showJsProjects, setShowJsProjects] = useState(true)
    const [editedCard, setEditedCard] = useState(null)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('publicaciones')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) console.error('Error fetching projects:', error)
        else setProjects(data)
    }

    // Lógica original de app.js: Toggle JS
    const toggleJs = () => {
        setShowJsProjects(!showJsProjects)
    }

    // Lógica original de app.js: Edit Card (Simulado en React)
    const editFirstCard = () => {
        // En React no modificamos el DOM directamente, actualizamos el estado
        // Simulamos que editamos el primer proyecto visible
        if (projects.length > 0) {
            setEditedCard({
                ...projects[0],
                titulo: '¡Título cambiado!',
                descripcion: 'El contenido ha sido actualizado dinámicamente con JavaScript (React).',
                imagen_url: 'https://via.placeholder.com/400x240?text=Imagen+Nueva'
            })
        }
    }

    const filteredProjects = projects.filter(p => {
        // Filtro por categoría
        if (filter !== 'all' && p.categoria !== filter) return false
        // Filtro Toggle JS
        if (!showJsProjects && p.categoria === 'js') return false
        return true
    })

    // Reemplazar el primer proyecto con la versión editada si existe
    const displayProjects = filteredProjects.map((p, index) => {
        if (index === 0 && editedCard && (filter === 'all' || filter === editedCard.categoria)) {
            return editedCard
        }
        return p
    })

    return (
        <div className="container">
            <section className="hero">
                <div className="hero-left">
                    <img src="/assets/Imagen de WhatsApp 2025-11-01 a las 12.14.05_4954b4e2.jpg" alt="Profile" className="profile-pic" />
                    <div className="hero-buttons">
                        <a href="#" className="cv-download">Descargar CV</a>
                        <Link to="/contact" className="cv-download">Contacto</Link>
                        <Link to="/guestbook" className="cv-download">Libro de Visitas</Link>
                        <Link to="/admin" className="cv-download">Admin</Link>

                    </div>
                </div>
                <div className="hero-right">
                    <h2 className="hero-name">Francisco Antonio Luna Marin </h2>
                    <p className="hero-role">Desarrollador Web Full Stack</p>
                    <p className="hero-summary">
                        Breve presentación: Soy un desarrollador front-end con experiencia en HTML,
                        CSS y JavaScript. Me enfoco en crear interfaces accesibles, responsivas
                    </p>
                    <div className="contact-list">
                        <span className="contact-item">✉️ luna_marin@gmail.com</span>
                        <span className="contact-item">📞 +52 1 55 1234 5678</span>
                        <span className="contact-item">📍 México, CDMX</span>
                        <span className="contact-item">🔗 linkedin.com</span>
                        <span className="contact-item">🔗 github.com</span>
                    </div>
                    <div className="skills">
                        <span className="skill">React</span>
                        <span className="skill">PHP</span>
                        <span className="skill">Supabase</span>
                        <span className="skill">JavaScript</span>
                    </div>
                </div>
            </section>

            <div className="controls">
                <div className="filter-group">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Todos
                    </button>
                    <button
                        className={`filter-btn ${filter === 'js' ? 'active' : ''}`}
                        onClick={() => setFilter('js')}
                    >
                        JavaScript
                    </button>
                    <button
                        className={`filter-btn ${filter === 'php' ? 'active' : ''}`}
                        onClick={() => setFilter('php')}
                    >
                        PHP
                    </button>
                </div>

                <div className="actions">
                    <button id="toggle-js" onClick={toggleJs}>
                        {showJsProjects ? 'Ocultar JS' : 'Mostrar JS'}
                    </button>
                    <button id="edit-card" onClick={editFirstCard}>
                        Modificar Tarjeta
                    </button>
                </div>
            </div>

            <div className="gallery" id="gallery">
                {displayProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id || index}
                        title={project.titulo}
                        description={project.descripcion}
                        image={project.imagen_url}
                        accent="#0066cc"
                        category={project.categoria}
                    />
                ))}
            </div>
        </div>
    )
}
