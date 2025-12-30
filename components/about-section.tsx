"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "10,000+", label: "Vehicles moved" },
  { value: "15", label: "Years moving vehicles" },
  { value: "2 minutes", label: "From quote to book" },
  { value: "0", label: "No login required" },
]

export function AboutSection() {
  return (
    <section className="min-h-screen bg-[#fdf2f0] px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Header with About label and logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="text-lg font-medium text-primary">About</span>
          <div className="relative h-10 w-24">
            <svg
              viewBox="0 0 120 40"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pink parallelogram background */}
              <polygon
                points="10,35 30,5 110,5 90,35"
                fill="#d94876"
              />
              {/* WE text */}
              <text
                x="35"
                y="18"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                WE
              </text>
              {/* MOVEX text */}
              <text
                x="32"
                y="30"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                MOVEX
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
        >
          Interstate car transportation at your fingertips
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-2xl text-lg leading-relaxed text-neutral-600"
        >
          We work with car carriers all around Australia to provide you with the best
          interstate car transportation services. Our platform is designed to make it easy
          to get a quote and book your car transport service in just minutes. We&apos;re proud
          to offer a seamless experience from quote to booking—no login required.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="border-l-2 border-neutral-200 pl-6"
            >
              <div className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-neutral-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Read More link */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group inline-flex items-center gap-2 text-primary hover:underline"
        >
          <span className="font-medium">Read More</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </div>
    </section>
  )
}

