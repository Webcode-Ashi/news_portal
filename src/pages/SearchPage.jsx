import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNews } from '../store/newsSlice'
import NewsCard from '../components/NewsCard'
import SearchBar from '../components/SearchBar'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const dispatch = useDispatch()
  const { articles, status } = useSelector(state => state.news)
  const [filteredArticles, setFilteredArticles] = useState([])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews('general'))
    }
  }, [status, dispatch])

  useEffect(() => {
    if (query && articles.length > 0) {
      const lowerQuery = query.toLowerCase()
      const results = articles.filter(a => 
        a.title.toLowerCase().includes(lowerQuery) || 
        a.description.toLowerCase().includes(lowerQuery) ||
        a.source.toLowerCase().includes(lowerQuery)
      )
      setFilteredArticles(results)
    } else {
      setFilteredArticles([])
    }
  }, [query, articles])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-black uppercase tracking-wider mb-6 text-primary dark:text-secondary">
          Search
        </h1>
        <SearchBar initialQuery={query} />
      </div>

      {query ? (
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-700 dark:text-gray-300">
            Results for <span className="text-accent">"{query}"</span> ({filteredArticles.length})
          </h2>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No matching news found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Enter a search term to find news.</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
