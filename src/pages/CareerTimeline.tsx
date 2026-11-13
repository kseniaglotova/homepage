import {useState} from 'react'
import './CareerTimeline.css'

type CareerEvent = {
    id: string;
    date: string;
    title: string;
    description: string;
}

const careerEvents: CareerEvent[] = [
    {
        id: 'abitur',
        date: '2026',
        title: 'Abitur (GPA 1.3)',
        description: 'Advanced Courses: Mathematics, Physics, Chemistry',
    },
    {
        id: 'seo',
        date: '05.2025 - 09.2026',
        title: 'Online-Unternehmen (SEO)',
        description: 'E-Commerce Content Management, Technical Content, SEO & GEO-Optimierung'
    },
    {
        id: 'studium',
        date: '2026',
        title: 'Dual Study Program – Business Informatics (Data Science)',
        description: 'Robert Bosch GmbH × DHBW Stuttgart'
    }
]

export function CareerTimeline() {
    const[openEventId, setOpenEventId] = useState<string | null>(null)

    return (
        <section className="career-section" aria-labelledby="career-heading">
            <p className="section-kicker">PROFESSIONAL CAREER</p>
            <h2 id="career-heading">TimeLine</h2>

        <div
        className="career-timeline-scroll"
        role="region"
        aria-label="Professional Background – Horizontally Scrollable Timeline"
        tabIndex={0}
      >
        <ol className="career-timeline">
            {careerEvents.map((event) => {
                const isOpen = openEventId === event.id
                const detailId = `career-detail-${event.id}`
                return (
                    <li className="career-timeline-item" key={event.id}>
                <article className="career-timeline-card">
                  <p className="career-timeline-date">{event.date}</p>

                  <button
                    className="career-timeline-title"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() =>
                      setOpenEventId(isOpen ? null : event.id)
                    }
                  >
                    {event.title}
                  </button>

                  <div
                    className="career-timeline-detail"
                    id={detailId}
                    hidden={!isOpen}
                  >
                    <p>{event.description}</p>
                  </div>
                </article>           
                    </li>
                )
            })}
        </ol>

      </div>
        </section>
    )
}