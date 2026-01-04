"use client"

import { Suspense } from "react"
import { NavigationProvider } from "./_components/navigation-context"

// Lightweight skeleton that matches the step layout structure
function StepSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="sticky top-[52px] z-10 border-b border-neutral-200/60 bg-neutral-50/95">
        <div className="mx-auto max-w-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-neutral-200" />
            <div className="h-4 w-24 rounded bg-neutral-200" />
          </div>
          <div className="mt-3 h-7 w-3/4 rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-full rounded bg-neutral-200" />
          <div className="mt-4 h-1 w-full rounded-full bg-neutral-200" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="mx-auto max-w-2xl px-6 py-6">
        <div className="space-y-4">
          <div className="h-12 w-full rounded-lg bg-neutral-200" />
          <div className="h-12 w-full rounded-lg bg-neutral-200" />
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
    <Suspense fallback={<StepSkeleton />}>
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </Suspense>
  )
}

