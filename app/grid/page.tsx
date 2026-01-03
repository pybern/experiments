"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PlusIcon, CheckIcon, ArrowLeftIcon, SearchIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { vehicleTypes, type VehicleType } from "@/data/vehicle-types"

function GridCard({
  item,
  index,
  isSelected,
  onToggle,
}: {
  item: VehicleType
  index: number
  isSelected: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      id={`grid-card-${item.title.replace(/[^a-zA-Z0-9]/g, '-')}`}
      layout
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onToggle}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white transition-all duration-200 ${
        isSelected 
          ? "border-neutral-400 shadow-lg ring-2 ring-neutral-800 ring-offset-2" 
          : "border-neutral-200 hover:border-neutral-300 hover:shadow-md"
      }`}
    >
      {/* Hero Image Section */}
      <div className="relative flex h-36 items-center justify-center bg-white p-4">
        <motion.img 
          src={item.image} 
          alt={item.title}
          className="h-full w-auto max-w-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-rose-100/30" />
        
        {/* Add/Check button - positioned in corner */}
        <motion.div
          initial={false}
          animate={{ 
            scale: isSelected ? 1 : 0.9,
            opacity: isSelected ? 1 : 0.8
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-sm transition-colors ${
            isSelected
              ? "border-neutral-800 bg-neutral-800 text-white"
              : "border-neutral-300 bg-white text-neutral-400 group-hover:border-neutral-400 group-hover:text-neutral-600"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isSelected ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <CheckIcon className="h-4 w-4" strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <PlusIcon className="h-4 w-4" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Badge */}
        {item.badge && (
          <span className="mb-1.5 w-fit rounded-full bg-[#d63c83]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#d63c83]">
            {item.badge}
          </span>
        )}
        
        {/* Title */}
        <h3 className="text-sm font-semibold text-neutral-900">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
          {item.description}
        </p>

        {/* Vehicle Examples */}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.details.split(' • ').map((example) => (
            <span
              key={example}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500"
            >
              {example}
            </span>
          ))}
        </div>
      </div>

      {/* Selection indicator bar */}
      <motion.div
        initial={false}
        animate={{ 
          scaleX: isSelected ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-neutral-800"
      />
    </motion.div>
  )
}

function GridPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const hasInitializedRef = React.useRef(false)

  // Filter vehicles based on search query (always include "Other Items" as fallback)
  const filteredVehicles = React.useMemo(() => {
    if (!searchQuery.trim()) return vehicleTypes
    const query = searchQuery.toLowerCase()
    const filtered = vehicleTypes.filter(
      (v) =>
        v.title.toLowerCase().includes(query) ||
        v.details.toLowerCase().includes(query)
    )
    
    // Always include "Other Items" if not already in results
    const otherItems = vehicleTypes.find(v => v.title === "Other Items")
    if (otherItems && !filtered.includes(otherItems)) {
      return [...filtered, otherItems]
    }
    
    return filtered
  }, [searchQuery])

  // Initialize from URL parameter and scroll to selected card (mobile only, initial load only)
  React.useEffect(() => {
    const vehicleParam = searchParams.get('vehicle')
    if (vehicleParam) {
      // Check if the vehicle exists in our list
      const vehicle = vehicleTypes.find(v => v.title === vehicleParam)
      if (vehicle) {
        setSelectedItem(vehicleParam)
        
        // Scroll to the selected card on mobile only on initial navigation
        if (!hasInitializedRef.current && window.innerWidth < 768) {
          setTimeout(() => {
            const cardId = `grid-card-${vehicle.title.replace(/[^a-zA-Z0-9]/g, '-')}`
            const cardEl = document.getElementById(cardId)
            if (cardEl) {
              cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 400)
        }
      }
    }
    hasInitializedRef.current = true
  }, [searchParams])

  const selectItem = (title: string) => {
    const newSelection = selectedItem === title ? null : title
    setSelectedItem(newSelection)
    
    // Update URL parameter
    if (newSelection) {
      router.replace(`/grid?vehicle=${encodeURIComponent(newSelection)}`, { scroll: false })
    } else {
      router.replace('/grid', { scroll: false })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 border-b border-neutral-200/80 bg-neutral-50/95 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
            <p className="text-sm font-medium text-neutral-400">Step 1 of 2</p>
          </div>
          <h1 className="mt-2 font-serif text-2xl text-neutral-900 md:text-3xl">
            What would you like to transport?
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {searchQuery ? (
              <>
                Showing {filteredVehicles.length} of {vehicleTypes.length} categories
              </>
            ) : (
              "Select a vehicle type that matches your needs."
            )}
          </p>
          
          {/* Search Input */}
          <div className="relative mt-3">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-10 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 md:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 pb-28 sm:grid-cols-2 md:grid-cols-3 md:pb-32 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((item, index) => (
              <GridCard
                key={item.title}
                item={item}
                index={index}
                isSelected={selectedItem === item.title}
                onToggle={() => selectItem(item.title)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* No results message */}
        {filteredVehicles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-neutral-500">No vehicles match your search.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-2 text-sm font-medium text-neutral-800 underline underline-offset-2 hover:text-neutral-600"
            >
              Clear search
            </button>
          </motion.div>
        )}

      </div>

      {/* Sticky Footer - Desktop only */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="fixed inset-x-0 bottom-10 z-50 mx-6 hidden rounded-xl border border-neutral-200/80 bg-neutral-50/95 shadow-lg backdrop-blur-sm md:block"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-sm text-neutral-500">
            {selectedItem ? (
              <>
                Selected: <span className="font-semibold text-neutral-800">{selectedItem}</span>
              </>
            ) : (
              "No item selected"
            )}
          </p>
          
          <button
            disabled={!selectedItem}
            className={`rounded-sm px-6 py-2.5 text-sm font-medium transition-all ${
              selectedItem
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "cursor-not-allowed bg-neutral-200 text-neutral-400"
            }`}
          >
            Continue
          </button>
        </div>
      </motion.div>

      {/* Sticky Footer - Mobile only (glassmorphism style) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="fixed inset-x-4 bottom-4 z-50 flex h-14 items-center rounded-full border border-white/10 bg-neutral-900/70 px-2 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden"
      >
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-1 items-center"
            >
              {/* Left: "Move my" label */}
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="shrink-0 pl-3 text-xs font-medium uppercase tracking-wide text-white/50"
              >
                Move my
              </motion.span>
              
              {/* Center: Selected vehicle */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="min-w-0 flex-1 px-2 text-center"
              >
                <span className="block truncate text-sm font-medium text-white">
                  {selectedItem}
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 pl-4 text-center"
            >
              <span className="text-sm text-white/50">Select your vehicle</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Right: Button */}
        <button
          disabled={!selectedItem}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            selectedItem
              ? "bg-white text-neutral-900 hover:bg-neutral-100"
              : "cursor-not-allowed bg-white/10 text-white/30"
          }`}
        >
          {selectedItem ? "Let's go!" : "Select"}
        </button>
      </motion.div>
    </div>
  )
}

export default function GridPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
      </div>
    }>
      <GridPageContent />
    </Suspense>
  )
}

