"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import { StepHeader } from "../_components/step-header"
import { StepFooter } from "../_components/step-footer"
import { carSteps, totalSteps, mockLocations } from "@/data/car-questions-flow"

const stepConfig = carSteps[0] // location step

function LocationStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [pickup, setPickup] = React.useState(searchParams.get("pick") || "")
  const [pickupRef, setPickupRef] = React.useState(searchParams.get("pickRef") || "")
  const [dropoff, setDropoff] = React.useState(searchParams.get("drop") || "")
  const [dropoffRef, setDropoffRef] = React.useState(searchParams.get("dropRef") || "")
  
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
    // Preserve all existing params and update current step's values
    const params = new URLSearchParams(searchParams.toString())
    params.set("pick", pickup)
    params.set("pickRef", pickupRef)
    params.set("drop", dropoff)
    params.set("dropRef", dropoffRef)
    router.push(`${stepConfig.nextRoute}?${params.toString()}`)
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
      <StepHeader
        stepNumber={1}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref="/grid"
        progress={stepConfig.progress}
      />

      <div className="mx-auto max-w-2xl px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6 pb-24 md:pb-0"
        >
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
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
                </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg"
                >
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
                </motion.div>
              )}
            </div>
          </div>


        </motion.div>
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

export default function LocationStep() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
      </div>
    }>
      <LocationStepContent />
    </Suspense>
  )
}

