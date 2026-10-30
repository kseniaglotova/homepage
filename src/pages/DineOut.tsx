import { useEffect, useState } from 'react'
import './DineOut.css'

type DineOutImage = {
  url: string
  caption?: string
}

export function DineOut() {
  const [images, setImages] = useState<DineOutImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/list?category=dineout')

        if (!response.ok) {
          throw new Error('Dine-Out-Bilder konnten nicht geladen werden.')
        }

        const imageList = await response.json() as DineOutImage[]
        setImages(imageList)
      } catch (loadError) {
        setError(loadError instanceof Error
          ? loadError.message
          : 'Dine-Out-Bilder konnten nicht geladen werden.')
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [])

  return (
    <main className="dineout-page">
      <header className="dineout-header">
        <h1>Dine Out</h1>
      </header>

      {isLoading && <p className="dineout-message">Bilder werden geladen...</p>}
      {!isLoading && error && (
        <p className="dineout-message" role="alert">{error}</p>
      )}
      {!isLoading && !error && images.length === 0 && (
        <p className="dineout-message">Noch keine Bilder vorhanden.</p>
      )}

      {!isLoading && !error && images.length > 0 && (
        <section className="dineout-grid" aria-label="Dine-Out-Bilder">
          {images.map((image) => (
            <article className="dineout-card" key={image.url}>
              <img
                className="dineout-image"
                src={image.url}
                alt={image.caption || 'Dine-Out-Bild'}
              />
              <div className="dineout-caption">
                {image.caption && <p>{image.caption}</p>}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}