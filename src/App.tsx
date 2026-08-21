import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { mainCategories } from './mainCategories'
import './App.css'

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App