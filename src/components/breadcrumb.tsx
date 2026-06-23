import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { BASE_URL } from "@/lib/config"
import Script from "next/script"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [
    { label: "Home", href: "/" },
    ...items
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${BASE_URL}${item.href}`
    }))
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        {allItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {index === 0 && <Home className="h-4 w-4" />}
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {index === allItems.length - 1 ? (
              <span className="text-white font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#00E5FF] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}
