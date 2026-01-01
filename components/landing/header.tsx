"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export function Header() {
  return (
    <nav className="sticky top-4 z-20 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full bg-black/20 px-6 backdrop-blur-md">
      {/* Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
      </motion.div>

      {/* Center Nav */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex"
      >
        <a href="#" className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
          Services
        </a>
        <a href="#" className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
          Fleet
        </a>
        <a href="#" className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
          Tracking
        </a>
        <a href="#" className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
          About
        </a>
      </motion.div>

      {/* Right CTA */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/grid"
          className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
        >
          Get Quote
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </nav>
  )
}

