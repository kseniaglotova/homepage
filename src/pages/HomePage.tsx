import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Meine Website</h1>
        <p>Willkommen! Wähle eine Kategorie aus:</p>
      </header>

      <div className="categories-grid">
        <Link to="/personal" className="category-box">
          <div className="box-content">
            <h2>📝 Persönliches</h2>
            <p>Mehr über mich erfahren</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
