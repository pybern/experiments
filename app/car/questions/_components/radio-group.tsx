"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckIcon } from "lucide-react"

export interface RadioOption {
  id: string
  title: string
  description?: string
  value: string
  hint?: string
}

interface RadioGroupProps {
  label: string
  options: RadioOption[]
  value: string | null
  onChange: (value: string) => void
  name: string
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.value
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onChange(option.value)}
              initial={false}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-neutral-400 bg-white shadow-md ring-2 ring-neutral-800 ring-offset-2"
                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
              }`}
            >
              {/* Radio indicator */}
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected
                    ? "border-neutral-800 bg-neutral-800"
                    : "border-neutral-300 bg-white group-hover:border-neutral-400"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSelected && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-900">
                    {option.title}
                  </span>
                  {option.hint && (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
                      {option.hint}
                    </span>
                  )}
                </div>
                {option.description && (
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {option.description}
                  </span>
                )}
              </div>

              {/* Hidden radio input for accessibility */}
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

