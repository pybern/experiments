const services = [
  "Car Transport",
  "SUV & 4WD Shipping",
  "Motorcycle Delivery",
  "Caravan Transport",
  "Truck & Bus Logistics",
  "Heavy Machinery Moving",
  "Boat & Jet Ski Transport",
  "Fleet Services",
  "Interstate Delivery",
  "Door-to-Door Service",
  "Enclosed Transport",
  "Express Shipping",
]

export function AnnouncementBanner() {
  return (
    <div className="relative z-30 overflow-hidden bg-neutral-900 py-2.5">
      <div className="animate-marquee flex whitespace-nowrap">
        {/* First set */}
        {services.map((service, index) => (
          <span key={`first-${index}`} className="mx-4 flex items-center gap-4">
            <span className="text-sm font-medium text-white">{service}</span>
            <span className="text-rose-400">✦</span>
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {services.map((service, index) => (
          <span key={`second-${index}`} className="mx-4 flex items-center gap-4">
            <span className="text-sm font-medium text-white">{service}</span>
            <span className="text-rose-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

