export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WeMoveX",
    url: "https://wemovex.com.au",
    logo: "https://wemovex.com.au/logo.svg",
    description:
      "Australia's leading vehicle transport company providing car shipping, motorcycle delivery, caravan transport, and heavy machinery logistics services nationwide.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "AU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+61-1800-000-000",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/wemovex",
      "https://www.instagram.com/wemovex",
      "https://www.linkedin.com/company/wemovex",
    ],
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WeMoveX",
    image: "https://wemovex.com.au/logo.svg",
    "@id": "https://wemovex.com.au",
    url: "https://wemovex.com.au",
    telephone: "+61-1800-000-000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 1, 123 Transport Street",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -33.8688,
      longitude: 151.2093,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2847",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Vehicle Transport",
    provider: {
      "@type": "Organization",
      name: "WeMoveX",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    description:
      "Professional vehicle transport services including car shipping, motorcycle transport, caravan delivery, truck logistics, and heavy machinery moving across Australia.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "AUD",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vehicle Transport Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Car Transport",
          description: "Reliable transport for sedans, hatches, SUVs, and 4WDs",
        },
        {
          "@type": "OfferCatalog",
          name: "Motorcycle Transport",
          description: "Fully enclosed transport for motorcycles, quads, and trikes",
        },
        {
          "@type": "OfferCatalog",
          name: "Caravan Transport",
          description: "Safe transport for caravans, camper trailers, and motorhomes",
        },
        {
          "@type": "OfferCatalog",
          name: "Heavy Machinery",
          description: "Specialized transport for excavators, cranes, and industrial equipment",
        },
      ],
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WeMoveX",
    url: "https://wemovex.com.au",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://wemovex.com.au/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

