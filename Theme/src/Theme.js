import React, { createContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const styles = {
    app: {
      transition: 'background-color 0.5s, color 0.5s',
      backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937', // Light gray for light mode, dark gray for dark mode
      color: theme === 'light' ? '#111827' : '#111827', // Dark text for light mode, light text for dark mode
      minHeight: '100vh',
      padding: '20px',
    },
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={styles.app}>{children}</div>
    </ThemeContext.Provider>
  )
}

export default ThemeContext
