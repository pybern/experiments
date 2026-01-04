"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDownIcon } from "lucide-react"
import { StepFooter } from "../_components/step-footer"
import { RadioGroup } from "../_components/radio-group"
import {
  vehicleMakes,
  vehicleModels,
  checkExitCondition,
} from "@/data/car-questions-flow"

interface VehicleFormProps {
  initialParams: Record<string, string | undefined>
}

export function VehicleForm({ initialParams }: VehicleFormProps) {
  const router = useRouter()

  // Form state
  const [make, setMake] = React.useState(initialParams.make || "")
  const [model, setModel] = React.useState(initialParams.model || "")
  const [age, setAge] = React.useState<string | null>(initialParams.age || null)
  const [drive, setDrive] = React.useState<string | null>(initialParams.drive || null)

  const availableModels = make ? vehicleModels[make] || [] : []

  const isValid = make && model && age && drive

  const handleMakeChange = (value: string) => {
    setMake(value)
    setModel("") // Reset model when make changes
  }

  const handleContinue = () => {
    // Check exit conditions
    if (age) {
      const exitReason = checkExitCondition("age", age)
      if (exitReason) {
        router.push(`/custom?reason=${exitReason}`)
        return
      }
    }
    if (drive) {
      const exitReason = checkExitCondition("drive", drive)
      if (exitReason) {
        router.push(`/custom?reason=${exitReason}`)
        return
      }
    }

    // Build params - preserve all existing params and add/update current step's values
    const params = new URLSearchParams()
    // First, copy all existing params
    Object.entries(initialParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    // Then set/update this step's values
    params.set("make", make)
    params.set("model", model)
    params.set("age", age!)
    params.set("drive", drive!)
    router.push(`/car/questions/auction?${params.toString()}`)
  }

  const getSelectedMakeLabel = () => {
    return vehicleMakes.find((m) => m.value === make)?.label || ""
  }

  const getSelectedModelLabel = () => {
    return availableModels.find((m) => m.value === model)?.label || ""
  }

  const getSummary = () => {
    if (make && model) {
      return `${getSelectedMakeLabel()} ${getSelectedModelLabel()}`
    }
    return undefined
  }

  const buildBackHref = () => {
    const params = new URLSearchParams()
    Object.entries(initialParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    return `/car/questions/location?${params.toString()}`
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-8 pb-24 md:pb-0">
          {/* Vehicle Make & Model */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-neutral-700">
              Search for a car make and model
            </label>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Make Select */}
              <div className="relative">
                <select
                  value={make}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  className="h-12 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-4 pr-10 text-base text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                >
                  <option value="">Select make</option>
                  {vehicleMakes.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>

              {/* Model Select */}
              <div className="relative">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="h-12 w-full appearance-none rounded-lg border border-neutral-200 bg-white px-4 pr-10 text-base text-neutral-900 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
                >
                  <option value="">Select model</option>
                  {availableModels.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Age Question */}
          <RadioGroup
            label="Was the vehicle manufactured in 1985 or later?"
            name="age"
            value={age}
            onChange={setAge}
            options={[
              {
                id: "age-yes",
                title: "Yes",
                description: "Vehicle manufactured in 1985 or later",
                value: "under30",
              },
              {
                id: "age-no",
                title: "No",
                description: "Pre-1985 classic vehicle",
                value: "over30",
                hint: "Requires personalized quote",
              },
            ]}
          />

          {/* Condition Question */}
          <RadioGroup
            label="How is your car's condition?"
            name="drive"
            value={drive}
            onChange={setDrive}
            options={[
              {
                id: "drive-yes",
                title: "Driveable",
                description: "Car is fully drivable and roadworthy",
                value: "driveable",
              },
              {
                id: "drive-no",
                title: "Has issues",
                description: "Needs special transport equipment",
                value: "issues",
                hint: "Requires personalized quote",
              },
            ]}
          />
        </div>
      </div>

      <StepFooter
        isValid={!!isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileLabel="Vehicle"
        mobileValue={getSummary()}
        continueLabel={age === "over30" || drive === "issues" ? "Get Custom Quote" : "Continue"}
        backHref={buildBackHref()}
      />
    </>
  )
}

