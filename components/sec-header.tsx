"use client"

import { motion } from "motion/react"

export function Header() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
      className="text-center text-5xl font-semibold tracking-tight text-neutral-800"
    >
      What will we move today?
    </motion.h1>
  )
}