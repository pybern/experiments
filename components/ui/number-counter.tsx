"use client"

import { AnimateNumber } from "motion-plus/react"
import { LayoutGroup, motion, type MotionProps } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface NumberCounterProps {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  className?: string
}

export function NumberCounter({
  min = -Infinity,
  max = Infinity,
  defaultValue = 0,
  onChange,
  className,
}: NumberCounterProps) {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (delta: number) => () => {
    const newValue = Math.min(Math.max(value + delta, min), max)
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <LayoutGroup>
      <motion.div
        layout
        className={cn(
          "inline-flex items-center gap-5 rounded-full bg-neutral-900 px-5 py-2.5 font-mono",
          className
        )}
      >
        <motion.button
          disabled={min != null && value <= min}
          onPointerDown={handleChange(-1)}
          {...buttonProps}
          className="flex items-center justify-center rounded-full bg-pink-500/20 p-2.5 text-pink-400 transition-colors hover:bg-pink-500/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CounterIcon type="minus" />
        </motion.button>

        <AnimateNumber className="min-w-[3ch] text-center text-5xl tabular-nums text-white">
          {value}
        </AnimateNumber>

        <motion.button
          disabled={max != null && value >= max}
          onPointerDown={handleChange(1)}
          {...buttonProps}
          className="flex items-center justify-center rounded-full bg-pink-500/20 p-2.5 text-pink-400 transition-colors hover:bg-pink-500/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CounterIcon type="plus" />
        </motion.button>
      </motion.div>
    </LayoutGroup>
  )
}

const buttonProps: MotionProps = {
  initial: {
    boxShadow: "0px 0px 0px 2px transparent",
  },
  whileHover: {
    scale: 1.1,
  },
  whileTap: {
    scale: 0.9,
  },
  whileFocus: {
    boxShadow: "0px 0px 0px 2px oklch(0.59 0.22 1)",
  },
  layout: true,
}

function CounterIcon({ type }: { type: "plus" | "minus" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      {type === "plus" && <path d="M12 5v14" />}
    </svg>
  )
}

