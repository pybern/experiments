"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Hub {
  city: string
  state: string
  lat: number
  lng: number
  major: boolean
}

interface LeafletMapProps {
  hubs: Hub[]
  hubRoutes: Record<string, { to: string; price: string }[]>
  hubDescriptions: Record<string, string>
}

// Component to sync marker selection state with DOM via data attributes
function MarkerStateSync({ selectedHub }: { selectedHub: string | null }) {
  useEffect(() => {
    // Use requestAnimationFrame for smooth visual updates
    const updateMarkers = () => {
      const markers = document.querySelectorAll('.marker-container')
      markers.forEach((marker) => {
        const city = marker.getAttribute('data-city')
        const dot = marker.querySelector('.marker-dot')
        const label = marker.querySelector('.marker-label')
        
        // Get the Leaflet marker icon parent element to adjust z-index
        const leafletMarker = marker.closest('.leaflet-marker-icon') as HTMLElement | null
        
        if (city === selectedHub) {
          marker.classList.remove('marker-unselected')
          marker.classList.add('marker-selected')
          dot?.classList.remove('marker-unselected')
          dot?.classList.add('marker-selected')
          label?.classList.remove('marker-unselected')
          label?.classList.add('marker-selected')
          // Bring selected marker to front
          if (leafletMarker) {
            leafletMarker.style.zIndex = '1000'
          }
        } else {
          marker.classList.remove('marker-selected')
          marker.classList.add('marker-unselected')
          dot?.classList.remove('marker-selected')
          dot?.classList.add('marker-unselected')
          label?.classList.remove('marker-selected')
          label?.classList.add('marker-unselected')
          // Reset z-index for non-selected markers
          if (leafletMarker) {
            leafletMarker.style.zIndex = ''
          }
        }
      })
    }
    
    // Run immediately
    updateMarkers()
    // Also run on next frame to catch late renders
    const rafId = requestAnimationFrame(updateMarkers)
    // And run after a small delay for initial load
    const timerId = setTimeout(updateMarkers, 200)
    
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
    }
  }, [selectedHub])
  
  return null
}

// Component to set zoom after map loads
function SetView({ isMobile }: { isMobile: boolean }) {
  const map = useMap()
  
  useEffect(() => {
    // Adjust zoom and center based on screen size
    // Mobile needs lower zoom to fit all of Australia in the smaller viewport
    const zoom = isMobile ? 3 : 4
    const center: [number, number] = isMobile ? [-28, 135] : [-28, 135]
    map.setView(center, zoom)
  }, [map, isMobile])
  
  return null
}

export default function LeafletMap({ hubs, hubRoutes, hubDescriptions }: LeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [selectedHub, setSelectedHub] = useState<string | null>("Sydney")
  const [isMobile, setIsMobile] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Create stable icons for each hub - memoized to prevent recreation
  const hubIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {}
    hubs.forEach((hub) => {
      icons[hub.city] = L.divIcon({
        className: 'custom-marker-wrapper',
        html: `
          <div class="marker-container marker-unselected" data-city="${hub.city}">
            <div class="marker-dot marker-unselected"></div>
            <div class="marker-label marker-unselected">${hub.city}</div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 10],
      })
    })
    return icons
  }, [hubs])

  useEffect(() => {
    setIsMounted(true)
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Track rotation index via ref to avoid dependency cycle
  const rotationIndexRef = useRef(0)

  // Initialize rotation index when hubs change
  useEffect(() => {
    const hubCities = hubs.map(h => h.city)
    rotationIndexRef.current = hubCities.indexOf("Sydney")
    if (rotationIndexRef.current === -1) rotationIndexRef.current = 0
  }, [hubs])

  // Auto-rotate through hubs until user interacts
  useEffect(() => {
    if (hasInteracted || !isMounted) return

    const hubCities = hubs.map(h => h.city)

    const interval = setInterval(() => {
      rotationIndexRef.current = (rotationIndexRef.current + 1) % hubCities.length
      setSelectedHub(hubCities[rotationIndexRef.current])
    }, 3000) // Rotate every 3 seconds

    return () => clearInterval(interval)
  }, [hasInteracted, isMounted, hubs])

  // Handle user interaction - stops auto-rotation
  const handleHubSelect = (city: string) => {
    setHasInteracted(true)
    setSelectedHub(city)
  }

  if (!isMounted) {
    return (
      <div className="w-full h-[300px] md:h-[550px] bg-neutral-100 flex items-center justify-center">
        <span className="text-neutral-400">Loading map...</span>
      </div>
    )
  }

  // Australia center coordinates
  const australiaCenter: [number, number] = [-25.2744, 133.7751]
  const routes = selectedHub ? hubRoutes[selectedHub] || [] : []
  const description = selectedHub ? hubDescriptions[selectedHub] || "" : ""
  const selectedHubData = hubs.find(h => h.city === selectedHub)

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Details Panel - Below on mobile, Left side on desktop */}
      <div className="order-2 md:order-1 w-full md:w-72 bg-white md:bg-white/80 md:backdrop-blur-md flex flex-col shrink-0 border-t md:border-t-0 md:border-r border-neutral-200 overflow-hidden">
        {selectedHub ? (
          <div 
            key={selectedHub} 
            className="flex flex-col flex-1 animate-map-fade-in"
          >
            {/* Hub Header */}
            <div className="p-4 md:p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-pink-700 animate-pulse" />
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                  {selectedHubData?.state} Hub
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900">{selectedHub}</h3>
              <p className="text-sm text-neutral-500 mt-1">{description}</p>
            </div>

            {/* Popular Routes */}
            <div className="flex-1 p-4 md:p-5">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                Popular Routes
              </p>
              <div className="space-y-1">
                {routes.map((route, idx) => (
                  <div
                    key={`${selectedHub}-${route.to}`}
                    className="flex items-center gap-4 py-2 md:py-2.5 px-3 rounded-lg hover:bg-neutral-100 transition-all duration-300 cursor-pointer group animate-map-slide-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <span className="text-sm font-medium text-neutral-900 w-24">
                      {route.to}
                    </span>
                    <span className="text-sm font-semibold text-pink-700 tabular-nums">
                      {route.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 border-t border-neutral-100">
              <button className="w-full py-2.5 px-4 bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold rounded-lg transition-colors">
                Get Quote from {selectedHub}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-5">
            <p className="text-neutral-400 text-center">
              {isMobile ? "Tap" : "Hover over"} a hub marker to see details
            </p>
          </div>
        )}
        
      </div>

      {/* Map */}
      <div className="order-1 md:order-2 relative w-full h-[300px] md:h-[550px]">
        <MapContainer
          center={australiaCenter}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <SetView isMobile={isMobile} />
          <MarkerStateSync selectedHub={selectedHub} />
          
          {hubs.map((hub) => (
            <Marker
              key={hub.city}
              position={[hub.lat, hub.lng]}
              icon={hubIcons[hub.city]}
              eventHandlers={{
                mouseover: () => handleHubSelect(hub.city),
                click: () => handleHubSelect(hub.city),
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
