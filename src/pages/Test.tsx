import { useState } from 'react'
import './Test.css'

const SECRET_PASSWORD = 'grr'

export function SecretTestPage() {
  const [password, setPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [showPassword, setShowPassword] = useState(false)
  function checkPassword(){
    if (password === SECRET_PASSWORD){
      setIsUnlocked(true)
      setHasError(false)
    } else{
      setHasError(true)
    }
  }
  if (isUnlocked){
    return <Test />
  }

return (
  <main className="secret-gate">
    <div className="secret-box">
      <div className="secret-lock">🔒</div>
      <h1>Secret Space</h1>

      <p>Nur für Personen mit dem richtigen Passwort.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          checkPassword()
        }}
      >
        <div className="secret-input-row">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={showPassword ? `Passwort: ${SECRET_PASSWORD}` : 'Passwort'}
            autoFocus
          />

          <button type="submit">Öffnen</button>
        </div>

        <div className="password-row">
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? 'Verstecken' : 'Passwort anzeigen'}
          </button>
        </div>
      </form>


      {hasError && <p className="secret-error">Falsches Passwort.</p>}
    </div>
  </main>
)
}

export function Test() {
  const [keks, setKeks] = useState(0)
  const [message, setMessage] = useState('Warte auf Befehle...')
  const [alarmActive, setAlarmActive] = useState(false)

  function handleCookieClick() {
    const newAmount = keks + 1
    setKeks(newAmount)

    if (newAmount === 1) {
      setMessage('Du hast einen Keks bekommen! 🍪')
    } else if (newAmount === 2) {
      setMessage('Noch ein Keks. Das eskaliert schnell. 🍪🍪')
    } else {
      setMessage(`Keks-Level ${newAmount}: Krümelmonster-Modus aktiviert.`)
    }
  }

  function handleAlarmClick() {
    setAlarmActive(true)
    setMessage('ALARM! Ich habe gesagt: nicht drücken!')

    setTimeout(() => {
      setAlarmActive(false)
      setMessage('Der Alarm wurde wieder beruhigt.')
    }, 1200)
  }

  return (
    <main className={`secret-page ${alarmActive ? 'alarm-active' : ''}`}>
      <section className="secret-content">
        <p className="secret-label">CLASSIFIED / TEST 001</p>

        <h1>Streng geheimer Bereich</h1>

        <p>
          Glückwunsch. Du hast das Passwort gefunden.
        </p>

        <div className="secret-buttons">
          <button type="button" onClick={handleCookieClick}>
            Keks abholen 🍪
          </button>

          <button type="button" onClick={handleAlarmClick}>
            Nicht drücken
          </button>
        </div>

        <p className="secret-message">{message}</p>
      </section>
    </main>
  )
}