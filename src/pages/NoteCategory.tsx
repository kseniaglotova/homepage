import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './NoteCategory.css'

// 1. Lokale Bilder vom PC einlesen
const imageModules = import.meta.glob(
    '../assets/notes/*/*.{jpg,jpeg,png,webp}',
    {eager: true, query: '?url', import: 'default'}) as Record<string, string>

export function NoteCategory() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isBlobSelected, setIsBlobSelected] = useState<boolean>(false)
  const { categoryy } = useParams()
  
  // State für die Handy-Bilder von Vercel (inklusive URL und Upload-Datum)
  const [blobImages, setBlobImages] = useState<{ url: string; uploadedAt: string }[]>([]);

  // 2. Lokale Bilder filtern
  const localImages = Object.entries(imageModules)
    .filter(([path]) => path.includes(`/notes/${categoryy}/`))
    .map(([, imageUrl]) => imageUrl)

  // 3. Handy-Bilder live von Vercel Blob laden
  useEffect(() => {
    async function fetchHandyImages() {
      if (!categoryy) return
      try {
        const response = await fetch(`/api/list?category=${categoryy}`)
        if (response.ok) {
          const data = await response.json()
          setBlobImages(data)
        }
      } catch (error) {
        console.error("Fehler beim Laden der Handy-Bilder:", error)
      }
    }

    fetchHandyImages()
  }, [categoryy])

  // Endlos-Schleife NUR für die lokalen PC-Bilder (Exakt wie vorher)
  const repeatedLocalImages = [...localImages, ...localImages, ...localImages]
  
  // Titel-Formatierung (Erster Buchstabe groß)
  const title = categoryy ? categoryy[0].toUpperCase() + categoryy.slice(1) : 'Notes'

  // NEU: Wir sortieren die Handy-Bilder hier direkt nach Datum (Neueste zuerst).
  // Dadurch stimmen Galerie-Ansicht und die Pfeiltasten im Modal perfekt überein!
  const sortedBlobImages = [...blobImages].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  )

  // Bestimmt, aus welcher Liste das vergrößerte Bild kommt
  const currentActiveImages = isBlobSelected ? sortedBlobImages : localImages

  return (
    <main className="note-category-page">
      <header className="note-category-header">
        <p className="note-category-kicker">PERSONAL ARCHIVE</p>
        <h1>{title}</h1>
      </header>

      {/* OBEN: Die originale, horizontale PC-Bilder-Galerie */}
      <section className="horizontal-gallery">
        <div className="horizontal-track">
          {repeatedLocalImages.map((image, index) => (
            <img
              key={`local-${image}-${index}`}
              src={image}
              alt={`${title} Bild ${index + 1}`}
              className="horizontal-image"
              onClick={() => {
                setIsBlobSelected(false) // Sagt dem Modal: PC-Bilder nutzen
                setSelectedIndex(index % localImages.length)
              }}
            />
          ))}
        </div>
      </section>

      {/* UNTEN: Die Handy-Bilder Galerie (Sortiert nach neuestem Upload) */}
      {sortedBlobImages.length > 0 && (
        <section className="blob-uploads-section" style={{ padding: '40px 0', borderTop: '1px solid #eee', marginTop: '40px' }}>
          <p className="note-category-kicker" style={{ marginBottom: '20px' }}>MOBILE UPLOADS</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '16px' 
          }}>
            {sortedBlobImages.map((imageObj, index) => (
              <div 
                key={`blob-${imageObj.url}-${index}`}
                style={{ 
                  width: '100%',
                  aspectRatio: '1 / 1', 
                  overflow: 'hidden',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <img
                  src={imageObj.url}
                  alt={`${title} Upload ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => {
                    setIsBlobSelected(true)
                    setSelectedIndex(index)
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Das originale Modal (Großansicht) */}
      {selectedIndex !== null && currentActiveImages.length > 0 && (
        <div className="image-modal" onClick={() => { setSelectedIndex(null) }}>
          <button
            type="button"
            className="modal-arrow modal-arrow-left"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(
                selectedIndex === 0
                  ? currentActiveImages.length - 1
                  : selectedIndex - 1
              )
            }}
            aria-label="Vorheriges Bild"
          >
            ←
          </button>
          
          <img
            src={
              isBlobSelected 
                ? (currentActiveImages[selectedIndex] as { url: string }).url 
                : (currentActiveImages[selectedIndex] as string)
            }
            alt={`${title} vergrößert`}
            className="modal-image"
          />
          
          <button
            type="button"
            className="modal-arrow modal-arrow-right"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(
                selectedIndex === currentActiveImages.length - 1
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
