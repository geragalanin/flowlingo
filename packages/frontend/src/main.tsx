import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [apiMessage, setApiMessage] = React.useState<string>('')

  React.useEffect(() => {
    fetch('http://localhost:3000/health')
      .then(r => r.json())
      .then(d => setApiMessage(d.status))
      .catch(() => setApiMessage('API unavailable'))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Langue</h1>
      <p>Backend status: {apiMessage}</p>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
