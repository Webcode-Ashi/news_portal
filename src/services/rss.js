// Using an open CORS proxy to fetch RSS (raw endpoint returns raw XML)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const RSS_FEEDS = {
  general: [
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://www.reutersagency.com/feed/',
    'https://edition.cnn.com/services/rss/',
  ],
  world: [
    'https://www.theguardian.com/world/rss',
    'https://rss.dw.com/xml/rss-en-all',
    'https://www.aljazeera.com/xml/rss/all.xml'
  ],
  // fallback for others
};

export const fetchRSSFeeds = async (category = 'general') => {
  const feeds = RSS_FEEDS[category] || RSS_FEEDS.general;
  let allRssArticles = [];

  const fetchFeed = async (url) => {
    try {
      const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
      const xmlText = await response.text();
      
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, 'text/xml');
      const items = Array.from(xml.querySelectorAll('item'));
      
      return items.map(item => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        
        // Try to get image from media:content, media:thumbnail, or enclosure
        let image = null;
        const mediaContent = item.getElementsByTagNameNS('*', 'content')[0] || item.querySelector('content');
        const mediaThumbnail = item.getElementsByTagNameNS('*', 'thumbnail')[0] || item.querySelector('thumbnail');
        const enclosure = item.querySelector('enclosure');
        
        if (mediaContent && mediaContent.getAttribute('url')) {
          image = mediaContent.getAttribute('url');
        } else if (mediaThumbnail && mediaThumbnail.getAttribute('url')) {
          image = mediaThumbnail.getAttribute('url');
        } else if (enclosure && enclosure.getAttribute('url')) {
          image = enclosure.getAttribute('url');
        } else {
          const match = description.match(/<img[^>]+src="([^">]+)"/);
          if (match && match[1]) {
            image = match[1];
          }
        }
        
        if (!image) {
          // Use a seeded random image if no image found
          image = `https://picsum.photos/seed/${encodeURIComponent(title.substring(0, 20))}/800/500`;
        }

        return {
          id: link || Math.random().toString(36).substr(2, 9),
          title,
          description,
          content: description, // RSS usually only gives description
          image,
          source: url.includes('bbc') ? 'BBC News' : url.includes('reuters') ? 'Reuters' : url.includes('cnn') ? 'CNN' : 'RSS Feed',
          category,
          url: link,
          publishedAt: pubDate
        };
      });
    } catch (error) {
      console.error('RSS fetch error:', error);
      return [];
    }
  };

  const results = await Promise.allSettled(feeds.map(feed => fetchFeed(feed)));
  
  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value) {
      allRssArticles = [...allRssArticles, ...result.value];
    }
  });

  return allRssArticles;
};
