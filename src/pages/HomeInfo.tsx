import { useState, useRef } from 'react'
import './HomeInfo.css'

export function HomeInfo(){
    type InfoCard = {
        id: string
        title: string
        expandable: boolean
        items: {label: string; text: string} []
    }
    const infoCards: InfoCard[] = [
        {
            id: 'education',
            title: 'Education',
            expandable: false,
            items: [
                {
                    label: 'Dual Study Program:',
                    text: 'Business Informatics - Data Science | 2026 - Present',
                },
                {
                    label: 'Abitur (GPA 1.3):',
                    text: 'Advanced Courses: Mathematics, Physics, Chemistry',
                },
            ],
        },
        {
            id: 'tech',
            title: 'Tech-Stack & Skills',
            expandable: true,
            items: [
                {
                    label: 'Programming Languages:',
                    text: 'TypeScript, JavaScript, C#, Python',
                },
                {
                    label: 'Frameworks & Libraries:',
                    text: 'React, Vite, HTML5, CSS3',
                },
                {
                    label: 'Tools:',
                    text: 'VS Code, Git, GitHub, Node.js',
                },
                {
                    label: 'Additional Skills:',
                    text: 'Search Engine Optimization (SEO), Website Optimization, Web Development, Desktop Application Development, Google API Integration',
                },
            ],
        },
        {
            id: 'personal',
            title: 'Personal',
            expandable: false,
            items: [
                {
                    label: 'Languages:',
                    text: 'German, Russian, English',
                },
                {
                    label: 'Driving Licenses:',
                    text: 'Class A2 (Motorcycle), Class B (Car)',
                },
            ],
        },
        {
            id: 'experience',
            title: 'Experience',
            expandable: true,
            items: [
                {
                    label: 'Content Management:',
                    text: 'Erstellung und Optimierung von Produktbeschreibungen, Kategorietexten und Landingpages.',
                },
                {
                    label: 'SEO:',
                    text: 'Keyword-Recherche, Analyse der Suchintention, Erstellung von Meta-Titeln und Meta-Beschreibungen sowie Onpage-Optimierung.',
                },
                {
                    label: 'GEO / KI-Sichtbarkeit:',
                    text: 'Aufbereitung von Inhalten, damit diese von KI-Suchsystemen wie ChatGPT, Google AI Overviews und anderen KI-Assistenten verstanden und als relevante Informationsquelle genutzt werden können.',
                },
                {
                    label: 'Technische Produktrecherche:',
                    text: 'Prüfung von Herstellerangaben, Vergleich technischer Daten sowie Korrektur fehlerhafter oder widersprüchlicher Informationen.',
                },
                {
                    label: 'Produktdatenmanagement:',
                    text: 'Pflege und Vereinheitlichung von Produktattributen, technischen Spezifikationen, FAQs und Produktinformationen.',
                },
                {
                    label: 'Internationalisierung:',
                    text: 'Übersetzung und Anpassung von Produktinhalten für internationale Märkte.',
                },
                {
                    label: 'Qualitätssicherung:',
                    text: 'Prüfung von Produktseiten auf fachliche Korrektheit, Vollständigkeit, Verständlichkeit und Suchmaschinenoptimierung.',
                },
            ],
        },
    ]

    const [expandedCardIds, setExpandedCardIds] = useState<string[]>([])
    const sliderRef = useRef<HTMLDivElement>(null)


    const scrollCards = (direction: -1 | 1) => {
        const slider = sliderRef.current
        const track = slider?.querySelector<HTMLElement>('.home-info-track')
        const card = track?.querySelector<HTMLElement>('.home-info-card')

        if (!slider || !track || !card) return

        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
        slider.scrollBy({
            left: direction * (card.offsetWidth + gap),
            behavior: 'smooth',
        })
    }
    return (


        <div className="home-info-carousel">
            <button
                type="button"
                className="home-info-arrow"
                aria-label="Vorherige Info-Karte"
                onClick={() => scrollCards(-1)}
            >
                ‹
            </button>

            <div
                className="home-info-slider"
                ref={sliderRef}
                role="region"
                aria-label="Informationen"
                tabIndex={0}
            >
                <div className="home-info-track">
                        {infoCards.map((card) =>{
                            const isExpanded = expandedCardIds.includes(card.id)
                            return (
                                <article
                                    className={`home-info-card${isExpanded ? ' is-expanded' : ''}`}
                                    key={card.id}
                                >
                                    <h3>{card.title}</h3>
                                    <div 
                                        id={`info-card-content-${card.id}`}
                                        className="home-info-card-body">
                                        <ul>
                                            {card.items.map((item) => (
                                                <li key={item.label}>
                                                    <strong>{item.label}</strong> {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {card.expandable && (
                                        <button
                                            className="home-info-more"
                                            type="button"
                                            aria-expanded={isExpanded}
                                            aria-controls={`info-card-content-${card.id}`}
                                            onClick={() =>
                                                setExpandedCardIds((current) =>
                                                    isExpanded
                                                        ? current.filter((id) => id !== card.id)
                                                        : [...current, card.id],
                                                )
                                            }
                                        >
                                            {isExpanded ? 'Weniger anzeigen' : 'Mehr lesen'}
                                        </button>
                                    )}
                                </article>
                            )
                        })}
                </div>
            </div>

            <button
                type="button"
                className="home-info-arrow"
                aria-label="Nächste Info-Karte"
                onClick={() => scrollCards(1)}
            >
                ›
            </button>
        </div>
    )
}