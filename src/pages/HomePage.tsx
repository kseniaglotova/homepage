
import './HomePage.css'
import './Personal.css'

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
        <li><strong>Programming Languages:</strong> TypeScript, JavaScript, C#</li>
        <li><strong>Frameworks & Libraries:</strong> React, Vite</li>
        <li><strong>Tools:</strong> VS Code, Git</li>
      </ul>
    </section>
    </section>
        </main>
    )
}
