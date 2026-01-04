"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigation } from "./navigation-context"

interface StepFooterProps {
  isValid: boolean
  onContinue: () => void
  continueLabel?: string
  summary?: string
  mobileLabel?: string
  mobileValue?: string
  isLoading?: boolean
}

export function StepFooter({
  isValid,
  onContinue,
  continueLabel = "Continue",
  summary,
  mobileLabel,
  mobileValue,
  isLoading = false,
}: StepFooterProps) {
  const { direction, isFirstRender } = useNavigation()
  
  // Skip entrance animations on back navigation
  const shouldAnimate = direction !== "back" || isFirstRender
  
  return (
    <>
      {/* Desktop Footer - Inline with content */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? 0.3 : 0, duration: shouldAnimate ? 0.3 : 0 }}
        className="mx-auto mt-4 hidden max-w-2xl px-6 md:block"
      >
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-3.5 shadow-sm">
          <p className="text-sm text-neutral-500">
            {summary || (isValid ? "Ready to continue" : "Complete the fields above")}
          </p>
          
          <button
            disabled={!isValid || isLoading}
            onClick={onContinue}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
              isValid && !isLoading
                ? "bg-neutral-900 text-white hover:bg-neutral-800"
                : "cursor-not-allowed bg-neutral-200 text-neutral-400"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </span>
            ) : (
              continueLabel
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Footer - Glassmorphism style */}
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? 0.3 : 0, duration: shouldAnimate ? 0.3 : 0 }}
        className="fixed inset-x-4 bottom-4 z-50 flex h-14 items-center rounded-full border border-white/10 bg-neutral-900/70 px-2 shadow-xl shadow-black/20 backdrop-blur-xl md:hidden"
      >
        <AnimatePresence mode="wait">
          {mobileValue ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-1 items-center min-w-0"
            >
              {/* Checkmark indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20"
              >
                <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="min-w-0 flex-1 px-2"
              >
                <span className="block truncate text-xs font-medium text-white">
                  {mobileValue}
                </span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 pl-4"
            >
              <span className="text-xs text-white/50">
                {summary || "Complete the form"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          disabled={!isValid || isLoading}
          onClick={onContinue}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            isValid && !isLoading
              ? "bg-white text-neutral-900 hover:bg-neutral-100"
              : "cursor-not-allowed bg-white/10 text-white/30"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-900" />
            </span>
          ) : isValid ? (
            continueLabel
          ) : (
            "Fill form"
          )}
        </button>
      </motion.div>
    </>
  )
}

