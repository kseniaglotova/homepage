import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import PersonalPage from './pages/PersonalPage'

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