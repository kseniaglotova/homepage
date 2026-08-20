import { useState } from 'react'
import './motorrad.css'

const sections = {
  'the bike': {
    title: 'The Bike',
    content: (
        <>
        <p>Die Suzuki SV650 ist kein Motorrad, das versucht, mit maximalen Zahlen zu beeindrucken. Ihre Stärke liegt woanders: 645 cm³, ein 90°-V-Twin, schlanke 198 kg und ein Fahrwerk, das sie gleichzeitig handlich und erwachsen macht.</p>
        <p>Seit ihrer Einführung 1999 hat sich die SV650 zu einem der bekannten V2-Allrounder entwickelt. Suzuki selbst beschreibt sie als Motorrad für Stadt, Landstraße und sogar Rennstrecke.</p>
        <p>Die wichtigsten Daten:</p>
        <table className="spec-table">
    <thead>
      <tr>
        <th colSpan={2}>Suzuki SV650 · 2020</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="spec-label">Motor</td>
        <td className="spec-value">2-Zylinder V-Twin, 90°</td>
      </tr>
      <tr>
        <td className="spec-label">Hubraum</td>
        <td className="spec-value">645 cm³</td>
      </tr>
      <tr>
        <td className="spec-label">Bauart</td>
        <td className="spec-value">4-Takt, DOHC, flüssigkeitsgekühlt</td>
      </tr>
      <tr>
        <td className="spec-label">Bohrung × Hub</td>
        <td className="spec-value">81,0 × 62,6 mm</td>
      </tr>
      <tr>
        <td className="spec-label">Verdichtung</td>
        <td className="spec-value">11,2 : 1</td>
      </tr>
      <tr>
        <td className="spec-label">Serienleistung</td>
        <td className="spec-value">56 kW / 76 PS bei 8.500 U/min</td>
      </tr>
      <tr>
        <td className="spec-label">Drehmoment</td>
        <td className="spec-value">64 Nm bei 8.100 U/min</td>
      </tr>
      <tr>
        <td className="spec-label">Getriebe</td>
        <td className="spec-value">6-Gang</td>
      </tr>
      <tr>
        <td className="spec-label">Kraftstoffsystem</td>
        <td className="spec-value">Elektronische Einspritzung</td>
      </tr>
      <tr>
        <td className="spec-label">Tankvolumen</td>
        <td className="spec-value">14,5 Liter</td>
      </tr>
      <tr>
        <td className="spec-label">Gewicht fahrfertig</td>
        <td className="spec-value">ca. 198 kg</td>
      </tr>
      <tr>
        <td className="spec-label">Sitzhöhe</td>
        <td className="spec-value">785 mm</td>
      </tr>
      <tr>
        <td className="spec-label">Radstand</td>
        <td className="spec-value">1.445 mm</td>
      </tr>
      <tr>
        <td className="spec-label">Abmessungen (L × B × H)</td>
        <td className="spec-value">2.140 × 760 × 1.090 mm</td>
      </tr>
      <tr>
        <td className="spec-label">Bodenfreiheit</td>
        <td className="spec-value">135 mm</td>
      </tr>
      <tr>
        <td className="spec-label">Endantrieb</td>
        <td className="spec-value">Kette</td>
      </tr>
    </tbody>
  </table>
        </>
    )
    
},
  'the engine': {
    title: 'The Engine',
    content: (
      <>
        <p>Die Suzuki SV650 hat einen Motor, der erstmal nicht sonders spektakulär klingt: 645 cm³, zwei Zylinder, 76 PS. Interessant wird es bei der Bauart.</p>
        <p>Im Rahmen sitzt ein 90°-V2-Motor, dessen ungewöhnliche Zündfolge für den charakteristischen Klang und eine lineare Kraftentfaltung sorgt. Die 645 cm³ verteilen sich auf zwei Zylinder. Das maximale Drehmoment von 64 Nm liegt bei 8.100 U/min, die maximale Leistung von 56 kW (76 PS) bei 8.500 U/min.</p>
        <p>Dabei ist der Motor nicht nur auf hohe Drehzahlen ausgelegt. Schon im unteren Drehzahlbereich liefert der V2 ordentlich Drehmoment, während er in der Mitte ruhig und kontrollierbar bleibt. Nach oben wird er zunehmend drehfreudiger. Genau diese Kombination macht die SV650 so vielseitig: entspannt durch die Stadt oder deutlich sportlicher über kurvige Landstraßen.</p>
        <p>Technisch steckt ebenfalls einiges darin. Jeder Zylinder besitzt zwei Zündkerzen – Suzukis Dual-Spark-System. Die elektronische SDTV-Einspritzung arbeitet mit zwei Drosselklappen pro Zylinder, um Gasannahme und Leistungsentfaltung zu optimieren. Dazu kommt eine spezielle SCEM-Beschichtung der Aluminiumzylinder, die Wärmeableitung und Verschleißfestigkeit verbessern soll.</p>
        <p>Und dann gibt es noch zwei kleine Helfer, die man während der Fahrt tatsächlich bemerkt:</p>
        <p>Low RPM Assist erhöht beim Anfahren beziehungsweise bei sehr niedriger Geschwindigkeit automatisch leicht die Drehzahl. Dadurch sinkt die Gefahr, den Motor beim Anfahren abzuwürgen. Das Suzuki Easy-Start-System übernimmt dagegen den Startvorgang nach einem Druck auf den Starterknopf automatisch.</p>
      </>
    ),
  },
  'the ride': {
    title: 'The Ride',
    content: (
        <>
        <p>Die SV650 ist kein Motorrad, das durch enorme Größe Eindruck machen möchte. Im Gegenteil: Sie ist bewusst schlank und relativ leicht</p>
        <p>Mit 198 kg fahrfertigem Gewicht inklusive ABS, einer Sitzhöhe von 785 mm und einer Breite von gerade einmal 760 mm gehört sie zu den handlicheren Motorrädern ihrer Klasse.</p>
        <p>Ein großer Teil dieses Charakters kommt vom Stahl-Gitterrohrrahmen. Er hält die Silhouette schmal und lässt gleichzeitig den V2-Motor offen sichtbar im Zentrum des Motorrads sitzen. Besonders beim schwarzen Modell mit rotem Rahmen wird der Motor dadurch fast selbst zu einem Designelement.</p>
        <p>Vorne arbeitet eine 41-mm-Teleskopgabel, hinten ein Zentralfederbein. Die Federvorspannung des hinteren Federbeins lässt sich einstellen, sodass das Fahrwerk an unterschiedliche Belastungen angepasst werden kann.</p>
        <p>Auch bei den Bremsen setzt Suzuki auf eine vergleichsweise klassische, aber solide Kombination: Vorne: zwei 290-mm-Bremsscheiben, Hinten: eine 240-mm-Bremsscheibe, ABS: serienmäßig</p>
        <p>Das ABS-System stammt von Nissin. Suzuki gibt an, dass die Steuerung die Raddrehzahl überwacht und für eine präzise Brems- und Stabilitätskontrolle zahlreiche Sensordaten verarbeitet.</p>
        <p>Auf der Straße sorgen 17-Zoll-Räder und Radialreifen für die Verbindung zum Asphalt: 120/70 ZR17 vorne, 160/60 ZR17 hinten</p>
        <p>Die Kombination aus relativ geringem Gewicht, schmaler Bauweise und V2-Motor ist letztlich das, was die SV650 ausmacht.</p>
        <p>Sie versucht nicht, das schnellste Motorrad auf dem Papier zu sein.</p>
        <p>Sie versucht, sich leicht, direkt und kontrollierbar anzufühlen.</p>
        </>
    )
  },
  'the details': {
    title: 'The Details',
    content: (
        <>
        <p>Optisch ist die SV650 eine Mischung aus klassischem Naked Bike und moderner Technik.</p>
        <p>Vorne sitzt der charakteristische runde Multireflektor-Scheinwerfer. Dahinter befindet sich eine vollständig digitale LCD-Instrumenteneinheit. Sie zeigt deutlich mehr als nur Geschwindigkeit und Drehzahl: Gang, Kilometerstand, Tageskilometer, aktuellen und durchschnittlichen Verbrauch, Restreichweite, Uhrzeit, Kühlmitteltemperatur und Tankfüllstand können abgerufen werden.</p>
        <p>Das Heck ist bewusst kompakt gehalten. Das kombinierte Rück- und Bremslicht arbeitet mit LEDs und trägt damit zum schlanken Heckdesign bei.</p>
        <p>Auch der Tank ist interessant: Obwohl er 14,5 Liter fasst, wurde er relativ schmal gestaltet. Suzuki kombiniert dabei die klassische Tankform mit einem modernen Naked-Bike-Aufbau.</p>
        <p>Das Design der SV650 ist generell eher zurückhaltend. Kein riesiges Windschild, keine gewaltigen Verkleidungsteile und keine überdimensionierte Elektronik.</p>
        <p>Stattdessen sieht man: Tank. Rahmen. Motor. Auspuff. Räder.</p>
        <p>Und genau deshalb lässt sich die SV650 relativ leicht individualisieren. Suzuki selbst beschreibt die einfache Grundausführung ausdrücklich als Basis für verschiedenes Zubehör und individuelle Umbauten.</p>
        <p>Ein paar kleine Details:, 14,5-Liter-Tank, 785 mm Sitzhöhe, 135 mm Bodenfreiheit, 1.445 mm Radstand, 2.140 mm Länge, 760 mm Breite, 1.090 mm Höhe, 5-Speichen-Aluminiumfelgen, schlauchlose Radialreifen, LED-Rück-/Bremslicht, digitales LCD-Cockpit, elektrischer Starter, 6-Gang-Getriebe, einstellbare Federvorspannung hinten, ABS</p>
        <p>Und ein schönes Detail für eine Website: Suzuki gab für die SV650 unter den WMTC-Messbedingungen einen Verbrauch von 3,9 l/100 km an.</p>
        </>
    )
  },
  'my sv 650': {
    title: 'My SV 650',
    content: (
        <>
        <p>Auf dem Papier ist sie eine Suzuki SV650 aus dem Jahr 2020.</p>
        <p>Auf der Straße ist sie allerdings nicht mehr ganz serienmäßig.</p>
        <p>Das Grunddesign der SV650 bildet dabei die Basis: schwarze Karosserie, roter Gitterrohrrahmen und rote Akzente an den Rädern. Dazu kommen einige Änderungen, die das Motorrad deutlich cleaner wirken lassen.</p>
        <p>Das verkürzte Kennzeichen reduziert die optische Länge des Hecks und lässt es deutlich kompakter wirken.</p>
        <p>Statt der serienmäßigen Spiegel sitzen runde Lenkerendenspiegel am Lenker. Sie sind nach unten ausgerichtet und verschwinden dadurch optisch stärker aus der Silhouette des Motorrads.</p>
        <p>Statt den orignalen Lenker wurde ein geraderes Modell verbaut, wodurch die Sitzhaltung und das Gefühl beim Fahren optimiert wurde.</p>
        <p>Das Ergebnis ist eine SV650, die etwas minimalistischer wirkt als die Serienversion.</p>
        <p>Nicht unnötig kompliziert. Einfach ein Motorrad mit Charakter.</p>
        </>
    )
  },
}

const sectionNames = [
  'the bike',
  'the engine',
  'the ride',
  'the details',
  'my sv 650',
] as const

export function Motorrad() {
  const [activeSection, setActiveSection] =
    useState<(typeof sectionNames)[number]>('the bike')

  const currentSection = sections[activeSection]

  return (
    <main className="motorcycle-page">
      <section className="motorcycle-hero">
        <h1>Suzuki SV 650</h1>

        <img
          src="/suzuki-sv-seite.png"
          alt="Suzuki SV 650"
          className="motorcycle-image"
        />
      </section>

      <nav className="motorcycle-tabs">
  {sectionNames.map((sectionName) => (
    <button
      type="button"
      key={sectionName}
      className={activeSection === sectionName ? 'active' : ''}
      onClick={() => setActiveSection(sectionName)}
    >
      {sections[sectionName].title}
    </button>
  ))}
</nav>

      <section className="motorcycle-content">
        <h2>{currentSection.title}</h2>
        <div className="section-content">{currentSection.content}</div>
      </section>
    </main>
  )
}