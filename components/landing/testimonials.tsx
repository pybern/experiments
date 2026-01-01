"use client"

import * as React from "react"
import { motion } from "motion/react"

const testimonials = [
  {
    company: "TOLL GROUP",
    text: "WeMoveX has transformed how we handle overflow vehicle logistics. Their nationwide network and real-time tracking gives us complete visibility across every delivery.",
  },
  {
    company: "PICKLES AUCTIONS",
    text: "We chose WeMoveX because their service is absolutely best in class. We partnered with them because their values align with ours. They make us a better competitor.",
  },
  {
    company: "MANHEIM",
    text: "WeMoveX is going to be front and center for everything that we do...[their platform] is a strategic differentiator for us.",
  },
  {
    company: "GRAYS ONLINE",
    text: "We like to say that we make what matters work. WeMoveX is helping us focus on what matters.",
  },
  {
    company: "TURNERS AUTO",
    text: "We have a better-balanced schedule. We have a better complement of competencies every single day. A unique feature of this system also allows us to balance it out in the future.",
  },
]

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="relative mx-3 flex h-[280px] w-[280px] flex-shrink-0 flex-col bg-neutral-100 p-6 pt-10 md:w-[320px]">
      {/* Dog-ear fold effect */}
      <div className="absolute left-0 top-0 h-8 w-8 bg-white" />
      <div 
        className="absolute left-0 top-0 h-8 w-8 bg-neutral-200"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}
      />
      
      {/* Company name */}
      <p className="mb-4 text-sm font-semibold tracking-wide text-neutral-900">
        {testimonial.company}
      </p>
      
      {/* Quote */}
      <p className="text-sm leading-relaxed text-neutral-600">
        "{testimonial.text}"
      </p>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="relative z-10 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl text-3xl font-medium leading-tight text-neutral-900 md:text-4xl lg:text-5xl mb-20"
        >
          Testimonials
        </motion.p>

        {/* Marquee */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: [0, -1720],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* Original cards */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`original-${index}`} testimonial={testimonial} />
            ))}
            {/* Duplicated cards for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`duplicate-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
