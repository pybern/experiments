"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CheckCircleIcon } from "lucide-react"
import { StepFooter } from "../_components/step-footer"
import { vehicleMakes, vehicleModels } from "@/data/car-questions-flow"

interface ContactFormProps {
  initialParams: {
    pick?: string
    pickRef?: string
    drop?: string
    dropRef?: string
    make?: string
    model?: string
    age?: string
    drive?: string
    auction?: string
    salvage?: string
    carLength?: string
    carHeight?: string
    carClearance?: string
    carValue?: string
  }
}

const submitSteps = [
  "Getting your rates",
  "Preparing your quote",
  "Sending confirmation",
  "Almost there...",
]

export function ContactForm({ initialParams }: ContactFormProps) {
  const router = useRouter()

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
    const makeLabel = vehicleMakes.find((m) => m.value === initialParams.make)?.label || initialParams.make
    const modelLabel = vehicleModels[initialParams.make || ""]?.find((m) => m.value === initialParams.model)?.label || initialParams.model
    return `${makeLabel} ${modelLabel}`
  }

  const getRouteLabel = () => {
    // Extract just city names for cleaner display
    const pickCity = (initialParams.pick || "").split(',')[0]
    const dropCity = (initialParams.drop || "").split(',')[0]
    return `${pickCity} → ${dropCity}`
  }

  const getConditionLabel = () => {
    return initialParams.drive === "driveable" ? "Driveable" : "Has Issues"
  }

  const getAgeLabel = () => {
    return initialParams.age === "under30" ? "1985 or later" : "Pre-1985 classic"
  }

  const getAuctionLabel = () => {
    if (initialParams.auction === "non-auction") {
      return "Private or dealer"
    }
    if (initialParams.auction === "auction") {
      if (initialParams.salvage === "salvage") {
        return "Salvage auction"
      }
      return "Auction house"
    }
    return ""
  }

  const getSpecsLabel = () => {
    const customSpecs: string[] = []
    if (initialParams.carLength) customSpecs.push(`Length: ${initialParams.carLength}m`)
    if (initialParams.carHeight) customSpecs.push(`Height: ${initialParams.carHeight}m`)
    if (initialParams.carClearance) customSpecs.push(`Clearance: ${initialParams.carClearance}cm`)
    if (initialParams.carValue) customSpecs.push(`Value: $${initialParams.carValue}`)
    
    if (customSpecs.length === 0) {
      return "Standard specs"
    }
    return `${customSpecs.length} custom spec${customSpecs.length > 1 ? "s" : ""}`
  }

  const getSpecsDetails = () => {
    const details: { label: string; value: string }[] = []
    if (initialParams.carLength) details.push({ label: "Length", value: `${initialParams.carLength} metres` })
    if (initialParams.carHeight) details.push({ label: "Height", value: `${initialParams.carHeight} metres` })
    if (initialParams.carClearance) details.push({ label: "Clearance", value: `${initialParams.carClearance} cm` })
    if (initialParams.carValue) details.push({ label: "Value", value: `$${initialParams.carValue} AUD` })
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
    const params = new URLSearchParams()
    if (initialParams.pick) params.set("pick", initialParams.pick)
    if (initialParams.pickRef) params.set("pickRef", initialParams.pickRef)
    if (initialParams.drop) params.set("drop", initialParams.drop)
    if (initialParams.dropRef) params.set("dropRef", initialParams.dropRef)
    if (initialParams.make) params.set("make", initialParams.make)
    if (initialParams.model) params.set("model", initialParams.model)
    if (initialParams.age) params.set("age", initialParams.age)
    if (initialParams.drive) params.set("drive", initialParams.drive)
    if (initialParams.auction) params.set("auction", initialParams.auction)
    if (initialParams.salvage) params.set("salvage", initialParams.salvage)
    if (initialParams.carLength) params.set("carLength", initialParams.carLength)
    if (initialParams.carHeight) params.set("carHeight", initialParams.carHeight)
    if (initialParams.carClearance) params.set("carClearance", initialParams.carClearance)
    if (initialParams.carValue) params.set("carValue", initialParams.carValue)
    return `/car/questions/dimensions?${params.toString()}`
  }

  // Show submission progress overlay
  if (isSubmitting) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        {!isComplete ? (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800" />
            </div>
            <p className="text-lg font-medium text-neutral-900 transition-opacity duration-200">
              {submitSteps[submitStep]}
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              This won't take long...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
            </div>
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
                {initialParams.pick} → {initialParams.drop}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-6 pb-24 md:pb-0">
          {/* Quote Summary Card */}
          <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400 w-24">Route</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{getRouteLabel()}</p>
                    <p className="text-xs text-neutral-500">{initialParams.pick} → {initialParams.drop}</p>
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
            <p className="text-sm tracking-tight font-medium">
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
        </div>
      </div>

      <StepFooter
        isValid={isValid}
        onContinue={handleSubmit}
        continueLabel="Get My Quote"
        summary={isValid ? "Ready to submit" : "Enter your contact details"}
        mobileLabel="Contact"
        mobileValue={isValid ? email : undefined}
        isLoading={isSubmitting}
        backHref={buildBackHref()}
      />
    </>
  )
}

