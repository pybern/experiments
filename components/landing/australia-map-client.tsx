"use client"

import { motion } from "motion/react"
import dynamic from "next/dynamic"

interface Hub {
  city: string
  state: string
  lat: number
  lng: number
  major: boolean
}

interface AustraliaMapClientProps {
  hubs: Hub[]
  hubRoutes: Record<string, { to: string; price: string }[]>
  hubDescriptions: Record<string, string>
}

// Dynamically import the LeafletMap component to avoid SSR issues
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] md:h-[550px] bg-neutral-100 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-neutral-400">Loading map...</span>
    </div>
  ),
})

export function AustraliaMapClient({ hubs, hubRoutes, hubDescriptions }: AustraliaMapClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200"
    >
      <LeafletMap 
        hubs={hubs} 
        hubRoutes={hubRoutes} 
        hubDescriptions={hubDescriptions} 
      />
    </motion.div>
  )
}

