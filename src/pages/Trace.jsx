import React from 'react'
import Navbar from '../components/Navbar'
import Trace from '../components/Trace/Trace'

const TracePage = ({ user, onLogout, theme, setTheme }) => {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} />
      <Trace user={user} />
    </div>
  )
}

export default TracePage
