import React, { useContext } from 'react'
import ThemeContext from './Theme'

const Change = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition'
    >
      Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'} Mode)
    </button>
  )
}

export default Change
