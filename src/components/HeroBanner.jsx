import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

const HeroBanner = ({ article }) => {
  if (!article) return null

  const formattedDate = article.publishedAt ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) : 'Unknown'

  return (
    <Link to={`/news/${encodeURIComponent(article.id)}`} state={{ article }} className="block">
      <div className="relative w-full h-[60vh] md:h-[75vh] bg-red-950 group overflow-hidden shadow-2xl">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
        />
        {/* Red gradient overlay instead of black */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-900/60 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-70 transition-opacity duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block bg-primary text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                {article.category}
              </span>
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">{formattedDate}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 group-hover:text-red-100 transition-colors drop-shadow-2xl max-w-5xl tracking-tight">
              {article.title}
            </h1>
            
            <p className="text-gray-200 text-lg md:text-2xl line-clamp-2 max-w-4xl drop-shadow-lg hidden md:block mb-8 font-medium">
              {article.description}
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:translate-x-2">
              Read Full Story <span className="text-lg">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HeroBanner
