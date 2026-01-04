"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import { StepHeader } from "../_components/step-header"
import { StepFooter } from "../_components/step-footer"
import { RadioGroup } from "../_components/radio-group"
import { useNavigation } from "../_components/navigation-context"
import { carSteps, totalSteps, checkExitCondition } from "@/data/car-questions-flow"

const stepConfig = carSteps[2] // auction step

export default function AuctionStep() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { direction, setForwardNavigation, isFirstRender } = useNavigation()
  
  // Skip animations on back navigation
  const shouldAnimate = direction !== "back" || isFirstRender

  // Get all previous params
  const pick = searchParams.get("pick") || ""
  const pickRef = searchParams.get("pickRef") || ""
  const drop = searchParams.get("drop") || ""
  const dropRef = searchParams.get("dropRef") || ""
  const make = searchParams.get("make") || ""
  const model = searchParams.get("model") || ""
  const age = searchParams.get("age") || ""
  const drive = searchParams.get("drive") || ""

  // Redirect if missing required params
  React.useEffect(() => {
    if (!pick || !drop || !make || !model || !age || !drive) {
      router.replace("/car/questions/location")
    }
  }, [pick, drop, make, model, age, drive, router])

  // Form state
  const [auction, setAuction] = React.useState<string | null>(searchParams.get("auction") || null)
  const [salvage, setSalvage] = React.useState<string | null>(searchParams.get("salvage") || null)

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

    // Preserve all existing params and update current step's values
    const params = new URLSearchParams(searchParams.toString())
    params.set("auction", auction!)
    if (salvage) {
      params.set("salvage", salvage)
    } else {
      params.delete("salvage")
    }
    // Mark as forward navigation for animation optimization
    setForwardNavigation()
    router.push(`${stepConfig.nextRoute}?${params.toString()}`)
  }

  const buildBackHref = () => {
    return `/car/questions/vehicle?${searchParams.toString()}`
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
      <StepHeader
        stepNumber={3}
        totalSteps={totalSteps}
        title={stepConfig.title}
        description={stepConfig.description}
        backHref={buildBackHref()}
        progress={stepConfig.progress}
        previousProgress={carSteps[1].progress}
      />

      <div className="mx-auto max-w-2xl px-6 py-6">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldAnimate ? 0.35 : 0, delay: shouldAnimate ? 0.1 : 0 }}
          className="space-y-8 pb-24 md:pb-0"
        >
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
          <AnimatePresence mode="wait">
            {showSalvageQuestion && (
              <motion.div
                key="salvage-question"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <StepFooter
        isValid={!!isValid}
        onContinue={handleContinue}
        summary={getSummary()}
        mobileLabel="Auction"
        mobileValue={getSummary()}
        continueLabel={salvage === "salvage" ? "Get Custom Quote" : "Continue"}
      />
    </>
  )
}

