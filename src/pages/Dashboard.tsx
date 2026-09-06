import { useState, useEffect } from 'react'
import './Dashboard.css' // Eine eigene CSS-Datei für das Blog-Design

export function Dashboard() {
  const [blogItems, setBlogItems] = useState<any[]>([])

  // Holt die Daten exakt aus der "dashboard"-Kategorie deines Backends
  useEffect(() => {
    async function fetchDashboardItems() {
      try {
        const response = await fetch('/api/list?category=dashboard')
        if (response.ok) {
          const data = await response.json()
          
          // Chronologisch sortieren: Neueste Beiträge ganz nach oben
          const sorted = data.sort((a: any, b: any) => 
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
              
              {/* FIXED: Hier stecken die Befehle jetzt wieder in der magischen geschweiften Klammer */}
              {item.type === 'text' ? (
                <div className="dashboard-text-content">
                  <p>{item.content}</p>
                </div>
              ) : (
                /* FALL B: Der Beitrag ist ein BILD */
                <div className="dashboard-image-content">
                  <img src={item.url} alt={`Dashboard Upload ${index + 1}`} />
                </div>
              )}

              {/* Fußzeile für jeden Post mit dem Datum */}
              <div className="dashboard-card-footer">
                <span>
                  🗓️ {new Date(item.uploadedAt).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} Uhr
                </span>
              </div>

            </div>
          ))
        )}
      </section>
    </main>
  )
}
