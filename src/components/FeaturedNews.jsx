import React from 'react'
import NewsCard from './NewsCard'

const FeaturedNews = ({ articles }) => {
  if (!articles || articles.length < 3) return null

  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 3)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      <div className="lg:col-span-2">
        <NewsCard article={mainArticle} isLarge={true} />
      </div>
      <div className="flex flex-col gap-6">
        {sideArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedNews
