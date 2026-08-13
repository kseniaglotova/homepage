import { Link } from 'react-router-dom'
import './PersonalPage.css'

export default function PersonalPage() {
  return (
    <div className="personal-container">
      <header className="personal-header">
        <Link to="/" className="back-link">← Zurück zur Homepage</Link>
        <h1>Über mich</h1>
      </header>

      <div className="personal-content">
        <section className="info-section">
          <h2>Persönliche Informationen</h2>
          <p><strong>Name:</strong> Dein Name hier</p>
          <p><strong>Alter:</strong> Dein Alter hier</p>
          <p><strong>Stadt:</strong> Deine Stadt hier</p>
          <p><strong>Beruf:</strong> Dein Beruf hier</p>
        </section>

        <section className="info-section">
          <h2>Über mich</h2>
          <p>
            Hier kannst du einen Text über dich selbst schreiben. 
            Erzähl von deinen Hobbys, Interessen und dem, was dir wichtig ist.
          </p>
        </section>

        <section className="info-section">
          <h2>Fähigkeiten</h2>
          <ul>
            <li>Fähigkeit 1</li>
            <li>Fähigkeit 2</li>
            <li>Fähigkeit 3</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
