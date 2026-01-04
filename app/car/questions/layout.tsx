"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { AnimateNumber } from "motion-plus/react"
import { LayoutGroup, motion } from "motion/react"
import { carSteps, totalSteps, getStepByRoute } from "@/data/car-questions-flow"

// Module-level state to persist across navigations
let persistedStep = 1
let persistedProgress = 12.5

function RollingStepCounter({ stepNumber }: { stepNumber: number }) {
  return (
    <LayoutGroup>
      <motion.div
        layout
        className="flex items-center gap-1 font-mono text-sm text-neutral-400"
      >
        <AnimateNumber 
          className="tabular-nums font-semibold text-neutral-900"
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          {stepNumber}
        </AnimateNumber>
        <span>/</span>
        <span className="tabular-nums">{totalSteps}</span>
      </motion.div>
    </LayoutGroup>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-1 w-full bg-neutral-200">
      <motion.div
        className="h-full bg-gradient-to-r from-pink-600 via-pink-500 to-rose-400"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        }}
      />
    </div>
  )
}

function BackButton() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const stepConfig = getStepByRoute(pathname)
  if (!stepConfig) return null
  
  const stepIndex = carSteps.findIndex(s => s.id === stepConfig.id)
  
  const buildBackHref = () => {
    if (stepIndex <= 0) return "/grid"
    const prevStep = carSteps[stepIndex - 1]
    const params = new URLSearchParams(searchParams.toString())
    return `${prevStep.route}?${params.toString()}`
  }

  return (
    <Link
      href={buildBackHref()}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800"
    >
      <ArrowLeftIcon className="h-4 w-4" />
    </Link>
  )
}

function StepContent({ stepConfig }: { stepConfig: ReturnType<typeof getStepByRoute> }) {
  if (!stepConfig) return null

  return (
    <>
      <motion.h1
        key={stepConfig.id + "-title"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mt-4 font-serif text-2xl text-neutral-900 md:text-3xl"
      >
        {stepConfig.title}
      </motion.h1>
      <motion.p
        key={stepConfig.id + "-desc"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-1 text-sm text-neutral-500"
      >
        {stepConfig.description}
      </motion.p>
    </>
  )
}

function QuestionsHeaderInner() {
  const pathname = usePathname()
  const stepConfig = getStepByRoute(pathname)
  
  // Calculate target step from pathname
  const targetStepNumber = stepConfig ? carSteps.findIndex(s => s.id === stepConfig.id) + 1 : 1
  const targetProgress = stepConfig?.progress ?? 12.5
  
  // Initialize state from persisted module-level values
  const [displayStep, setDisplayStep] = useState(() => persistedStep)
  const [displayProgress, setDisplayProgress] = useState(() => persistedProgress)
  const hasUpdated = useRef(false)
  
  useEffect(() => {
    // Only update if the target has changed from what we're displaying
    if (targetStepNumber !== displayStep || targetProgress !== displayProgress) {
      // Small delay to ensure mount is complete before animating
      const timer = setTimeout(() => {
        setDisplayStep(targetStepNumber)
        setDisplayProgress(targetProgress)
        // Persist for next navigation
        persistedStep = targetStepNumber
        persistedProgress = targetProgress
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [targetStepNumber, targetProgress, displayStep, displayProgress])

  return (
    <div className="sticky top-[52px] z-10 bg-neutral-50">
      <ProgressBar progress={displayProgress} />

      <div className="border-b border-neutral-200/60 bg-neutral-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Suspense fallback={<div className="h-8 w-8" />}>
              <BackButton />
            </Suspense>
            
            <RollingStepCounter stepNumber={displayStep} />
          </div>

          <StepContent stepConfig={stepConfig} />
        </div>
      </div>
    </div>
  )
}

export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={null}>
      <QuestionsHeaderInner />
      {children}
    </Suspense>
  )
}
