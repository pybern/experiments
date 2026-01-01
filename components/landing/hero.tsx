"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { ChevronDownIcon, ArrowRightIcon } from "lucide-react"

export function Hero() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-white/90">Australia's #1 Vehicle Transport</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          Your Journey,
          <br />
          <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
            Our Road
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 md:text-xl">
          From cars to heavy machinery, we move anything with wheels across Australia. Fast, safe, and fully insured.
        </p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <Link
            href="/grid"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-900 transition-all hover:bg-white/90 hover:shadow-2xl hover:shadow-white/20"
          >
            Get Free Quote
            <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-white/50">Scroll</span>
          <ChevronDownIcon className="h-5 w-5 text-white/50" />
        </motion.div>
      </motion.div>
    </div>
  )
}

