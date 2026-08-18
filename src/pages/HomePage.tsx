import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
        <div className="home-content">
            <div className="text-block">
                <h1>Meine Homepages</h1>
                <p>Hi, ich bin Ksenia Glotova - Spezialist für destruktives Refactoring und autodidaktisches Try-and-Error</p>
                <p>Mein Workflow besteht aus der evolutionären Code-Generierung durch akutes Learning by Doing. Ich beherrsche die Kunst, semantisches HTML und CSS durch destruktives Refactoring komplett auseinanderzunehmen, um überhaupt zu kapieren, wie Webdesign funktioniert.</p>
            </div>

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
    </div>
  )
}
