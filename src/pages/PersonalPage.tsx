import { Link } from 'react-router-dom'

export function PersonalPage() {
  return (
    <div className="personal-container">
      <h1>Persönliches</h1>
      <Link to="/" className="back-link">Zurück</Link>
    </div>
  )
}
