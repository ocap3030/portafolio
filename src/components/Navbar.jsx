import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="site-header">
            <h1>Mi Portafolio</h1>
            <div className="controls" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                <Link to="/" className="filter-btn">Inicio</Link>
                <Link to="/guestbook" className="filter-btn">Libro de Visitas</Link>
                <Link to="/contact" className="filter-btn">Contacto</Link>
                <Link to="/admin" className="filter-btn">Admin</Link>
            </div>
        </nav>
    )
}
