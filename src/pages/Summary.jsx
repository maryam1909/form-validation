import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// get form data passed via navigation
const Summary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  // if no state show fallback message
  if (!state) return <div><p>No data found</p><button onClick={() => navigate('/')}>Back</button></div>

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  )
}

export default Summary
