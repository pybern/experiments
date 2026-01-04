"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { StepFooter } from "../_components/step-footer"
import { RadioGroup } from "../_components/radio-group"
import { checkExitCondition } from "@/data/car-questions-flow"

interface AuctionFormProps {
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
  }
}

export function AuctionForm({ initialParams }: AuctionFormProps) {
  const router = useRouter()

  // Form state
  const [auction, setAuction] = React.useState<string | null>(initialParams.auction || null)
  const [salvage, setSalvage] = React.useState<string | null>(initialParams.salvage || null)

  const showSalvageQuestion = auction === "auction"
  const isValid = auction && (auction === "non-auction" || salvage)

  const handleContinue = () => {
    // Check exit condition for salvage
    if (salvage) {
      const exitReason = checkExitCondition("salvage", salvage)
      if (exitReason) {
        router.push(`/custom?reason=${exitReason}`)
        return
      }
    }

    // Build params
    const params = new URLSearchParams()
    params.set("pick", initialParams.pick || "")
    params.set("pickRef", initialParams.pickRef || "")
    params.set("drop", initialParams.drop || "")
    params.set("dropRef", initialParams.dropRef || "")
    params.set("make", initialParams.make || "")
    params.set("model", initialParams.model || "")
    params.set("age", initialParams.age || "")
    params.set("drive", initialParams.drive || "")
    params.set("auction", auction!)
    if (salvage) {
      params.set("salvage", salvage)
    }
    router.push(`/car/questions/dimensions?${params.toString()}`)
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
    return `/car/questions/vehicle?${params.toString()}`
  }

  const getSummary = () => {
    if (auction === "non-auction") {
      return "Not from auction"
    }
    if (auction === "auction") {
      if (salvage === "salvage") {
        return "Salvage auction"
      }
      if (salvage === "non-salvage") {
        return "Regular auction"
      }
      return "From auction house"
    }
    return undefined
  }

  return (
    <>
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-8 pb-24 md:pb-0">
          {/* Auction Question */}
          <RadioGroup
            label="Is your car from an auction house?"
            name="auction"
            value={auction}
            onChange={(value) => {
              setAuction(value)
              if (value === "non-auction") {
                setSalvage(null)
              }
            }}
            options={[
              {
                id: "auction-no",
                title: "No",
                description: "Pickup from residential, business, or dealer address",
                value: "non-auction",
              },
              {
                id: "auction-yes",
                title: "Yes",
                description: "Vehicle is being collected from an auction house",
                value: "auction",
              },
            ]}
          />

          {/* Conditional Salvage Question */}
          {showSalvageQuestion && (
            <div className="transition-opacity duration-200">
              <RadioGroup
                label="Was your car purchased from a Salvage auction?"
                name="salvage"
                value={salvage}
                onChange={setSalvage}
                options={[
                  {
                    id: "salvage-no",
                    title: "No",
                    description: "Standard auction (Pickles, Manheim, etc.)",
                    value: "non-salvage",
                  },
                  {
                    id: "salvage-yes",
                    title: "Yes",
                    description: "May require special loading equipment",
                    value: "salvage",
                    hint: "Requires personalized quote",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      <StepFooter
        isValid={!!isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileLabel="Auction"
        mobileValue={getSummary()}
        continueLabel={salvage === "salvage" ? "Get Custom Quote" : "Continue"}
        backHref={buildBackHref()}
      />
    </>
  )
}

