"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { StepFooter } from "../_components/step-footer"
import { mockLocations } from "@/data/car-questions-flow"

interface LocationFormProps {
  initialParams: {
    pick?: string
    pickRef?: string
    drop?: string
    dropRef?: string
  }
}

export function LocationForm({ initialParams }: LocationFormProps) {
  const router = useRouter()
  
  const [pickup, setPickup] = React.useState(initialParams.pick || "")
  const [pickupRef, setPickupRef] = React.useState(initialParams.pickRef || "")
  const [dropoff, setDropoff] = React.useState(initialParams.drop || "")
  const [dropoffRef, setDropoffRef] = React.useState(initialParams.dropRef || "")
  
  const [pickupSuggestions, setPickupSuggestions] = React.useState<typeof mockLocations>([])
  const [dropoffSuggestions, setDropoffSuggestions] = React.useState<typeof mockLocations>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = React.useState(false)
  const [showDropoffSuggestions, setShowDropoffSuggestions] = React.useState(false)

  const isValid = pickup && dropoff && pickupRef && dropoffRef

  // Filter suggestions based on input
  const filterLocations = (query: string) => {
    if (!query) return []
    const lowerQuery = query.toLowerCase()
    return mockLocations.filter(
      (loc) =>
        loc.label.toLowerCase().includes(lowerQuery) ||
        loc.value.toLowerCase().includes(lowerQuery)
    )
  }

  const handlePickupChange = (value: string) => {
    setPickup(value)
    setPickupRef("")
    setPickupSuggestions(filterLocations(value))
    setShowPickupSuggestions(true)
  }

  const handleDropoffChange = (value: string) => {
    setDropoff(value)
    setDropoffRef("")
    setDropoffSuggestions(filterLocations(value))
    setShowDropoffSuggestions(true)
  }

  const selectPickup = (location: typeof mockLocations[number]) => {
    setPickup(location.label)
    setPickupRef(location.ref)
    setShowPickupSuggestions(false)
  }

  const selectDropoff = (location: typeof mockLocations[number]) => {
    setDropoff(location.label)
    setDropoffRef(location.ref)
    setShowDropoffSuggestions(false)
  }

  const handleContinue = () => {
    const params = new URLSearchParams()
    params.set("pick", pickup)
    params.set("pickRef", pickupRef)
    params.set("drop", dropoff)
    params.set("dropRef", dropoffRef)
    router.push(`/car/questions/vehicle?${params.toString()}`)
  }

  const getSummary = () => {
    if (pickup && dropoff) {
      return `${pickup} → ${dropoff}`
    }
    return undefined
  }

  // Shorter version for mobile footer (just city names)
  const getMobileSummary = () => {
    if (pickup && dropoff) {
      const pickCity = pickup.split(',')[0]
      const dropCity = dropoff.split(',')[0]
      return `${pickCity} → ${dropCity}`
    }
    return undefined
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-6 pb-24 md:pb-0">
          {/* Pickup Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Pickup Location *
            </label>
            <div className="relative">
              <input
                type="text"
                value={pickup}
                onChange={(e) => handlePickupChange(e.target.value)}
                onFocus={() => setShowPickupSuggestions(pickupSuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                placeholder="Enter your pickup location"
                className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
              
              {/* Suggestions dropdown */}
              {showPickupSuggestions && pickupSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                  {pickupSuggestions.map((loc) => (
                    <button
                      key={loc.value}
                      type="button"
                      onClick={() => selectPickup(loc)}
                      className="w-full px-4 py-3 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Destination *
            </label>
            <div className="relative">
              <input
                type="text"
                value={dropoff}
                onChange={(e) => handleDropoffChange(e.target.value)}
                onFocus={() => setShowDropoffSuggestions(dropoffSuggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 200)}
                placeholder="Enter your destination"
                className="h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
              
              {/* Suggestions dropdown */}
              {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                  {dropoffSuggestions.map((loc) => (
                    <button
                      key={loc.value}
                      type="button"
                      onClick={() => selectDropoff(loc)}
                      className="w-full px-4 py-3 text-left text-sm text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StepFooter
        isValid={!!isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileValue={getMobileSummary()}
      />
    </>
  )
}

