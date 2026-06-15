interface StructuredDataProps {
  type: "SoftwareApplication" | "FAQPage" | "Organization" | "BreadcrumbList" | "WebApplication"
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
  offers?: { price: string; priceCurrency: string }
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250"
    },
    featureList: [
      "Free to use",
      "No installation required",
      "Works on all devices",
      "Fast and accurate results",
      "Secure and private"
    ]
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

export function generateOrganizationSchema() {
  return {
    name: "ToolHub AI",
    url: "https://gettoolai.in",
    logo: "https://gettoolai.in/logo.png",
    description: "ToolHub AI provides 75+ free online tools for PDF editing, image processing, AI assistance, student tools, productivity, and utilities.",
    sameAs: [
      "https://twitter.com/toolhubai",
      "https://facebook.com/toolhubai",
      "https://linkedin.com/company/toolhubai"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@gettoolai.in",
      url: "https://gettoolai.in/contact"
    }
  }
}
