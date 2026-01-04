"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useNavigation } from "./navigation-context"

interface StepHeaderProps {
  stepNumber: number
  totalSteps: number
  title: string
  description: string
  backHref: string
  progress: number
  previousProgress?: number
}

export function StepHeader({
  stepNumber,
  totalSteps,
  title,
  description,
  backHref,
  progress,
  previousProgress,
}: StepHeaderProps) {
  const { direction, isFirstRender } = useNavigation()
  
  // Skip entrance animations on back navigation
  const shouldAnimateEntrance = direction !== "back" || isFirstRender
  
  // For progress bar: animate from previous progress when going forward,
  // or just set to current value when going back
  const progressInitial = direction === "back" 
    ? progress 
    : (previousProgress ?? 0)

  return (
    <motion.div
      initial={shouldAnimateEntrance ? { opacity: 0, y: -10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldAnimateEntrance ? 0.3 : 0 }}
      className="sticky top-[52px] z-10 border-b border-neutral-200/60 bg-neutral-50/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-2xl px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            prefetch={true}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <p className="text-sm font-medium text-neutral-400">
            Step {stepNumber} of {totalSteps}
          </p>
        </div>
        <h1 className="mt-2 font-serif text-2xl text-neutral-900 md:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {description}
        </p>

        {/* Progress Bar - animates appropriately based on direction */}
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-neutral-200">
          <motion.div
            initial={{ width: `${progressInitial}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: shouldAnimateEntrance ? 0.4 : 0.2, 
              ease: "easeOut" 
            }}
            className="h-full bg-neutral-800"
          />
        </div>
      </div>
    </motion.div>
  )
}

