import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Test } from './pages/Test.tsx';
import { PersonalPage } from './pages/PersonalPage';
import { HomePage } from './pages/HomePage';
import { Links } from './pages/Links';
import { Education } from './pages/Education';
import './App.css'

function App() {
  return (
    <BrowserRouter>
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