import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Share2, Mail } from "lucide-react"
import { Metadata } from "next"
import { BASE_URL } from "@/lib/config"
import { generateBlogPost, getAllBlogPosts } from "@/lib/blog-generator"
import AdSenseDisclosure from "@/components/adsense-disclosure"

const EMAIL = "mailto:servicestoolai@gmail.com"
const TWITTER = "https://twitter.com/Gettoolai"
const LINKEDIN = "https://linkedin.com/company/gettoolai"

// Get all blog posts (static + tool-specific)
const allBlogPosts = getAllBlogPosts()

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = allBlogPosts.find(post => post.slug === params.slug)
  if (!article) {
    return {
      title: "Article Not Found | GetTool AI",
      description: "The article you're looking for doesn't exist.",
    }
  }

  // Extract first 150 characters for description
  const description = article.content.replace(/[#*`]/g, '').substring(0, 150).trim() + "..."

  return {
    title: `${article.title} | GetTool AI`,
    description,
    openGraph: {
      title: `${article.title} | GetTool AI`,
      description,
      type: "article",
      url: `${BASE_URL}/blog/${params.slug}`,
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${params.slug}`,
    },
  }
}


export default function BlogArticle({ params }: { params: { slug: string } }) {
  const article = allBlogPosts.find(post => post.slug === params.slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Article Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <AdSenseDisclosure />
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#00E5FF] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium">
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-white">{article.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
            <div className="text-gray-300 whitespace-pre-line leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Ad after first paragraph */}
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>

          {/* Ad at bottom */}
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
            Advertisement
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/blog" className="inline-block px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF]/50 transition-colors">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={EMAIL}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-[#00E5FF]/50 font-semibold transition-colors"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF]/50 transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
