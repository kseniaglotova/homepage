import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
        <section className="hero-banner">
            <div className="hero-content">
                <div className="hero-title">
                    <h1>Meine Website</h1>
                </div>
                <div className="hero-meta">
                    <p className="hero-meta-strong">Hi, ich bin Ksenia Glotova - Spezialist für destruktives Refactoring und autodidaktisches Try-and-Error</p>
                    <p className="hero-meta-small">Mein Workflow besteht aus der evolutionären Code-Generierung durch akutes Learning by Doing. Ich beherrsche die Kunst, semantisches HTML und CSS durch destruktives Refactoring komplett auseinanderzunehmen, um überhaupt zu kapieren, wie Webdesign funktioniert.</p>
                </div>
            </div>    
        </section>
        
        <section className="button-section">
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
        </section>
    </div>
  )
}
