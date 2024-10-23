import React, { useContext } from 'react'
import ThemeContext from './Theme'
import Change from './Change'
import SearchBar from './SearchBar'
import './App.css'

const App = () => {
  const { theme } = useContext(ThemeContext)

  const sampleData = [
    'React',
    'Tailwind',
    'JavaScript',
    'Next.js',
    'Git',
    'Node.js',
  ]

  // Set conditional classes based on the theme
  const appContainerClass = `container mx-auto px-4 py-6 min-h-screen transition-colors duration-300 ${
    theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-900 text-gray-50'
  }`

  return (
    <div className={appContainerClass}>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>My App</h1>
        <h2 className='text-lg font-semibold mb-6'>
          The app theme is:{' '}
          <span className='text-indigo-600'>
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        </h2>
        <Change />
        <SearchBar data={sampleData} />
      </div>
    </div>
  )
}

export default App
