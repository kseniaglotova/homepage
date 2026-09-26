
import './Personal.css'
import './PersonalNotes.css'
import { Link } from 'react-router-dom'
import { Dashboard } from './Dashboard'

const noteCategories = [
  {
    id: 'rides',
    title: 'Rides',
    image: '/notes-icons/motorrad-bild.jpg',
  },
  {
    id: 'food',
    title: 'Food',
    image: '/notes-icons/pizza1.jpg',
  },
  {
    id: 'places',
    title: 'Places',
    image: '/notes-icons/moskau.jpg',
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
          <h1>Notes</h1>
        </header>

        <div className="notes-grid" aria-label="Notizkategorien">
          {noteCategories.map((category) => (
            <Link
              to={`/notes/${category.id}`}
              className="note-card"
              key={category.id}
            >
              <img src={category.image} alt="" className="note-card-image" />
              <span className="note-card-overlay" />
              <span className="note-card-title">{category.title}</span>
            </Link>
          ))}
          <Link to="/bike" className="note-card">
            <img src="/suzuki-sv-seite.png" alt="" className="note-card-image" />
            <span className="note-card-overlay" />
            <span className="note-card-title">Bike</span>
          </Link>
        </div>
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
