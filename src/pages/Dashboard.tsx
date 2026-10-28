import { useState, useEffect } from 'react'
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

  useEffect(() => {
    async function fetchDashboardItems() {
      try {
        const response = await fetch('/api/list?category=dashboard')
        if (response.ok) {
          const data = await response.json() as DashboardItem[]
          
          const sorted = data.sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          )
          setBlogItems(sorted)
        }
      } catch (error) {
        console.error("Fehler beim Laden des Dashboards:", error)
      }
    }

    fetchDashboardItems()
  }, [])

  return (
    <section className="dashboard-page">
      <header className="dashboard-header">
        <p className="dashboard-kicker">PERSONAL STREAM</p>
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-slider">
        <div className="dashboard-track">
        {blogItems.length === 0 ? (
          <p className="dashboard-empty">Noch keine Beiträge im Dashboard vorhanden.</p>
        ) : (
          blogItems.map((item, index) => (
              <article key={`dash-${item.url}-${index}`} className="dashboard-card">
              {item.type === 'text' ? (
                <div className="dashboard-text-content">
                  <p>{item.content}</p>
                </div>
              ) : (
                <div className="dashboard-image-content">
                  <img src={item.url} alt={`Dashboard Upload ${index + 1}`} />
                  {item.caption && (
                    <p className="dashboard-caption">{item.caption}</p>
                  )}
                </div>
              )}

              <div className="dashboard-card-footer">
                <span>🗓️ {new Date(item.uploadedAt).toLocaleDateString('de-DE')}</span>
              </div>
            </article>
          ))) }
        </div>
      </div>
    </section>
  )
}
