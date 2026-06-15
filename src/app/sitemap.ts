import fs from "fs"
import path from "path"
import { BASE_URL } from "@/lib/config"
import { toolMetadata } from "@/lib/tool-metadata"

const appRoot = path.join(process.cwd(), "src", "app")

const blogSlugs = [
  "top-10-free-pdf-tools-2025",
  "how-to-remove-image-background-free",
  "best-ai-tools-students-2025",
  "how-to-calculate-cgpa-complete-guide",
  "5-productivity-hacks-free-online-tools",
  "how-to-compress-pdf-without-losing-quality",
  "best-free-qr-code-generators-online",
  "how-to-use-pomodoro-timer-study-better",
]

function getLastModified(routePath: string): string {
  const routeFile = path.join(appRoot, routePath)
  if (fs.existsSync(routeFile)) {
    return fs.statSync(routeFile).mtime.toISOString()
  }
  return new Date().toISOString()
}

function getRouteLastModified(routeSegment: string): string {
  const candidates = ["page.tsx", "page.ts", "layout.tsx", "layout.ts"]
  for (const candidate of candidates) {
    const candidatePath = path.join(appRoot, routeSegment, candidate)
    if (fs.existsSync(candidatePath)) {
      return fs.statSync(candidatePath).mtime.toISOString()
    }
  }
  return new Date().toISOString()
}

export default function sitemap() {
  const staticRoutes = [
    { url: BASE_URL, lastModified: getLastModified("page.tsx") },
    { url: `${BASE_URL}/about`, lastModified: getRouteLastModified("about") },
    { url: `${BASE_URL}/blog`, lastModified: getRouteLastModified("blog") },
    { url: `${BASE_URL}/contact`, lastModified: getRouteLastModified("contact") },
    { url: `${BASE_URL}/privacy`, lastModified: getRouteLastModified("privacy") },
    { url: `${BASE_URL}/terms`, lastModified: getRouteLastModified("terms") },
    { url: `${BASE_URL}/cookie-policy`, lastModified: getRouteLastModified("cookie-policy") },
    { url: `${BASE_URL}/disclaimer`, lastModified: getRouteLastModified("disclaimer") },
    { url: `${BASE_URL}/tools`, lastModified: getRouteLastModified(path.join("tools")) },
  ]

  const toolRoutes = Object.keys(toolMetadata).map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: getRouteLastModified(path.join("tools", slug)),
  }))

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: getLastModified(path.join("blog", "[slug]", "page.tsx")),
  }))

  const blogCategorySlugs = [
    "ai-guides",
    "pdf-guides",
    "productivity-tips",
    "student-resources",
  ]

  const blogCategoryRoutes = blogCategorySlugs.map((slug) => ({
    url: `${BASE_URL}/blog/category/${slug}`,
    lastModified: getRouteLastModified(path.join("blog", "category", slug)),
  }))

  return [...staticRoutes, ...blogRoutes, ...blogCategoryRoutes, ...toolRoutes]
}
