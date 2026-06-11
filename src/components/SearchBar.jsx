import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for news, topics, or sources..." 
        className="w-full pl-6 pr-14 py-4 rounded-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-lg transition-all"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-red-700 text-white p-3 rounded-full transition-colors flex items-center justify-center"
        aria-label="Search"
      >
        <FiSearch className="text-xl" />
      </button>
    </form>
  )
}

export default SearchBar
