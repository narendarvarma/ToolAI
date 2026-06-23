interface StructuredDataProps {
  type: "SoftwareApplication" | "FAQPage" | "Organization" | "BreadcrumbList" | "WebApplication" | "WebSite"
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
  url: string,
  applicationCategory: string,
  operatingSystem: string = "Web",
  offers?: { price: string; priceCurrency: string },
  featureList?: string[]
) {
  return {
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    offers: offers || {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    featureList: featureList || [
      "Free to use",
      "No installation required",
      "Works on all devices",
      "Fast and accurate results",
      "Secure and private"
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0",
    applicationSubCategory: "UtilitiesApplication"
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateWebSiteSchema(url: string) {
  return {
    name: "GetTool AI",
    url,
    description: "GetTool AI provides 75+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities.",
    publisher: {
      "@type": "Organization",
      name: "GetTool AI",
      url,
      logo: `${url}/logo.png`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
}

export function generateOrganizationSchema() {
  return {
    name: "GetTool AI",
    url: "https://gettoolai.in",
    logo: "https://gettoolai.in/logo.png",
    description: "GetTool AI provides 75+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities.",
    sameAs: [
      "https://twitter.com/Gettoolai",
      "https://linkedin.com/company/gettoolai"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "servicestoolai@gmail.com",
      url: "https://gettoolai.in/contact"
    }
  }
}
