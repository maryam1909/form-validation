import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegistrationForm from './pages/RegistrationForm'
import Summary from './pages/Summary'

const App = () => (
  <Routes>
    <Route path="/" element={<RegistrationForm />} />
    <Route path="/summary" element={<Summary />} />
  </Routes>
)

export default App
