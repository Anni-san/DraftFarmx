import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ConsumerDashboard from './pages/ConsumerDashboard'
import RetailerDashboard from './pages/RetailerDashboard'
import Trace from './pages/Trace'
import Verification from './pages/Verification'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedUser = localStorage.getItem('cropAppUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('cropAppUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('cropAppUser')
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('cropAppUser', JSON.stringify(updatedUser))
  }

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login onLogin={login} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/register" replace /> : 
            <Register onRegister={login} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            (() => {
              switch(user?.role) {
                case 'Consumer':
                  return <ConsumerDashboard user={user} onLogout={logout} theme={theme} setTheme={setTheme} onUpdateUser={updateUser} />
                case 'Retailer':
                  return <RetailerDashboard user={user} onLogout={logout} theme={theme} setTheme={setTheme} onUpdateUser={updateUser} />
                default:
                  return <Dashboard user={user} onLogout={logout} theme={theme} setTheme={setTheme} onUpdateUser={updateUser} />
              }
            })() : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/trace" 
          element={
            isAuthenticated ? 
            <Trace user={user} onLogout={logout} theme={theme} setTheme={setTheme} onUpdateUser={updateUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/verification" 
          element={
            isAuthenticated ? 
            <Verification user={user} onLogout={logout} theme={theme} setTheme={setTheme} onUpdateUser={updateUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </div>
  )
}

export default App
