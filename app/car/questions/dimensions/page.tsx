"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import { StepHeader } from "../_components/step-header"
import { StepFooter } from "../_components/step-footer"
import { ToggleInput } from "../_components/toggle-input"
import { carSteps, totalSteps } from "@/data/car-questions-flow"

const stepConfig = carSteps[3] // dimensions step

function DimensionsStepContent() {
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

  // Redirect if missing required params
  React.useEffect(() => {
    if (!pick || !drop || !make || !model || !age || !drive || !auction) {
      router.replace("/car/questions/location")
    }
  }, [pick, drop, make, model, age, drive, auction, router])

  // Form state for dimension questions
  const [lengthToggle, setLengthToggle] = React.useState(false)
  const [lengthValue, setLengthValue] = React.useState("")
  
  const [heightToggle, setHeightToggle] = React.useState(false)
  const [heightValue, setHeightValue] = React.useState("")
  
  const [clearanceToggle, setClearanceToggle] = React.useState(false)
  const [clearanceValue, setClearanceValue] = React.useState("")
  
  const [valueToggle, setValueToggle] = React.useState(false)
  const [valueValue, setValueValue] = React.useState("")

  // Check if any toggle is on - this triggers custom quote
  const hasCustomDimensions = lengthToggle || heightToggle || clearanceToggle || valueToggle

  // Validate that if toggle is on, value must be provided
  const isValid = 
    (!lengthToggle || lengthValue.trim()) &&
    (!heightToggle || heightValue.trim()) &&
    (!clearanceToggle || clearanceValue.trim()) &&
    (!valueToggle || valueValue.trim())

  const handleContinue = () => {
    // If any dimension is non-standard, go to custom quote
    if (hasCustomDimensions) {
      router.push(`/custom?reason=custom_dimensions`)
      return
    }

    // Preserve all existing params and update current step's values
    const params = new URLSearchParams(searchParams.toString())
    
    // Add dimension values if provided, remove if not
    if (lengthValue) params.set("carLength", lengthValue)
    else params.delete("carLength")
    if (heightValue) params.set("carHeight", heightValue)
    else params.delete("carHeight")
    if (clearanceValue) params.set("carClearance", clearanceValue)
    else params.delete("carClearance")
    if (valueValue) params.set("carValue", valueValue)
    else params.delete("carValue")
    
    router.push(`${stepConfig.nextRoute}?${params.toString()}`)
  }

  const buildBackHref = () => {
    return `/car/questions/auction?${searchParams.toString()}`
  }

  const getCustomCount = () => {
    let count = 0
    if (lengthToggle) count++
    if (heightToggle) count++
    if (clearanceToggle) count++
    if (valueToggle) count++
    return count
  }

  const getSummary = () => {
    const customCount = getCustomCount()
    if (customCount > 0) {
      return `${customCount} custom spec${customCount > 1 ? "s" : ""}`
    }
    return "Standard specs"
  }

  return (
    <>
      <StepHeader
        stepNumber={4}
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
          className="space-y-4 pb-24 md:pb-0"
        >
          {/* Length Question */}
          <ToggleInput
            label="Is your vehicle over 5.2 metres in length?"
            description="The length of the car is from the front bumper to the rear bumper."
            isToggled={lengthToggle}
            onToggle={setLengthToggle}
            inputValue={lengthValue}
            onInputChange={setLengthValue}
            inputPlaceholder="Enter length"
            inputUnit="metres"
          />

          {/* Height Question */}
          <ToggleInput
            label="Is your vehicle over 1.9 metres in height?"
            description="The height of the car is from the ground to the highest point of the car."
            isToggled={heightToggle}
            onToggle={setHeightToggle}
            inputValue={heightValue}
            onInputChange={setHeightValue}
            inputPlaceholder="Enter height"
            inputUnit="metres"
          />

          {/* Ground Clearance Question */}
          <ToggleInput
            label="Does your vehicle have a ground clearance under 15cm?"
            description="The ground clearance is the distance between the lowest point of the car and the ground."
            isToggled={clearanceToggle}
            onToggle={setClearanceToggle}
            inputValue={clearanceValue}
            onInputChange={setClearanceValue}
            inputPlaceholder="Enter clearance"
            inputUnit="cm"
          />

          {/* Value Question */}
          <ToggleInput
            label="Is your car valued over $80,000?"
            description="Our warranty is based on the market value of the vehicle as deemed by the insurer."
            isToggled={valueToggle}
            onToggle={setValueToggle}
            inputValue={valueValue}
            onInputChange={setValueValue}
            inputPlaceholder="Enter value"
            inputUnit="AUD"
          />
        </motion.div>
      </div>

      <StepFooter
        isValid={isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileLabel="Specs"
        mobileValue={getSummary()}
        continueLabel={hasCustomDimensions ? "Get Custom Quote" : "Continue"}
      />
    </>
  )
}

export default function DimensionsStep() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
      </div>
    }>
      <DimensionsStepContent />
    </Suspense>
  )
}

