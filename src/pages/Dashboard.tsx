import { useState, useEffect, useRef } from 'react'
import './Dashboard.css'

type DashboardItem = {
  url: string
  uploadedAt: string
  type: 'image' | 'text'
  content?: string
  caption?: string
}

export function Dashboard() {
  const [blogItems, setBlogItems] = useState<DashboardItem[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollDashboard = (direction: -1 | 1) => {
    const slider = sliderRef.current
    const track = slider?.querySelector<HTMLElement>('.dashboard-track')
    const card = track?.querySelector<HTMLElement>('.dashboard-card')
    if (!slider || !track || !card) return

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    slider.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/api/list?category=dashboard')
        if (!response.ok) {
          throw new Error(`Dashboard konnte nicht geladen werden: ${response.status}`)
        }

        const items = await response.json() as DashboardItem[]
        setBlogItems(
          items.sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          )
        )
      } catch (error) {
        console.error('Fehler beim Laden des Dashboards:', error)
      }
    }

    void loadItems()
  }, [])

  return (
    <section className="dashboard-page">
      <header className="dashboard-header">
        <p className="dashboard-kicker">PERSONAL STREAM</p>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-carousel">
        <button
          className="dashboard-arrow"
          type="button"
          aria-label="Vorheriger Beitrag"
          onClick={() => scrollDashboard(-1)}
        >
          ‹
        </button>

        <div className="dashboard-slider" ref={sliderRef}>
          <div className="dashboard-track">
            {blogItems.length === 0 ? (
              <p className="dashboard-empty">Noch keine Beiträge im Dashboard vorhanden.</p>
            ) : blogItems.map((item, index) => (
              <article className="dashboard-card" key={`${item.url}-${index}`}>
                {item.type === 'text' ? (
                  <div className="dashboard-text-content"><p>{item.content}</p></div>
                ) : (
                  <div className="dashboard-image-content">
                    <img src={item.url} alt={`Dashboard Upload ${index + 1}`} />
                    {item.caption && <p className="dashboard-caption">{item.caption}</p>}
                  </div>
                )}
                <div className="dashboard-card-footer">
                  <span>🗓️ {new Date(item.uploadedAt).toLocaleDateString('de-DE')}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          className="dashboard-arrow"
          type="button"
          aria-label="Nächster Beitrag"
          onClick={() => scrollDashboard(1)}
        >
          ›
        </button>
      </div>
    </section>
  )
}
