import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Personal } from './pages/Personal'
import './App.css'
import { NoteCategory } from './pages/NoteCategory'
import { Bike } from './pages/Bike'

import AdminUpload from './pages/AdminUpload'


function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
  top: 0,
  behavior: 'smooth',
})
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <nav className="top-nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/personal" className="nav-link">
          Personal
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/notes/:categoryy" element={<NoteCategory />} />
        <Route path="/bike" element={<Bike />} />
        <Route path="/admin" element={<AdminUpload />} />
      </Routes>

      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © 2026 Ksenia Glotova
          </p>

          <nav className="footer-links">
            <a href="https://www.instagram.com/kseniaglotovaa/">
              Instagram
            </a>

            <a href="mailto:ksenia.a.glotova@gmail.com">
              E-Mail
            </a>

            <a href="tel:+4915140314269">
              Telefon
            </a>
          </nav>
        </div>


    </footer>
    </BrowserRouter>

  )
}

export default App