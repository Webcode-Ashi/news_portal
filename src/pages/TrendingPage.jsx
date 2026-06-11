import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNews } from '../store/newsSlice'
import NewsCard from '../components/NewsCard'

const TrendingPage = () => {
  const dispatch = useDispatch()
  const { articles, status } = useSelector(state => state.news)
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews('general'))
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    )
  }

  // Simulate trending by taking random articles and assigning them views
  // In a real app, this would come from an API
  const trendingArticles = [...articles]
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 12)

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 border-b-4 border-accent pb-4 inline-block">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-primary dark:text-secondary flex items-center gap-4">
          <span className="text-accent text-5xl">&uarr;</span> Trending Now
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {trendingArticles.map((article, index) => (
          <div key={article.id} className="relative">
            <div className="absolute -left-4 -top-4 text-7xl font-black text-gray-200 dark:text-gray-800 z-0 opacity-50 select-none">
              {index + 1}
            </div>
            <div className="relative z-10 pl-6 pt-6">
              <NewsCard article={article} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingPage
