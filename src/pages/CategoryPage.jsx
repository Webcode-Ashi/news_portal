import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../store/newsSlice'
import NewsCard from '../components/NewsCard'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const { articles, status } = useSelector(state => state.news)

  useEffect(() => {
    dispatch(fetchNews(categoryId))
  }, [categoryId, dispatch])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 border-b-4 border-accent pb-4 inline-block">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider text-primary dark:text-secondary">
          {categoryId} News
        </h1>
      </header>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={`${article.id}-${index}`} article={article} isLarge={index === 0} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">No articles found for this category.</p>
        </div>
      )}
    </div>
  )
}

export default CategoryPage
