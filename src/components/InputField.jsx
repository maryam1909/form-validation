import React from 'react'
//reusable component for handling input fields with validation and styling
const InputField = ({ label, name, value, onChange, onBlur, error, type = 'text' }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}:</label><br />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ padding: '8px', width: '100%', borderColor: error ? 'red' : '#ccc' }}
      />
      {error && <span style={{ color: 'red', fontSize: '0.9em' }}>{error}</span>}
    </div>
  )
}

export default InputField
