import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { FiBookmark, FiShare2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBookmark } from '../store/newsSlice'

const NewsCard = ({ article, isLarge = false }) => {
  const dispatch = useDispatch()
  const bookmarks = useSelector(state => state.news.bookmarks)
  const isBookmarked = bookmarks.some(b => b.id === article.id)

  const formattedDate = article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : 'Unknown'

  return (
    <div className={`group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)] transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${isLarge ? 'md:flex-row' : ''}`}>
      <div className={`overflow-hidden relative ${isLarge ? 'md:w-1/2 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none' : 'h-52 rounded-t-2xl'}`}>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider rounded-full shadow-lg">
          {article.category}
        </div>
      </div>
      <div className={`p-5 flex flex-col justify-between flex-grow ${isLarge ? 'md:w-1/2 md:p-8' : ''}`}>
        <div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-3 font-semibold uppercase tracking-widest">
            <span className="text-primary font-black bg-red-50 px-2 py-0.5 rounded text-[10px]">{article.source}</span>
            <span className="text-gray-300">&bull;</span>
            <span>{formattedDate}</span>
          </div>
          <Link to={`/news/${encodeURIComponent(article.id)}`} state={{ article }}>
            <h3 className={`font-extrabold text-gray-900 group-hover:text-primary transition-colors leading-snug mb-3 ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg line-clamp-2'}`}>
              {article.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed font-medium">
            {article.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-bold tracking-wide">{Math.max(1, Math.ceil(article.content.length / 1000))} MIN READ</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(toggleBookmark(article));
              }}
              className={`p-2 rounded-full hover:bg-red-50 transition-colors ${isBookmarked ? 'text-primary bg-red-50' : 'text-gray-400'}`}
              aria-label="Bookmark"
            >
              <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const shareUrl = window.location.origin + `/news/${encodeURIComponent(article.id)}`;
                if (navigator.share) {
                  navigator.share({ title: article.title, url: shareUrl }).catch(err => console.log('Share failed:', err));
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Link copied to clipboard!");
                }
              }}
              className="p-2 rounded-full text-gray-400 hover:text-primary hover:bg-red-50 transition-colors" 
              aria-label="Share"
            >
              <FiShare2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
