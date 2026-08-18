import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Test } from './pages/Test.tsx';
import { PersonalPage } from './pages/PersonalPage';
import { HomePage } from './pages/HomePage';
import { Links } from './pages/Links';
import { Education } from './pages/Education';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="top-nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/personal" className="nav-link">Persönliches</NavLink>
        <NavLink to="/test" className="nav-link">Test</NavLink>
        <NavLink to="/links" className="nav-link">Links</NavLink>
        <NavLink to="/education" className="nav-link">Education</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/links" element={<Links />} />
        <Route path="/education" element={<Education />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App