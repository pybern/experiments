import * as React from "react"
import dynamic from "next/dynamic"
import { AustraliaMapClient } from "./australia-map-client"

// Hub data - fetched/defined at server level for SEO
export const hubs = [
  { city: "Sydney", state: "NSW", lat: -33.8688, lng: 151.2093, major: true },
  { city: "Melbourne", state: "VIC", lat: -37.8136, lng: 144.9631, major: true },
  { city: "Brisbane", state: "QLD", lat: -27.4705, lng: 153.0260, major: true },
  { city: "Perth", state: "WA", lat: -31.9523, lng: 115.8613, major: true },
  { city: "Adelaide", state: "SA", lat: -34.9285, lng: 138.6007, major: true },
]

// Popular routes for each hub - server-side data for SEO
export const hubRoutes: Record<string, { to: string; price: string }[]> = {
  Sydney: [
    { to: "Melbourne", price: "from $599" },
    { to: "Brisbane", price: "from $549" },
    { to: "Canberra", price: "from $299" },
    { to: "Newcastle", price: "from $199" },
    { to: "Gold Coast", price: "from $499" },
  ],
  Melbourne: [
    { to: "Sydney", price: "from $599" },
    { to: "Adelaide", price: "from $449" },
    { to: "Geelong", price: "from $149" },
    { to: "Canberra", price: "from $399" },
    { to: "Brisbane", price: "from $899" },
  ],
  Brisbane: [
    { to: "Sydney", price: "from $549" },
    { to: "Gold Coast", price: "from $149" },
    { to: "Cairns", price: "from $849" },
    { to: "Townsville", price: "from $699" },
    { to: "Melbourne", price: "from $899" },
  ],
  Perth: [
    { to: "Adelaide", price: "from $1,299" },
    { to: "Sydney", price: "from $1,899" },
    { to: "Melbourne", price: "from $1,699" },
    { to: "Darwin", price: "from $1,499" },
    { to: "Kalgoorlie", price: "from $399" },
  ],
  Adelaide: [
    { to: "Melbourne", price: "from $449" },
    { to: "Sydney", price: "from $749" },
    { to: "Perth", price: "from $1,299" },
    { to: "Alice Springs", price: "from $799" },
    { to: "Darwin", price: "from $1,399" },
  ],
}

// Hub descriptions - server-side data for SEO
export const hubDescriptions: Record<string, string> = {
  Sydney: "Our largest hub serving NSW and the East Coast corridor",
  Melbourne: "Major hub for Victoria and Southern Australia routes",
  Brisbane: "Queensland gateway connecting to tropical north",
  Perth: "Western Australia's primary distribution center",
  Adelaide: "Central hub linking east and west coast networks",
}

export function AustraliaMap() {
  return (
    <section className="relative z-10 bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header - Server rendered for SEO */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium leading-tight text-neutral-900 md:text-4xl lg:text-5xl mb-4">
            Nationwide Coverage
          </h2>
          <p className="max-w-xl mx-auto text-lg text-neutral-500">
            {hubs.length} major hubs across Australia ensuring fast and reliable delivery.
          </p>
        </div>

        {/* SEO Content - Hidden visually but crawlable */}
        <div className="sr-only">
          <h3>Our Hub Locations</h3>
          <ul>
            {hubs.map((hub) => (
              <li key={hub.city}>
                <strong>{hub.city}, {hub.state}</strong> - {hubDescriptions[hub.city]}
                <ul>
                  {hubRoutes[hub.city]?.map((route) => (
                    <li key={route.to}>
                      {hub.city} to {route.to}: {route.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Map - Client component */}
        <AustraliaMapClient 
          hubs={hubs} 
          hubRoutes={hubRoutes} 
          hubDescriptions={hubDescriptions} 
        />
      </div>
    </section>
  )
}
 