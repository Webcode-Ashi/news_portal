import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FiArrowLeft, FiShare2, FiBookmark } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBookmark } from '../store/newsSlice'
import AISummary from '../components/AISummary'
import CategorySection from '../components/CategorySection'

const NewsDetailsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const article = location.state?.article
  
  const { articles } = useSelector(state => state.news)
  const bookmarks = useSelector(state => state.news.bookmarks)
  const isBookmarked = article ? bookmarks.some(b => b.id === article.id) : false

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [article])

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <button onClick={() => navigate('/')} className="text-accent hover:underline flex items-center justify-center gap-2 mx-auto">
          <FiArrowLeft /> Back to Home
        </button>
      </div>
    )
  }

  const relatedNews = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 4)

  return (
    <article className="w-full bg-white pb-12">
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-primary flex items-center gap-2 mb-10 transition-colors font-bold uppercase tracking-widest text-sm bg-gray-50 px-4 py-2 rounded-full inline-flex hover:bg-red-50">
          <FiArrowLeft /> Back to Headlines
        </button>

        <div className="mb-10">
          <div className="inline-block bg-primary text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest rounded-full shadow-md mb-6">
            {article.category || 'News'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-gray-900 drop-shadow-sm">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y-2 border-gray-100">
            <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
              <span className="text-primary font-black uppercase tracking-widest bg-red-50 px-3 py-1 rounded">{article.source}</span>
              <span className="text-gray-300">&bull;</span>
              <span>{format(new Date(article.publishedAt), 'MMMM d, yyyy h:mm a')}</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => dispatch(toggleBookmark(article))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${isBookmarked ? 'text-white bg-primary shadow-md hover:bg-red-700' : 'text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-primary'}`}
              >
                <FiBookmark className={isBookmarked ? 'fill-current' : ''} /> {isBookmarked ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center gap-2 text-gray-500 bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-full font-bold hover:text-primary transition-all">
                <FiShare2 /> Share
              </button>
            </div>
          </div>
        </div>

        <figure className="mb-12 w-full overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] border border-gray-100">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-auto object-cover max-h-[70vh]"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' }}
          />
        </figure>

        <AISummary content={article.content || article.description} />

        <div className="prose prose-xl max-w-none text-gray-800 mb-16">
          <p className="text-2xl font-medium leading-relaxed text-gray-700 mb-8 border-l-4 border-primary pl-6 py-2 bg-red-50/50">
            {article.description}
          </p>
          <div className="whitespace-pre-line leading-relaxed font-serif text-xl px-2 md:px-10">
            {article.content !== article.description ? article.content : "Full article text could not be extracted from the feed. Please read the full article on the official source."}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 font-medium mb-6 uppercase tracking-widest text-sm">Continue reading the complete story</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-800 to-red-600 text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:from-red-900 hover:to-red-700 hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(220,38,38,0.7)] transition-all duration-300"
            >
              Read Full Article on {article.source} <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {relatedNews.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-200 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <CategorySection title="Related News" articles={relatedNews} />
          </div>
        </div>
      )}
    </article>
  )
}

export default NewsDetailsPage
