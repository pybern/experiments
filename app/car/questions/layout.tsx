"use client"

import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { AnimateNumber } from "motion-plus/react"
import { motion } from "motion/react"
import { carSteps, totalSteps, getStepByRoute } from "@/data/car-questions-flow"

function StepCounter({ stepNumber }: { stepNumber: number }) {
  return (
    <div className="flex items-center gap-1 font-mono text-sm text-neutral-400">
      <AnimateNumber 
        className="tabular-nums font-semibold text-neutral-900"
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {stepNumber}
      </AnimateNumber>
      <span>/</span>
      <span className="tabular-nums">{totalSteps}</span>
    </div>
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
      <h1 className="mt-4 font-serif text-2xl text-neutral-900 md:text-3xl">
        {stepConfig.title}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {stepConfig.description}
      </p>
    </>
  )
}

function QuestionsHeader() {
  const pathname = usePathname()
  const stepConfig = getStepByRoute(pathname)
  
  const stepNumber = stepConfig ? carSteps.findIndex(s => s.id === stepConfig.id) + 1 : 1
  const progress = stepConfig?.progress ?? 12.5

  return (
    <div className="sticky top-[52px] z-10 bg-neutral-50">
      <ProgressBar progress={progress} />

      <div className="border-b border-neutral-200/60 bg-neutral-50/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Suspense fallback={<div className="h-8 w-8" />}>
              <BackButton />
            </Suspense>
            
            <StepCounter stepNumber={stepNumber} />
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
      <QuestionsHeader />
      {children}
    </Suspense>
  )
}
