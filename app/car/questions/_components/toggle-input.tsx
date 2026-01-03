"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

interface ToggleInputProps {
  label: string
  description?: string
  isToggled: boolean
  onToggle: (value: boolean) => void
  inputValue: string
  onInputChange: (value: string) => void
  inputPlaceholder?: string
  inputUnit?: string
}

export function ToggleInput({
  label,
  description,
  isToggled,
  onToggle,
  inputValue,
  onInputChange,
  inputPlaceholder = "Enter value",
  inputUnit,
}: ToggleInputProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 transition-all duration-200 hover:border-neutral-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-neutral-900">
            {label}
          </label>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              {description}
            </p>
          )}
        </div>

        {/* Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={isToggled}
          onClick={() => onToggle(!isToggled)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
            isToggled ? "bg-neutral-800" : "bg-neutral-200"
          }`}
        >
          <motion.span
            initial={false}
            animate={{ x: isToggled ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
          />
        </button>
      </div>

      {/* Conditional Input */}
      <AnimatePresence initial={false}>
        {isToggled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder={inputPlaceholder}
                  className="h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
                {inputUnit && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    {inputUnit}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

