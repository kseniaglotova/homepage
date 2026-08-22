import { useParams } from 'react-router-dom'
import './NoteCategory.css'

const imageModules = import.meta.glob(
  '../assets/notes/*/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

export function NoteCategory() {
  const { categoryy } = useParams()

  const images = Object.entries(imageModules)
    .filter(([path]) => path.includes(`/notes/${categoryy}/`))
    .map(([, imageUrl]) => imageUrl)

  const repeatedImages = [...images, ...images]
  const title = categoryy ? categoryy[0].toUpperCase() + categoryy.slice(1) : 'Notes'

  return (
    <main className="note-category-page">
      <header className="note-category-header">
        <p className="note-category-kicker">PERSONAL ARCHIVE</p>
        <h1>{title}</h1>
      </header>

      <section className="horizontal-gallery">
        <div className="horizontal-track">
          {repeatedImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${title} Bild ${index + 1}`}
              className="horizontal-image"
            />
          ))}
        </div>
      </section>
    </main>
  )
}