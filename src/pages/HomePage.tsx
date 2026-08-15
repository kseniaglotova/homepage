import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <h1>Meine Website</h1>
      <div className="button-grid">
        <button
            type="button"
            className="category-box"
            onClick={() => navigate('/personal')}>
            Persönliches
        </button>
        
        <button
            type="button"
            className="category-box"
            onClick={() => navigate('/test')}>
            Test
        </button>
        <button
            type="button"
            className="category-box"
            onClick={() => navigate('/links')}>
            Links
        </button>
        <button
            type="button"
            className="category-box"
            onClick={() => navigate('/education')}>
            Education
        </button>
  </div>
    </div>
  )
}
