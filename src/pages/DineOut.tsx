import { useEffect, useState } from 'react'
import './Food.css'

type DineOutImage = {
  url: string
  uploadedAt: string
  type?: 'image' | 'text'
  caption?: string
}

export function DineOut() {
  const [images, setImages] = useState<DineOutImage[]>([])
  const [selectedImage, setSelectedImage] = useState<DineOutImage | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/list?category=dineou')
        if (!response.ok) {
          throw new Error('Konnte nicht geladen werden.')
        }

        const items = await response.json() as Array<DineOutImage | string>
        const formattedImages = items
          .map((item) => typeof item === 'string'
            ? { url: item, uploadedAt: '' }
            : item)
          .filter((item) => item.type !== 'text')
          .sort((a, b) => Date.parse(b.uploadedAt) - Date.parse(a.uploadedAt))

        setImages(formattedImages)
      } catch (loadError) {
        setError(loadError instanceof Error
          ? loadError.message
          : 'Konnte nicht geladen werden.')
      }
    }

    loadImages()
  }, [])

  return (
    <main className="food-page">
      <header className="food-header">
        <h1>DineOut</h1>
      </header>

      {error && <p className="food-message" role="alert">{error}</p>}
      {!error && images.length === 0 && (
        <p className="food-message">Noch keine Bilder vorhanden.</p>
      )}

      {images.length > 0 && (
        <section className="food-grid" aria-label="Food-Bilder">
          {images.map((image, index) => (
            <article className="food-card" key={`${image.url}-${index}`}>
              <button
                type="button"
                className="food-image-button"
                onClick={() => setSelectedImage(image)}
                aria-label={`Bild ${index + 1} vergrößern`}
              >
                <img src={image.url} alt={image.caption || `Food-Bild ${index + 1}`} />
              </button>
              {image.caption && <p className="food-description">{image.caption}</p>}
              {image.uploadedAt && (
                <div className="food-card-footer">
                  <span>🗓️ {new Date(image.uploadedAt).toLocaleDateString('de-DE')}</span>
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {selectedImage && (
        <div
          className="food-modal"
          onClick={() => setSelectedImage(null)}
          role="presentation"
        >
          <button
            type="button"
            className="food-modal-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Bild schließen"
          >
            ×
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.caption || 'Food-Bild vergrößert'}
            onClick={(event) => event.stopPropagation()}
          />
          {selectedImage.caption && (
            <p onClick={(event) => event.stopPropagation()}>{selectedImage.caption}</p>
          )}
        </div>
      )}
    </main>
  )
}
