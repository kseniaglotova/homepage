
import './Personal.css'
import './PersonalNotes.css'
import { Link } from 'react-router-dom'
import { Dashboard } from './Dashboard'

const noteCategories = [
  {
    id: 'mobility',
    title: 'Mobility',
    image: '/suzuki-sv-seite.png',
  },
  {
    id: 'food',
    title: 'Food',
    image: '/icons/pizza-icon.png',
  },
    {
    id: 'dine-out',
    title: 'Dine Out',
    image: '/icons/steak-stg-icon.png',
  },
]

export function Personal() {
  return (
    <main className="personal-page">
      <header className="hero-section">
        <p className="subtitle">Hallo, ich bin Ksenia.</p>
        <p className="tagline">
          Ich mag Dinge, die man verstehen kann. Nicht unbedingt sofort – aber irgendwann
          <span className="strike"> (wobei.. am besten sofort)</span>.
        </p>
      </header>
      <section className="personal-notes">
        <header className="notes-header">
          <p className="notes-intro-small">PERSONAL ARCHIVE</p>
        </header>

        <nav className="notes-grid" aria-label="Notizkategorien">
          {noteCategories.map((category) => (
            <Link
              to={`/${category.id}`}
              className="note-card"
              key={category.id}
              aria-label={category.title}
            >
              <img src={category.image} alt="" className="note-card-image" />
            </Link>
          ))}
        </nav>
      </section>

      <Dashboard />
      <section className="info-card future-section">
        <h2>To be continued...</h2>
        <p>Ich weiß absolut nicht, wie diese Seite in der Zukunft aussehen wird.</p>
        <p className="highlight">Spoiler: Wahrscheinlich komplett anders.</p>
      </section>
    </main>
  )
}
