import React, { useState, useEffect } from 'react'
import { generateSummary } from '../services/gemini'
import { FiCheckCircle, FiInfo } from 'react-icons/fi'

const AISummary = ({ content }) => {
  const [loading, setLoading] = useState(true)
  const [summaryData, setSummaryData] = useState({ summary: '', highlights: [] })

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true)
      const data = await generateSummary(content)
      setSummaryData(data)
      setLoading(false)
    }

    if (content) {
      fetchSummary()
    }
  }, [content])

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse my-8">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-6"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex gap-3 items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border border-blue-100 dark:border-gray-700 shadow-sm my-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text font-extrabold text-xl tracking-tight flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          AI Summary
        </span>
        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">Powered by Gemini</span>
      </div>
      
      <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed italic border-l-4 border-blue-400 pl-4">
        {summaryData.summary}
      </p>
      
      <div className="space-y-4">
        <h4 className="font-bold text-gray-700 dark:text-gray-300 uppercase text-sm tracking-wider">Key Takeaways</h4>
        <ul className="space-y-3">
          {summaryData.highlights.map((highlight, index) => (
            <li key={index} className="flex gap-3 text-gray-700 dark:text-gray-300 items-start">
              <FiCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AISummary
