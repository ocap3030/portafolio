import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'
import Guestbook from './pages/Guestbook'
import Contact from './pages/Contact'

function App() {
    return (
        <Router basename="/Formulario">
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/guestbook" element={<Guestbook />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
