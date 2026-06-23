import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { BASE_URL } from "@/lib/config"
import type { Metadata } from "next"
import { getAllBlogPosts } from "@/lib/blog-generator"
import { toolMetadata } from "@/lib/tool-metadata"
import AdSenseDisclosure from "@/components/adsense-disclosure"

export const metadata: Metadata = {
  title: "GetTool AI Blog - Guides, Tips & Tutorials for Online Tools",
  description: "Read the GetTool AI blog for guides, tips, and tutorials on PDF tools, image editing, AI tools, student calculators, and productivity. Learn how to use our free online tools effectively.",
  keywords: "GetTool AI blog, online tools guides, PDF tutorials, image editing tips, AI tools guide, student tools tips, productivity tutorials",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "GetTool AI Blog - Guides & Tutorials for Free Online Tools",
    description: "Learn how to use PDF tools, image editors, AI tools, and more with our comprehensive guides and tutorials.",
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "GetTool AI",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GetTool AI Blog"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetTool AI Blog - Guides & Tutorials",
    description: "Learn how to use free online tools with our guides and tutorials.",
    images: [`${BASE_URL}/og-image.png`],
  }
}

const staticArticles = [
  {
    id: "top-10-free-pdf-tools-2025",
    title: "Top 10 Free PDF Tools You Need in 2025",
    description: "Discover the best free PDF tools for editing, converting, and managing your documents efficiently.",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "PDF Tools",
    slug: "top-10-free-pdf-tools-2025"
  },
  {
    id: "how-to-remove-image-background-free",
    title: "How to Remove Image Background for Free",
    description: "Learn the best methods to remove backgrounds from images without spending a dime.",
    date: "January 12, 2025",
    readTime: "6 min read",
    category: "Image Tools",
    slug: "how-to-remove-image-background-free"
  },
  {
    id: "best-ai-tools-students-2025",
    title: "Best AI Tools for Students in 2025",
    description: "Boost your productivity with these powerful AI tools designed specifically for students.",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "AI Tools",
    slug: "best-ai-tools-students-2025"
  },
  {
    id: "how-to-calculate-cgpa-complete-guide",
    title: "How to Calculate CGPA: Complete Guide",
    description: "A comprehensive guide to understanding and calculating your CGPA accurately.",
    date: "January 8, 2025",
    readTime: "5 min read",
    category: "Student Tools",
    slug: "how-to-calculate-cgpa-complete-guide"
  },
  {
    id: "5-productivity-hacks-free-online-tools",
    title: "5 Productivity Hacks Using Free Online Tools",
    description: "Maximize your efficiency with these clever productivity hacks using free online tools.",
    date: "January 5, 2025",
    readTime: "6 min read",
    category: "Productivity",
    slug: "5-productivity-hacks-free-online-tools"
  },
  {
    id: "how-to-compress-pdf-without-losing-quality",
    title: "How to Compress PDF Without Losing Quality",
    description: "Learn the techniques to compress PDF files while maintaining their quality.",
    date: "January 3, 2025",
    readTime: "5 min read",
    category: "PDF Tools",
    slug: "how-to-compress-pdf-without-losing-quality"
  },
  {
    id: "best-free-qr-code-generators-online",
    title: "Best Free QR Code Generators Online",
    description: "Compare the top free QR code generators and find the perfect one for your needs.",
    date: "January 1, 2025",
    readTime: "4 min read",
    category: "Utility Tools",
    slug: "best-free-qr-code-generators-online"
  },
  {
    id: "how-to-use-pomodoro-timer-study-better",
    title: "How to Use Pomodoro Timer to Study Better",
    description: "Master the Pomodoro technique and transform your study sessions for maximum focus.",
    date: "December 28, 2024",
    readTime: "6 min read",
    category: "Student Tools",
    slug: "how-to-use-pomodoro-timer-study-better"
  }
]

// Get tool-specific blog posts and select some popular ones
const allToolBlogs = getAllBlogPosts()
const selectedToolSlugs = [
  "image-compressor",
  "resize-image",
  "ai-resume-builder",
  "password-generator",
  "qr-generator",
  "cgpa-calculator",
  "merge-pdf",
  "split-pdf",
  "ai-email-writer",
  "unit-converter",
  "background-remover",
  "pomodoro-timer",
  "todo-list",
  "expense-tracker",
  "text-to-speech",
  "json-formatter",
  "color-picker",
  "case-converter",
  "base64-encoder",
  "uuid-generator"
]

const toolArticles = selectedToolSlugs
  .map(slug => {
    const tool = toolMetadata[slug]
    const blog = allToolBlogs.find(b => b.toolSlug === slug)
    if (!tool || !blog) return null
    
    return {
      id: blog.slug,
      title: blog.title,
      description: tool.description,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      slug: blog.slug
    }
  })
  .filter((article): article is NonNullable<typeof article> => article !== null)

// Combine static and tool articles
const allArticles = [...staticArticles, ...toolArticles].slice(0, 20)

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <AdSenseDisclosure />
        <h1 className="text-4xl font-bold mb-4 text-white">Blog</h1>
        <p className="text-gray-400 mb-12">Tips, guides, and insights about online tools and productivity</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-[#111827] rounded-2xl p-6 border border-white/8 hover:border-[#00E5FF]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00E5FF]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium">
                  {article.category}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-[#00E5FF] transition-colors">
                {article.title}
              </h2>
              
              <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-[#00E5FF] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Read Article</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-white/10 bg-[#111827] p-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Explore Related Tools</h2>
          <p className="text-gray-400 mb-6">Try the tools that complement our blog content for productivity, student work, formatting, and file management.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/tools/ai-resume-builder" className="block rounded-2xl border border-white/10 bg-[#0B0F1A] p-4 text-white hover:border-[#00E5FF]/50 transition-all">
              <h3 className="font-semibold mb-2">AI Resume Builder</h3>
              <p className="text-sm text-gray-400">Create polished resumes with AI-driven suggestions.</p>
            </Link>
            <Link href="/tools/convert-format" className="block rounded-2xl border border-white/10 bg-[#0B0F1A] p-4 text-white hover:border-[#00E5FF]/50 transition-all">
              <h3 className="font-semibold mb-2">Convert Format</h3>
              <p className="text-sm text-gray-400">Quickly change file formats for documents and images.</p>
            </Link>
            <Link href="/tools/ai-blog-generator" className="block rounded-2xl border border-white/10 bg-[#0B0F1A] p-4 text-white hover:border-[#00E5FF]/50 transition-all">
              <h3 className="font-semibold mb-2">AI Blog Generator</h3>
              <p className="text-sm text-gray-400">Generate blog ideas and drafts with a single click.</p>
            </Link>
            <Link href="/tools/emi-calculator" className="block rounded-2xl border border-white/10 bg-[#0B0F1A] p-4 text-white hover:border-[#00E5FF]/50 transition-all">
              <h3 className="font-semibold mb-2">EMI Calculator</h3>
              <p className="text-sm text-gray-400">Estimate loan payments instantly for smarter financial planning.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
