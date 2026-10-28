import './Mobility.css'

const imageModules = import.meta.glob(
  '../assets/mobility/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const images = Object.values(imageModules)
const repeatedImages = [...images, ...images, ...images]

export function Mobility() {
  return (
    <main className="mobility-page">
      <header className="mobility-header">
        <h1>Mobility</h1>
      </header>

      {images.length > 0 && (
        <section className="mobility-gallery" aria-label="Mobility-Bilder">
          <div className="mobility-track">
            {repeatedImages.map((image, index) => (
              <img
                key={`${image}-${index}`}
                src={image}
                alt={index < images.length ? `Mobility-Bild ${index + 1}` : ''}
                aria-hidden={index >= images.length}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
