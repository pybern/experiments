"use client"

import * as React from "react"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { AnimateNumber } from "motion-plus/react"
import { LayoutGroup, motion } from "motion/react"

interface StepHeaderProps {
  stepNumber: number
  totalSteps: number
  title: string
  description: string
  backHref: string
  progress: number
}

function RollingStepCounter({
  stepNumber,
  totalSteps,
}: {
  stepNumber: number
  totalSteps: number
}) {
  return (
    <LayoutGroup>
      <motion.div
        layout
        className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 font-mono text-sm"
      >
        <span className="text-neutral-500">Step</span>
        <AnimateNumber className="tabular-nums font-semibold text-white">
          {stepNumber}
        </AnimateNumber>
        <span className="text-neutral-600">/</span>
        <span className="tabular-nums text-neutral-500">{totalSteps}</span>
      </motion.div>
    </LayoutGroup>
  )
}

export function StepHeader({
  stepNumber,
  totalSteps,
  title,
  description,
  backHref,
  progress,
}: StepHeaderProps) {
  return (
    <div className="sticky top-[52px] z-10 bg-neutral-50">
      {/* Progress Bar - Top, full width */}
      <div className="h-1 w-full bg-neutral-200">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-600 via-pink-500 to-rose-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5,
          }}
        />
      </div>

      <div className="border-b border-neutral-200/60 bg-neutral-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={backHref}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>

            <RollingStepCounter stepNumber={stepNumber} totalSteps={totalSteps} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-4 font-serif text-2xl text-neutral-900 md:text-3xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-1 text-sm text-neutral-500"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
