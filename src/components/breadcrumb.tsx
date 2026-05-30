import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

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

  return (
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
  )
}
