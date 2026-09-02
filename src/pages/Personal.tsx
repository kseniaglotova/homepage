
import { useState } from 'react'
import './Personal.css'

export function Personal() {

  const meinungen = [
  "Wasser >> Süßgetränke. (Hydro-Homies an die Macht, Zucker blockiert nur das Gehirn).",
  "Mathe >> andere Schulfächer. Zahlen lügen wenigstens nicht.",
  "Fehler passieren. Mir zwar selten, aber sie passieren. (bisschen gelogen)",
];


  const [aktuelleMeinung, setAktuelleMeinung] = useState("IMHO");
  const meinungAendern = ()=> {
      const zufallsIndex = Math.floor(Math.random()*meinungen.length);
            setAktuelleMeinung(meinungen[zufallsIndex]);
  };
  return (
    <main className="personal-page">
    <header className="hero-section">
      <h1>About me</h1>
      <p className="subtitle">Hallo, ich bin Ksenia.</p>
      <p className="tagline">
        Ich mag Dinge, die man verstehen kann. Nicht unbedingt sofort – aber irgendwann 
        <span className="strike"> (wobei.. am besten sofort)</span>.
        </p>
    </header>

    <section className="info-card">
      <h2>Status Quo</h2>
      <ul>
        <li><strong>Studium:</strong> Wirtschaftsinformatik – Data Science (Daten analysieren, um die Welt zu beherrschen).</li>
        <li><strong>Außerhalb davon:</strong> Dinge tun, die absolut nichts mit Code oder Daten zu tun haben.</li>
      </ul>
    </section>

    <section className="info-card">
      <h2>Random Facts</h2>
      <ul>
        <li>Ich programmiere an dieser Website, obwohl ich vorher absolut keinen Plan hatte. TypeScript wird dabei weitesgehend umgangen.</li>
        <li className="interactive-fact">
          <span className="opinion-text">{aktuelleMeinung}</span>
          <button className="opinion-button" onClick={meinungAendern}>
            Meinung ändern 🔄
          </button>
        </li>
        <li>Ich kann nicht lesen. (Außer Fehlermeldungen in der Konsole, die ignoriere ich aber gekonnt).</li>
      </ul>
    </section>

    <section className="info-card future-section">
      <h2>To be continued...</h2>
      <p>Ich weiß absolut nicht, wie diese Seite in der Zukunft aussehen wird.</p>
      <p className="highlight">Spoiler: Wahrscheinlich komplett anders.</p>
    </section>
  </main>
  )
}
