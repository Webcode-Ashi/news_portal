import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../store/newsSlice'
import HeroBanner from '../components/HeroBanner'
import BreakingTicker from '../components/BreakingTicker'
import FeaturedNews from '../components/FeaturedNews'
import CategorySection from '../components/CategorySection'

const Homepage = () => {
  const dispatch = useDispatch()
  const { articles, status, error } = useSelector(state => state.news)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews('general'))
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading news</h2>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
        <button 
          onClick={() => dispatch(fetchNews('general'))}
          className="mt-6 bg-accent text-white px-6 py-2 font-bold uppercase hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  const breakingNews = articles.slice(0, 8)
  const heroArticle = articles[8]
  const topStories = articles.slice(9, 17)
  
  const worldNews = articles.filter(a => a.category?.toLowerCase().includes('world')).slice(0, 8)
  const techNews = articles.filter(a => a.category?.toLowerCase().includes('tech')).slice(0, 8)
  const sportsNews = articles.filter(a => a.category?.toLowerCase().includes('sport')).slice(0, 8)
  const businessNews = articles.filter(a => a.category?.toLowerCase().includes('business')).slice(0, 8)
  
  // Fallbacks if specific categories aren't found in general fetch
  const displayWorld = worldNews.length > 3 ? worldNews : articles.slice(17, 25)
  const displayTech = techNews.length > 3 ? techNews : articles.slice(25, 33)
  const displaySports = sportsNews.length > 3 ? sportsNews : articles.slice(33, 41)
  const displayBusiness = businessNews.length > 3 ? businessNews : articles.slice(41, 49)

  return (
    <div className="w-full">
      <BreakingTicker headlines={breakingNews} />
      
      {heroArticle && <HeroBanner article={heroArticle} />}
      
      <div className="container mx-auto px-4 py-12 max-w-[1400px]">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-3 border-b-2 border-gray-100">
            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
            <h2 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 drop-shadow-sm">
              Top Stories
            </h2>
          </div>
          <FeaturedNews articles={topStories} />
        </div>
        
        <CategorySection title="World News" articles={displayWorld} />
        <CategorySection title="Technology" articles={displayTech} />
        <CategorySection title="Business" articles={displayBusiness} />
        <CategorySection title="Sports" articles={displaySports} />
      </div>
    </div>
  )
}

export default Homepage
