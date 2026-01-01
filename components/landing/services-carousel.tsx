"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { vehicleTypes } from "@/data/vehicle-types"

const CYCLE_DURATION = 5000

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isAutoCycling, setIsAutoCycling] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Auto-cycle effect
  React.useEffect(() => {
    if (!isAutoCycling) return

    const startTime = Date.now()
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / CYCLE_DURATION) * 100, 100)
      setProgress(newProgress)
      
      if (elapsed >= CYCLE_DURATION) {
        setActiveIndex((prev) => (prev + 1) % vehicleTypes.length)
        setProgress(0)
      }
    }, 50)

    return () => clearInterval(progressInterval)
  }, [isAutoCycling, activeIndex])

  // Scroll carousel when active index changes
  // All cards should align to the same position as the first card (aligned with header content)
  React.useEffect(() => {
    const container = containerRef.current
    const targetCard = cardRefs.current[activeIndex]
    const firstCard = cardRefs.current[0]
    
    if (container && targetCard && firstCard) {
      // Scroll so that targetCard appears at the same position as firstCard at scroll=0
      const scrollLeft = targetCard.offsetLeft - firstCard.offsetLeft
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeIndex])

  const handleBadgeClick = (index: number) => {
    setActiveIndex(index)
    setProgress(0)
    setIsAutoCycling(false)
  }

  return (
    <section id="services" className="relative z-10 bg-gradient-to-b from-rose-50 to-white py-20">
      {/* Header - constrained width */}
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-end justify-between px-6"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-rose-400">12 Categories</p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-800 md:text-4xl">
              We move everything
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button 
              onClick={() => {
                setActiveIndex((prev) => (prev - 1 + vehicleTypes.length) % vehicleTypes.length)
                setProgress(0)
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-rose-300 hover:text-neutral-800"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => {
                setActiveIndex((prev) => (prev + 1) % vehicleTypes.length)
                setProgress(0)
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-white text-neutral-500 shadow-sm transition-colors hover:border-rose-300 hover:text-neutral-800"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Category Badges with Progress Loaders - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 hidden flex-wrap gap-2 px-6 md:flex"
        >
          {vehicleTypes.map((item, index) => (
            <button
              key={item.title}
              onClick={() => handleBadgeClick(index)}
              className={`relative overflow-hidden rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-all ${
                activeIndex === index
                  ? "border-rose-400 text-rose-700"
                  : "border-rose-200 bg-white text-neutral-600 hover:border-rose-300 hover:bg-rose-50 hover:text-neutral-800"
              }`}
            >
              {/* Background loader fill */}
              {activeIndex === index && (
                <div 
                  className="absolute inset-0 bg-rose-100 transition-none"
                  style={{ 
                    clipPath: isAutoCycling 
                      ? `inset(0 ${100 - progress}% 0 0)` 
                      : 'inset(0 0 0 0)'
                  }}
                />
              )}
              <span className="relative z-10">{item.title}</span>
            </button>
          ))}
          <Link 
            href="/grid"
            className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-700"
          >
            See All →
          </Link>
        </motion.div>
      </div>

      {/* Carousel - full width, aligned with header */}
      <div 
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 scrollbar-hide md:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Left spacer - centers card on mobile, aligns with content on desktop (accounting for gap-4) */}
        <div className="shrink-0 w-[calc(50vw-170px-8px)] md:w-[max(0.5rem,calc((100vw-80rem)/2+0.5rem))]" />
          {vehicleTypes.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => { cardRefs.current[index] = el }}
              className="shrink-0 snap-center"
            >
              {/* Mobile title above card */}
              <p className="mb-2 text-center text-sm font-medium text-neutral-800 md:hidden">
                {item.title}
              </p>
              <div
                className={`group relative flex w-[340px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl ${
                  activeIndex === index 
                    ? "shadow-rose-200/70 ring-1 ring-rose-200" 
                    : "shadow-rose-100/50 hover:shadow-rose-200/50"
                }`}
                onClick={() => handleBadgeClick(index)}
              >
                {/* Image Section */}
                <div className="relative flex h-44 items-center justify-center bg-white p-6">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    width={280}
                    height={140}
                    quality={85}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-rose-100/30" />
                </div>
              
              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Category number */}
                <span className="text-xs font-medium uppercase tracking-widest text-rose-400">
                  {String(index + 1).padStart(2, '0')} / 12
                </span>
                
                {/* Title with arrow */}
                <h3 className="mt-2 flex items-center gap-2 text-lg font-semibold text-neutral-800">
                  {item.title}
                  <ArrowRightIcon className="h-4 w-4 text-rose-300 transition-all group-hover:translate-x-1 group-hover:text-rose-500" />
                </h3>
                
                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </p>
                
                {/* Details */}
                <div className="mt-auto pt-4">
                  <div className="border-t border-rose-100 pt-4">
                    <p className="text-xs text-neutral-400">{item.details}</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))}
          
          {/* View All Card */}
        <Link
          href="/grid"
          className="group flex w-[340px] shrink-0 snap-center flex-col items-center justify-center rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 p-8 transition-all hover:border-rose-300 hover:bg-rose-100/50"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 transition-colors group-hover:bg-neutral-700">
            <ArrowRightIcon className="h-6 w-6 text-white" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-800">View All</h3>
          <p className="mt-1 text-sm text-neutral-500">Start your quote</p>
        </Link>
        
        {/* Right spacer */}
        <div className="shrink-0 w-[calc(50vw-170px-8px)] md:w-[max(0.5rem,calc((100vw-80rem)/2+0.5rem))]" />
      </div>

      {/* Mobile See All button */}
      <div className="mt-6 flex justify-center px-6 md:hidden">
        <Link
          href="/grid"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-neutral-700"
        >
          See All Categories
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

