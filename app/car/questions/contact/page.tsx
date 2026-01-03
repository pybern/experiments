"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircleIcon } from "lucide-react"
import { StepHeader } from "../_components/step-header"
import { StepFooter } from "../_components/step-footer"
import { carSteps, totalSteps, vehicleMakes, vehicleModels } from "@/data/car-questions-flow"

const stepConfig = carSteps[4] // contact step

const submitSteps = [
  "Getting your rates",
  "Preparing your quote",
  "Sending confirmation",
  "Almost there...",
]

function ContactStepContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get all previous params
  const pick = searchParams.get("pick") || ""
  const pickRef = searchParams.get("pickRef") || ""
  const drop = searchParams.get("drop") || ""
  const dropRef = searchParams.get("dropRef") || ""
  const make = searchParams.get("make") || ""
  const model = searchParams.get("model") || ""
  const age = searchParams.get("age") || ""
  const drive = searchParams.get("drive") || ""
  const auction = searchParams.get("auction") || ""
  const salvage = searchParams.get("salvage") || ""
  
  // Dimension params (optional)
  const carLength = searchParams.get("carLength") || ""
  const carHeight = searchParams.get("carHeight") || ""
  const carClearance = searchParams.get("carClearance") || ""
  const carValue = searchParams.get("carValue") || ""

  // Redirect if missing required params
  React.useEffect(() => {
    if (!pick || !drop || !make || !model || !age || !drive || !auction) {
      router.replace("/car/questions/location")
    }
  }, [pick, drop, make, model, age, drive, auction, router])

  // Form state
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStep, setSubmitStep] = React.useState(0)
  const [isComplete, setIsComplete] = React.useState(false)

  // Simple email validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  // Simple phone validation (Australian format)
  const isValidPhone = /^[\d\s+()-]{8,}$/.test(phone)

  const isValid = isValidEmail && isValidPhone

  const getVehicleLabel = () => {
    const makeLabel = vehicleMakes.find((m) => m.value === make)?.label || make
    const modelLabel = vehicleModels[make]?.find((m) => m.value === model)?.label || model
    return `${makeLabel} ${modelLabel}`
  }

  const getRouteLabel = () => {
    // Extract just city names for cleaner display
    const pickCity = pick.split(',')[0]
    const dropCity = drop.split(',')[0]
    return `${pickCity} → ${dropCity}`
  }

  const getConditionLabel = () => {
    return drive === "driveable" ? "Driveable" : "Has Issues"
  }

  const getAgeLabel = () => {
    return age === "under30" ? "1985 or later" : "Pre-1985 classic"
  }

  const getAuctionLabel = () => {
    if (auction === "non-auction") {
      return "Private or dealer"
    }
    if (auction === "auction") {
      if (salvage === "salvage") {
        return "Salvage auction"
      }
      return "Auction house"
    }
    return ""
  }

  const getSpecsLabel = () => {
    const customSpecs: string[] = []
    if (carLength) customSpecs.push(`Length: ${carLength}m`)
    if (carHeight) customSpecs.push(`Height: ${carHeight}m`)
    if (carClearance) customSpecs.push(`Clearance: ${carClearance}cm`)
    if (carValue) customSpecs.push(`Value: $${carValue}`)
    
    if (customSpecs.length === 0) {
      return "Standard specs"
    }
    return `${customSpecs.length} custom spec${customSpecs.length > 1 ? "s" : ""}`
  }

  const getSpecsDetails = () => {
    const details: { label: string; value: string }[] = []
    if (carLength) details.push({ label: "Length", value: `${carLength} metres` })
    if (carHeight) details.push({ label: "Height", value: `${carHeight} metres` })
    if (carClearance) details.push({ label: "Clearance", value: `${carClearance} cm` })
    if (carValue) details.push({ label: "Value", value: `$${carValue} AUD` })
    return details
  }

  const handleSubmit = async () => {
    if (!isValid) return

    setIsSubmitting(true)

    // Simulate multi-step submission process
    for (let i = 0; i < submitSteps.length; i++) {
      setSubmitStep(i)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Show completion
    setIsComplete(true)

    // In a real app, redirect to quote page
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // For demo, just show success state
    // router.push(`/car/quote/${Date.now()}`)
  }

  const buildBackHref = () => {
    const params = new URLSearchParams(searchParams.toString())
    return `/car/questions/dimensions?${params.toString()}`
  }

  // Show submission progress overlay
  if (isSubmitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
              </div>
              <motion.p
                key={submitStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-medium text-neutral-900"
              >
                {submitSteps[submitStep]}
              </motion.p>
              <p className="mt-2 text-sm text-neutral-500">
                This won't take long...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 flex justify-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
              </motion.div>
              <h2 className="text-xl font-semibold text-neutral-900">
                Quote Ready!
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Check your email for your personalized quote.
              </p>
              <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-4">
                <p className="text-sm text-neutral-600">
                  <span className="font-medium">{getVehicleLabel()}</span>
                  <br />
                  {pick} → {drop}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <>
      <StepHeader
        stepNumber={5}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref={buildBackHref()}
        progress={stepConfig.progress}
      />

      <div className="mx-auto max-w-2xl px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6 pb-24 md:pb-0"
        >
          {/* Quote Summary Card */}
          <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400 w-24">Route</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{getRouteLabel()}</p>
                    <p className="text-xs text-neutral-500">{pick} → {drop}</p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Vehicle</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{getVehicleLabel()}</p>
                    <p className="text-xs text-neutral-500">{getAgeLabel()} · {getConditionLabel()}</p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Collection</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{getAuctionLabel()}</p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400 align-top">Specs</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{getSpecsLabel()}</p>
                    {getSpecsDetails().length > 0 && (
                      <p className="text-xs text-neutral-500">
                        {getSpecsDetails().map((spec, idx) => (
                          <span key={spec.label}>
                            {spec.label}: {spec.value}
                            {idx < getSpecsDetails().length - 1 && ' · '}
                          </span>
                        ))}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <p className="text-xs text-neutral-500">
              We'll never share your details or send spam.
            </p>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={`h-12 w-full rounded-lg border bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 ${
                  email && !isValidEmail
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                    : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                }`}
              />
              {email && !isValidEmail && (
                <p className="text-xs text-red-500">Please enter a valid email address</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Phone *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0412 345 678"
                className={`h-12 w-full rounded-lg border bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 ${
                  phone && !isValidPhone
                    ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                    : "border-neutral-200 focus:border-neutral-400 focus:ring-neutral-400"
                }`}
              />
              {phone && !isValidPhone && (
                <p className="text-xs text-red-500">Please enter a valid phone number</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <StepFooter
        isValid={isValid}
        onContinue={handleSubmit}
        continueLabel="Get My Quote"
        summary={isValid ? "Ready to submit" : "Enter your contact details"}
        mobileLabel="Contact"
        mobileValue={isValid ? email : undefined}
        isLoading={isSubmitting}
      />
    </>
  )
}

export default function ContactStep() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
      </div>
    }>
      <ContactStepContent />
    </Suspense>
  )
}

