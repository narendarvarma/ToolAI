/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gettoolai.in',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/*'] }
    ]
  },
  exclude: ['/api/*'],
  changefreq: 'daily',
  priority: 0.8,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Higher priority for tool pages
    if (path.startsWith('/tools/')) {
      return {
        loc: path,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
      }
    }
    // Lower priority for other pages
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
    }
  },
  additionalPaths: async (config) => {
    const toolSlugs = [
      'image-to-pdf', 'pdf-to-image', 'merge-pdf', 'split-pdf', 'compress-pdf',
      'add-watermark', 'remove-pages', 'rotate-pdf', 'image-compressor', 'resize-image',
      'convert-format', 'qr-generator', 'password-generator', 'word-counter',
      'json-formatter', 'color-picker', 'case-converter', 'base64-encoder',
      'url-encoder', 'markdown-to-html', 'json-to-csv', 'uuid-generator',
      'age-calculator', 'bmi-calculator', 'currency-converter', 'unit-converter',
      'timezone-converter', 'date-calculator', 'tip-calculator', 'countdown-timer',
      'stopwatch', 'world-clock', 'calorie-calculator', 'cgpa-calculator',
      'attendance-calculator', 'study-planner', 'pomodoro-timer', 'flashcard-generator',
      'notes-organizer', 'timetable-generator', 'digital-notes', 'todo-list',
      'expense-tracker', 'calendar-planner', 'habit-tracker', 'daily-goals',
      'text-to-speech', 'speech-to-text', 'ai-resume-builder', 'ai-email-writer',
      'ai-notes-summarizer', 'ai-caption-generator', 'ai-study-assistant',
      'ai-code-helper', 'ai-blog-generator', 'ai-text-rewriter', 'internship-finder'
    ]
    
    return toolSlugs.map(slug => ({
      loc: `/tools/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    }))
  },
}
