import React, { useState } from 'react'
import InputField from '../components/InputField' // reusable input component
import { validateField } from '../utils/validators' // validation logic for each field
import { useNavigate } from 'react-router-dom' 

const cityOptions = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'San Francisco'],
  Germany: ['Berlin', 'Munich']
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '',
    password: '', phoneCode: '+91', phoneNumber: '',
    country: '', city: '', pan: '', aadhar: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

   // handles value change in input fields
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
    if (name === 'country') {
      setFormData(prev => ({ ...prev, city: '' })) // reset city
    }
  }
  // trigger validation on blur
  const handleBlur = e => {
    const { name, value } = e.target
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
  }

  const isValidForm = () =>
    Object.values(formData).every(val => val) &&
    Object.values(errors).every(err => !err)
  
  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = {}
    for (const key in formData) {
      const error = validateField(key, formData[key])
      if (error) validationErrors[key] = error
    }
    setErrors(validationErrors)
    // if no errors navigates to summary page with form data
    if (Object.keys(validationErrors).length === 0) {
      navigate('/summary', { state: formData })
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} error={errors.firstName} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} error={errors.lastName} />
        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} onBlur={handleBlur} error={errors.username} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} />
        
        <div>
          <label>Password:</label><br />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ padding: '8px', width: '100%', borderColor: errors.password ? 'red' : '#ccc' }}
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Phone Number:</label><br />
          <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+49">+49</option>
          </select>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 10-digit number"
          />
          {errors.phoneNumber && <div style={{ color: 'red' }}>{errors.phoneNumber}</div>}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Country:</label><br />
          <select name="country" value={formData.country} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select</option>
            {Object.keys(cityOptions).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>City:</label><br />
          <select name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} disabled={!formData.country}>
            <option value="">Select</option>
            {formData.country && cityOptions[formData.country].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
        </div>

        <InputField label="PAN Number" name="pan" value={formData.pan} onChange={handleChange} onBlur={handleBlur} error={errors.pan} />
        <InputField label="Aadhar Number" name="aadhar" value={formData.aadhar} onChange={handleChange} onBlur={handleBlur} error={errors.aadhar} />

        <button type="submit" disabled={!isValidForm()} style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default RegistrationForm
