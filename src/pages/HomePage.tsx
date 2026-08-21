import { Link } from 'react-router-dom'
import { mainCategories } from '../mainCategories'
import './HomePage.css'

export function HomePage() {
    return (
        <main className="home-page">
            <section className="hero-banner">
                <div className="hero-content">
                    <div className="hero-title">
                        <p className="hero-kicker">PERSONAL SPACE / 2026</p>
                        <h1>Ksenia<br />Glotova</h1>
                    </div>

                    <div className="hero-meta">
                        <p className="hero-meta-strong">Learning by doing.</p>
                        <p className="hero-meta-small">
                            Hallo, das ist meine Website.
                        </p>
                    </div>
                </div>
            </section>

            <section className="button-section">
                <div className="section-heading">
                    <p className="section-kicker">EXPLORE</p>
                    <h2>Meine Bereiche</h2>
                </div>

                <div className="button-grid">
                    {mainCategories.map((category, index) => (
                        <Link
                            key={category.path}
                            to={category.path}
                            className="category-box"
                            style={{ '--card-index': index } as React.CSSProperties}
                        >
                            <span className="category-number">0{index + 1}</span>
                            <span className="category-label">{category.label}</span>
                            <span className="category-arrow">↗</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}
