import { Link } from 'react-router-dom'
import './Notes.css'



const noteCategories = [
  {
    id: 'rides',
    title: 'Rides',
    image: '/motorrad-bild.jpg',
  },
  {
    id: 'food',
    title: 'Food',
    image: '/pizza1.jpg',
  },
  {
    id: 'places',
    title: 'Places',
    image: '/places/russia/moskau.jpg',
  },
  {
    id: 'projects',
    title: 'Projects',
    image: '/homepage-background.jpg',
  },
]

export function Notes() {
  return (
    <main>
      <header className="notes-header">
        <p className="notes-intro-small">PERSONAL ARCHIVE</p>
        <h1>Notes</h1>
        <p className="notes-intro">
          Kleine Sammlungen.
        </p>
      </header>

      <section className="notes-grid" aria-label="Notizkategorien">
        {noteCategories.map((category) => (
          <Link
            to={`/notes/${category.id}`}
            className="note-card"
            key={category.id}
          >
            <img
              src={category.image}
              alt=""
              className="note-card-image"
            />

            <span className="note-card-overlay" />

            <span className="note-card-title">
              {category.title}
            </span>
          </Link>
        ))}
      </section>
    </main>
  )
}