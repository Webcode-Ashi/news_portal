import React from 'react'

const BreakingTicker = ({ headlines }) => {
  if (!headlines || headlines.length === 0) return null

  return (
    <div className="bg-primary text-white flex items-center h-12 overflow-hidden border-b-2 border-accent">
      <div className="bg-accent h-full flex items-center px-4 font-bold uppercase tracking-wider text-sm whitespace-nowrap z-10 shadow-lg">
        Breaking News
      </div>
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="animate-ticker whitespace-nowrap flex items-center h-full absolute">
          {headlines.map((item, index) => (
            <React.Fragment key={index}>
              <span className="mx-8 font-medium hover:text-accent transition-colors cursor-pointer">
                {item.title}
              </span>
              <span className="text-gray-500 text-xs px-2">&bull;</span>
            </React.Fragment>
          ))}
          {/* Duplicate for infinite loop */}
          {headlines.map((item, index) => (
            <React.Fragment key={`dup-${index}`}>
              <span className="mx-8 font-medium hover:text-accent transition-colors cursor-pointer">
                {item.title}
              </span>
              <span className="text-gray-500 text-xs px-2">&bull;</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BreakingTicker
