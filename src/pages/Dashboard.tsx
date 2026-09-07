import { useState, useEffect } from 'react'
import './Dashboard.css' // Eine eigene CSS-Datei für das Blog-Design

type DashboardItem = {
  url: string
  uploadedAt: string
  type: 'image' | 'text'
  content?: string
  caption?: string
}

export function Dashboard() {
  const [blogItems, setBlogItems] = useState<DashboardItem[]>([])

  // Holt die Daten exakt aus der "dashboard"-Kategorie deines Backends
  useEffect(() => {
    async function fetchDashboardItems() {
      try {
        const response = await fetch('/api/list?category=dashboard')
        if (response.ok) {
          const data = await response.json() as DashboardItem[]
          
          // Chronologisch sortieren: Neueste Beiträge ganz nach oben
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
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="dashboard-kicker">PERSONAL STREAM</p>
        <h1>Dashboard</h1>
      </header>

      <section className="dashboard-timeline">
        {blogItems.length === 0 ? (
          <p className="dashboard-empty">Noch keine Beiträge im Dashboard vorhanden.</p>
        ) : (
          blogItems.map((item, index) => (
            <div key={`dash-${item.url}-${index}`} className="dashboard-card">
              
              {/* FALL A: Reiner TEXT-BLOCK */}
              {item.type === 'text' ? (
                <div className="dashboard-text-content">
                  <p>{item.content}</p>
                </div>
              ) : (
                /* FALL B: BILD (Eventuell mit Caption darunter) */
                <div className="dashboard-image-content">
                  <img src={item.url} alt={`Dashboard Upload ${index + 1}`} />
                  
                  {/* NEU: Wenn eine Caption existiert, blenden wir sie hier ein! */}
                  {item.caption && (
                    <div style={{ padding: '15px 25px', fontSize: '15px', color: '#333', borderTop: '1px solid #f9f9f9', background: '#fff' }}>
                      <p style={{ margin: 0, lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{item.caption}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Fußzeile */}
              <div className="dashboard-card-footer">
                <span>🗓️ {new Date(item.uploadedAt).toLocaleDateString('de-DE')}</span>
              </div>

            </div>
          ))) }
      </section>
    </main>
  )
}
