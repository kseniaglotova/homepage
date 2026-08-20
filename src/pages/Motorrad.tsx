import { useState } from 'react'
import './motorrad.css'

const sections = {
  'the bike': {
    title: 'The Bike',
    text: <p>test</p>
  },
  'the engine': {
    title: 'The Engine',
    text: 
    <p>test</p>
  },
  'the ride': {
    title: 'The Ride',
    text: 
    <p>test</p>
  },
  'the details': {
    title: 'The Details',
    text: 
    <p>test</p>
  },
  'my sv 650': {
    title: 'My SV 650',
    text: 
    <p>test</p>
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
        <p>{currentSection.text}</p>
      </section>
    </main>
  )
}