import Link from "next/link"

const popularRoutes = [
  "Sydney → Melbourne",
  "Brisbane → Sydney",
  "Melbourne → Adelaide",
  "Perth → Sydney",
  "Brisbane → Melbourne",
  "Adelaide → Perth",
  "Darwin → Adelaide",
  "Hobart → Melbourne",
  "Gold Coast → Sydney",
  "Cairns → Brisbane",
  "Newcastle → Melbourne",
  "Canberra → Sydney",
]

const services = [
  "Car Transport",
  "SUV & 4WD Transport",
  "Motorcycle Transport",
  "Caravan Transport",
  "Truck & Bus Transport",
  "Heavy Machinery",
  "Boat & Jet Ski Transport",
  "Fleet Transport",
  "Salvage Vehicles",
  "General Freight",
  "Express Delivery",
  "Enclosed Transport",
]

const locations = [
  "Sydney, NSW",
  "Melbourne, VIC",
  "Brisbane, QLD",
  "Perth, WA",
  "Adelaide, SA",
  "Gold Coast, QLD",
  "Canberra, ACT",
  "Darwin, NT",
  "Hobart, TAS",
  "Newcastle, NSW",
  "Cairns, QLD",
  "Townsville, QLD",
]

const company = [
  "About Us",
  "How It Works",
  "Careers",
  "Press & Media",
  "Partner With Us",
  "Become a Carrier",
  "Insurance",
  "FAQs",
  "Contact Us",
  "Help Centre",
  "Track Shipment",
  "Terms of Service",
  "Privacy Policy",
]

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Company Info */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 lg:pr-8">
            <p className="text-sm text-neutral-900">
              © {new Date().getFullYear()} WeMoveX Pty Ltd.
            </p>
            <p className="text-sm text-neutral-900">All rights reserved.</p>

            <div className="my-6 h-px bg-neutral-200" />

            {/* Region */}
            <div className="flex gap-3 text-sm text-neutral-500">
              <span>NSW</span>
              <span>VIC</span>
              <span>QLD</span>
              <span>WA</span>
            </div>

            <div className="my-6 h-px bg-neutral-200" />

            {/* Social Links */}
            <div className="flex flex-col gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-fit rounded-full border border-neutral-200 px-5 py-2 text-sm text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:col-span-2 lg:block" />

          {/* Popular Routes */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Popular Routes
            </p>
            <ul className="space-y-2">
              {popularRoutes.map((route) => (
                <li key={route}>
                  <a
                    href="#"
                    className="text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  >
                    {route}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Services
            </p>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Locations
            </p>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location}>
                  <a
                    href="#"
                    className="text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  >
                    {location}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Company
            </p>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-neutral-700 transition-colors hover:text-neutral-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
