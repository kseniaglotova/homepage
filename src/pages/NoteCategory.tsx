import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './NoteCategory.css'

// 1. Deine alten, lokalen Bilder vom PC weiterhin einlesen
const imageModules = import.meta.glob(
    '../assets/notes/*/*.{jpg,jpeg,png,webp}',
    {eager: true, query: '?url', import: 'default'}) as Record<string, string>

export function NoteCategory() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { categoryy } = useParams()
  
  // Neuer State für die Bilder, die vom Handy hochgeladen wurden
  const [blobImages, setBlobImages] = useState<string[]>([])

  // 2. Lokale Bilder filtern
  const localImages = Object.entries(imageModules)
    .filter(([path]) => path.includes(`/notes/${categoryy}/`))
    .map(([, imageUrl]) => imageUrl)

  // 3. Neue Handy-Bilder live von Vercel Blob dazuladen
  useEffect(() => {
    async function fetchHandyImages() {
      if (!categoryy) return
      try {
        const response = await fetch(`/api/list?category=${categoryy}`)
        if (response.ok) {
          const data = await response.json()
          setBlobImages(data) // Speichert die URLs der Handy-Bilder
        }
      } catch (error) {
        console.error("Fehler beim Laden der Handy-Bilder:", error);
      }
    }

    fetchHandyImages()
  }, [categoryy])

  // 4. Kombiniere PC-Bilder und Handy-Bilder in einer einzigen Liste
  const allImages = [...localImages, ...blobImages]

  // Deine bestehende Logik für die Endlos-Schleife (wiederholte Bilder)
  const repeatedImages = [...allImages, ...allImages, ...allImages]
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
              // Korrigiert auf die Gesamtlänge aller Bilder
              onClick={() => setSelectedIndex(index % allImages.length)}
            />
          ))}
        </div>
      </section>

      {/* Dein funktionierendes Modal für die Großansicht */}
      {selectedIndex !== null && allImages.length > 0 && (
        <div className="image-modal" onClick={() => setSelectedIndex(null)}>
          <button
            type="button"
            className="modal-arrow modal-arrow-left"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(
                selectedIndex === 0
                  ? allImages.length - 1
                  : selectedIndex - 1
              )
            }}
            aria-label="Vorheriges Bild"
          >
            ←
          </button>
          
          <img
            src={allImages[selectedIndex]}
            alt={`${title} vergrößert`}
            className="modal-image"
          />
          
          <button
            type="button"
            className="modal-arrow modal-arrow-right"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(
                selectedIndex === allImages.length - 1
                  ? 0
                  : selectedIndex + 1
              )
            }}
            aria-label="Nächstes Bild"
          >
            →
          </button>
        </div>
      )}
    </main>
  )
}
