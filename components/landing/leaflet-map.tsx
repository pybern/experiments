"use client"

import { useEffect, useState } from "react"
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

// Custom marker icons with labels
const createIcon = (city: string, isSelected: boolean) => {
  const size = isSelected ? 28 : 20
  const bgColor = isSelected ? "#be185d" : "#be185d"
  const borderWidth = isSelected ? 4 : 3
  
  return L.divIcon({
    className: "custom-marker-with-label",
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
        cursor: pointer;
      ">
        <div style="
          width: ${size}px;
          height: ${size}px;
          background-color: ${bgColor};
          border: ${borderWidth}px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ${isSelected ? 'box-shadow: 0 0 0 4px rgba(190, 24, 93, 0.3), 0 2px 8px rgba(0,0,0,0.3);' : 'animation: pulse 2s infinite;'}
          transition: all 0.2s ease;
        "></div>
        <div style="
          margin-top: 4px;
          padding: ${isSelected ? '4px 10px' : '3px 8px'};
          background: ${isSelected ? '#be185d' : 'white'};
          border-radius: 4px;
          font-size: ${isSelected ? '13px' : '12px'};
          font-weight: 600;
          color: ${isSelected ? 'white' : '#171717'};
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          font-family: system-ui, -apple-system, sans-serif;
          transition: all 0.2s ease;
        ">${city}</div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(190, 24, 93, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(190, 24, 93, 0); }
        }
      </style>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 10],
  })
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

  useEffect(() => {
    setIsMounted(true)
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      <div className="order-2 md:order-1 w-full md:w-72 bg-white md:bg-white/80 md:backdrop-blur-md flex flex-col shrink-0 border-t md:border-t-0 md:border-r border-neutral-200">
        {selectedHub ? (
          <>
            {/* Hub Header */}
            <div className="p-4 md:p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-pink-700" />
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
                    key={idx}
                    className="flex items-center gap-4 py-2 md:py-2.5 px-3 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer group"
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
          </>
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
          
          {hubs.map((hub) => (
            <Marker
              key={hub.city}
              position={[hub.lat, hub.lng]}
              icon={createIcon(hub.city, hub.city === selectedHub)}
              eventHandlers={{
                mouseover: () => setSelectedHub(hub.city),
                click: () => setSelectedHub(hub.city),
              }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
