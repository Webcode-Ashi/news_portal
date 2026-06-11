import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import CategoryPage from './pages/CategoryPage'
import NewsDetailsPage from './pages/NewsDetailsPage'
import SearchPage from './pages/SearchPage'
import TrendingPage from './pages/TrendingPage'
import SavedPage from './pages/SavedPage'

function App() {
  const isDarkMode = useSelector(state => state.theme.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/news/:id" element={<NewsDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
