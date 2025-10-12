import React from 'react'

const WORDS = [
  'Head', 'Week', 'Today', 'Stomach', 'Police Officer', 'Chicken', 'Engineer',
  'Beef', 'Year', 'March', 'Eight', 'Coffee', 'Story', 'Mistake'
]

export function Words(): JSX.Element {
  return (
    <div className="content">
      <h2 className="title-xl">Words</h2>
      <div className="list">
        {WORDS.map(w => (
          <div key={w} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 600 }}>{w}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


