
import './HomePage.css'
import './Personal.css'
import { CareerTimeline } from './CareerTimeline'
import { HomeInfo } from './HomeInfo'

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
                        <p className="hero-meta-strong">Welcome!</p>
                        <p className="hero-meta-small">
                            Dual Student in Business Informatics - Data Science.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className="personal-page">
                <HomeInfo />
                <CareerTimeline />
            </section>
        </main>
    )
}
