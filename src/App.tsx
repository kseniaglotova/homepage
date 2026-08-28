import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation, } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { mainCategories } from './mainCategories'
import './App.css'
import { SecretTestPage } from './pages/Test'

import { NoteCategory } from './pages/NoteCategory'

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

        {mainCategories.map((category) => (
          <NavLink
            key={category.path}
            to={category.path}
            className="nav-link"
          >
            {category.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />

        {mainCategories.map((category) => {
          const Page = category.component

          return (
            <Route
              key={category.path}
              path={category.path}
              element={<Page />}
            />
          )
        })}
        <Route path="/notes/:categoryy" element={<NoteCategory />} />
        <Route path="/test" element={<SecretTestPage />} />
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

        <Link to="/test" className="secret-link" aria-label="Geheimer Bereich">
        🔒
        </Link>
    </footer>
    </BrowserRouter>

  )
}

export default App