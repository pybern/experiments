"use client"

import { motion } from "motion/react"

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="z-50 flex w-full items-center justify-between px-8 py-4"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/25">
          <span className="text-lg font-bold text-white">W</span>
        </div>
        <span className="text-xl font-semibold text-neutral-800">WeMoveX</span>
      </div>

      {/* Nav Links */}
      <div className="hidden items-center gap-8 md:flex">
        <a href="#" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
          Services
        </a>
        <a href="#" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
          How it works
        </a>
        <a href="#" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
          Pricing
        </a>
        <a href="#" className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900">
          Contact
        </a>
      </div>

      {/* CTA Button */}
      <div className="flex items-center gap-4">
        <a href="#" className="hidden text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 sm:block">
          Sign in
        </a>
        <button className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg">
          Get a quote
        </button>
      </div>
    </motion.nav>
  )
}

