import { useState } from 'react'

export default function ProjectCard({ title, description, image, accent, category }) {
    const [isActive, setIsActive] = useState(false)
    const [localTitle, setLocalTitle] = useState(title)

    const toggleActive = () => setIsActive(!isActive)
    const updateTitle = () => setLocalTitle("¡Título Actualizado!")

    const cardStyle = {
        '--accent-color': isActive ? accent : '#f0f0f0',
        border: isActive ? `2px solid ${accent}` : 'none',
    }

    return (
        <article className="card vue-card" style={cardStyle} data-category={category}>
            {image && <img src={image} alt={localTitle} onError={(e) => e.target.src = '/assets/proyecto1.jpg'} />}
            <h3>{localTitle}</h3>
            <p>{description}</p>
            <div className="vue-actions">
                <button onClick={toggleActive}>Toggle resaltar</button>
                <button onClick={updateTitle}>Actualizar título</button>
            </div>
        </article>
    )
}
