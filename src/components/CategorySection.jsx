import React from 'react'
import NewsCard from './NewsCard'
import { Link } from 'react-router-dom'

const CategorySection = ({ title, articles }) => {
  if (!articles || articles.length === 0) return null

  const sectionUrl = `/category/${title.toLowerCase().split(' ')[0]}`

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          <h2 className="text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-500 drop-shadow-sm">{title}</h2>
        </div>
        <Link to={sectionUrl} className="text-sm font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1 group bg-gray-50 px-4 py-2 rounded-full hover:bg-red-50 border border-transparent hover:border-red-100">
          See All <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
