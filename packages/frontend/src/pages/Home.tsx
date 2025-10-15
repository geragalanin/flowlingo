import React from 'react'

type Lesson = {
  id: string
  title: string
  subtitle: string
  minutes: number
}

const DUMMY_LESSONS: Lesson[] = [
  { id: '1', title: 'The first encounter', subtitle: 'Speaking class', minutes: 15 },
  { id: '2', title: 'Discussing gastronomy', subtitle: 'Small talk', minutes: 25 },
  { id: '3', title: 'Small talk about the news', subtitle: 'Free talk', minutes: 15 },
  { id: '4', title: 'Travel Dialogue', subtitle: 'Role-Play', minutes: 25 },
]

export function Home(): JSX.Element {
  return (
    <div className="content">
      <div className="page-header">
        <div className="page-title">Lessons</div>
      </div>

      <div className="list">
        {DUMMY_LESSONS.map(lesson => (
          <article className="card" key={lesson.id}>
            <div className="row">
              <div>
                <div style={{ fontWeight: 600 }}>{lesson.title}</div>
                <div className="muted">{lesson.subtitle}</div>
              </div>
              <div className="spacer" />
              <div className="muted" aria-label="duration">{lesson.minutes} min</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}


