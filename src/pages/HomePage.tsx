import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Meine Website</h1>
      <button
        type="button"
        className="category-box"
        onClick={() => navigate('/personal')}
      >
        Persönliches
      </button>
    </div>
  )
}
