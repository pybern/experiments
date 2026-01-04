"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { StepFooter } from "../_components/step-footer"
import { ToggleInput } from "../_components/toggle-input"

interface DimensionsFormProps {
  initialParams: Record<string, string | undefined>
}

export function DimensionsForm({ initialParams }: DimensionsFormProps) {
  const router = useRouter()

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
    (!lengthToggle || lengthValue.trim() !== "") &&
    (!heightToggle || heightValue.trim() !== "") &&
    (!clearanceToggle || clearanceValue.trim() !== "") &&
    (!valueToggle || valueValue.trim() !== "")

  const handleContinue = () => {
    // If any dimension is non-standard, go to custom quote
    if (hasCustomDimensions) {
      router.push(`/custom?reason=custom_dimensions`)
      return
    }

    // Build params - preserve all existing and add/update current step's values
    const params = new URLSearchParams()
    Object.entries(initialParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    
    // Set/update this step's values (dimension values if provided)
    if (lengthValue) params.set("carLength", lengthValue)
    if (heightValue) params.set("carHeight", heightValue)
    if (clearanceValue) params.set("carClearance", clearanceValue)
    if (valueValue) params.set("carValue", valueValue)
    
    router.push(`/car/questions/contact?${params.toString()}`)
  }

  const buildBackHref = () => {
    const params = new URLSearchParams()
    Object.entries(initialParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    return `/car/questions/auction?${params.toString()}`
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
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-4 pb-24 md:pb-0">
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
        </div>
      </div>

      <StepFooter
        isValid={isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileLabel="Specs"
        mobileValue={getSummary()}
        continueLabel={hasCustomDimensions ? "Get Custom Quote" : "Continue"}
        backHref={buildBackHref()}
      />
    </>
  )
}

