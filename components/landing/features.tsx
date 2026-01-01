"use client"

import * as React from "react"
import { motion, useInView } from "motion/react"
import { ShieldCheckIcon, TruckIcon, MapPinIcon, ClockIcon, HeadphonesIcon } from "lucide-react"

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.15,
            delay: i * 0.04,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

const features = [
  {
    description: "Every vehicle fully covered with comprehensive insurance up to $150,000",
    index: "01",
    title: "Insured",
    icon: ShieldCheckIcon,
  },
  {
    description: "Australia-wide network of professional carriers and transport specialists",
    index: "02",
    title: "Nationwide",
    icon: MapPinIcon,
  },
  {
    description: "Real-time GPS tracking from pickup to delivery, every step of the way",
    index: "03",
    title: "Tracked",
    icon: TruckIcon,
  },
  {
    description: "Express delivery options available with guaranteed timeframes",
    index: "04",
    title: "Express",
    icon: ClockIcon,
  },
  {
    description: "Dedicated support team available around the clock for any enquiries",
    index: "05",
    title: "Support",
    icon: HeadphonesIcon,
  },
]

export function Features() {
  return (
    <section className="relative z-10 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="max-w-4xl text-3xl font-medium leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            We provide reliable, <span className="text-rose-400">fully-insured</span> transport 
            for vehicles and machinery across Australia, from city streets to remote locations.
          </h2>
        </motion.div>

        {/* Section title */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium tracking-wide text-neutral-400"
        >
          Why Choose Us
        </motion.p>

        {/* Features list */}
        <div className="divide-y divide-neutral-100">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-12 items-center gap-4 py-8 md:py-12"
            >
              {/* Description and index */}
              <div className="col-span-12 md:col-span-4">
                <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
                  {feature.description}
                </p>
                <p className="mt-3 text-xs font-medium text-neutral-300">
                  /{feature.index}
                </p>
              </div>

              {/* Icon */}
              <div className="col-span-3 flex justify-center md:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-50 text-neutral-300 md:h-16 md:w-16">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <div className="col-span-9 md:col-span-6">
                <h3 className="text-4xl font-medium tracking-tight text-neutral-900 md:text-6xl lg:text-7xl">
                  <TypewriterText text={feature.title} />
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

