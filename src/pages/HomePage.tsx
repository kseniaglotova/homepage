
import './HomePage.css'
import './Personal.css'
import { CareerTimeline } from './CareerTimeline'

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
                <section className="info-card">
                <h2>Education</h2>
                <ul>
                    <li><strong>Dual Study Program:</strong> Business Informatics - Data Science | 2026 - Present</li>
                    <li><strong>Abitur (GPA 1.3):</strong> Advanced Courses: Mathematics, Physics, Chemistry</li>
                </ul>
                </section>

                <section className="info-card">
                <h2>Tech-Stack & Skills</h2>
                <ul>
                    <li><strong>Programming Languages:</strong> TypeScript, JavaScript, C#, Python</li>
                    <li><strong>Frameworks & Libraries:</strong> React, Vite, HTML5, CSS3,</li>
                    <li><strong>Tools:</strong> VS Code, Git, GitHub, Node.js</li>
                    <li><strong>Additional Skills:</strong>Search Engine Optimization (SEO) - Website Optimization - (Web Development) - (Desktop Application Development) - (Google API Integration)</li>
                </ul>
                </section>
                <section className="info-card">
                <h2>Personal</h2>
                <ul>
                    <li><strong>Languages:</strong> German - Russian - English</li>
                    <li><strong>Driving Licenses:</strong> Class A2 (Motorcycle) - Class B (Car)</li>
                   </ul>
                </section>
                                <section className="info-card">
                <h2>Exerience</h2>
                <ul>
                <li>
                    <strong>Content Management:</strong>
                    Erstellung und Optimierung von Produktbeschreibungen, Kategorietexten und Landingpages.
                </li>
                <li>
                    <strong>SEO:</strong>
                    Keyword-Recherche, Analyse der Suchintention, Erstellung von Meta-Titeln und Meta-Beschreibungen sowie Onpage-Optimierung.
                </li>
                <li>
                    <strong>GEO / KI-Sichtbarkeit:</strong>
                    Aufbereitung von Inhalten, damit diese von KI-Suchsystemen wie ChatGPT, Google AI Overviews und anderen KI-Assistenten verstanden und als relevante Informationsquelle genutzt werden können.
                </li>
                <li>
                    <strong>Technische Produktrecherche:</strong>
                    Prüfung von Herstellerangaben, Vergleich technischer Daten sowie Korrektur fehlerhafter oder widersprüchlicher Informationen.
                </li>
                <li>
                    <strong>Produktdatenmanagement:</strong>
                    Pflege und Vereinheitlichung von Produktattributen, technischen Spezifikationen, FAQs und Produktinformationen.
                </li>
                <li>
                    <strong>Internationalisierung:</strong>
                    Übersetzung und Anpassung von Produktinhalten für internationale Märkte.
                </li>
                <li>
                    <strong>Qualitätssicherung:</strong>
                    Prüfung von Produktseiten auf fachliche Korrektheit, Vollständigkeit, Verständlichkeit und Suchmaschinenoptimierung.
                </li>
                </ul>

                </section>
                <CareerTimeline />
            </section>
        </main>
    )
}
