import React, { useState, useContext } from 'react'
import './App.css'
import ThemeContext from './Theme' // Import ThemeContext

const SearchBar = ({ data }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(data)

  // Access the current theme from ThemeContext
  const { theme } = useContext(ThemeContext)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (data) {
      setResults(
        data.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
      )
    }
  }

  // Set conditional classes based on the theme
  const inputClass = `border p-3 rounded-lg w-full focus:outline-none focus:ring-4 transition-shadow shadow-sm ${
    theme === 'light'
      ? 'border-gray-300 focus:ring-indigo-500 bg-white text-black'
      : 'border-gray-600 focus:ring-indigo-300 bg-gray-800 text-white'
  }`

  const buttonClass = `px-6 py-3 rounded-lg transition-all duration-200 shadow-md ${
    theme === 'light'
      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
      : 'bg-gray-700 text-white hover:bg-gray-600'
  }`

  const listItemClass = `p-4 border rounded-lg shadow-sm transition-shadow ${
    theme === 'light'
      ? 'bg-white border-gray-200 hover:shadow-lg text-black'
      : 'bg-gray-700 border-gray-600 hover:shadow-xl text-white'
  }`

  return (
    <div className='my-8 max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit} className='flex items-center gap-4'>
        <input
          value={search}
          onChange={handleChange}
          type='text'
          placeholder='Search...'
          className={inputClass}
        />
        <button type='submit' className={buttonClass}>
          Search
        </button>
      </form>
      <ul className='mt-6 space-y-4'>
        {results.length > 0 ? (
          results.map((item, index) => (
            <li key={index} className={listItemClass}>
              {item}
            </li>
          ))
        ) : (
          <li className='text-gray-500 text-center mt-4'>No results found</li>
        )}
      </ul>
    </div>
  )
}

export default SearchBar
