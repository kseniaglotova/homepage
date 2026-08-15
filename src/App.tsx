import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { PersonalPage } from './pages/PersonalPage';
import { HomePage } from './pages/HomePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<PersonalPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App