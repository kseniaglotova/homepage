import { Link } from 'react-router-dom'
import { mainCategories } from '../mainCategories'
import './HomePage.css'

export function HomePage() {

  return (
    
    <div className="home-page">
        <section className="hero-banner">
            <div className="hero-content">
                <div className="hero-title">
                    <h1>Ksenia Glotova</h1>
                </div>
                <div className="hero-meta">
                    <p className="hero-meta-strong">Hi, ich bin Ksenia Glotova - Spezialist für destruktives Refactoring und autodidaktisches Try-and-Error</p>
                    <p className="hero-meta-small">Mein Workflow besteht aus der evolutionären Code-Generierung durch akutes Learning by Doing. Ich beherrsche die Kunst, semantisches HTML und CSS durch destruktives Refactoring komplett auseinanderzunehmen, um überhaupt zu kapieren, wie Webdesign funktioniert.</p>
                </div>
            </div>    
        </section>
        
    <section className="button-section">
        <div className="button-grid">
            {mainCategories.map((category) => (
                <Link
                    key={category.path}
                    to={category.path}
                    className="category-box"
                >
                {category.label}
                </Link>
        ))}
        </div>
    </section>
    </div>
  )
}
