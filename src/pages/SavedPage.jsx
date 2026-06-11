import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import { FiBookmark } from 'react-icons/fi'

const SavedPage = () => {
  const bookmarks = useSelector(state => state.news.bookmarks)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container mx-auto px-4 py-10 max-w-[1400px] min-h-[70vh]">
      <header className="mb-12 border-b-2 border-gray-100 pb-6 flex items-center gap-4">
        <div className="w-1.5 h-10 bg-primary rounded-full"></div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-red-500 drop-shadow-sm flex items-center gap-4">
          <FiBookmark className="text-red-600" /> Saved News
        </h1>
      </header>

      {bookmarks && bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner">
          <div className="w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <FiBookmark className="text-4xl" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-3 uppercase tracking-wider">No Saved Articles Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">
            You haven't bookmarked any news yet. Click the save icon on any article to keep it here for later reading.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-800 to-red-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
            Browse News
          </Link>
        </div>
      )}
    </div>
  )
}

export default SavedPage
