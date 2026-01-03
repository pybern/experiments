"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { LiquidMetalButton } from "./liquid-metal-button"

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#" },
  { label: "Tracking", href: "#" },
  { label: "About", href: "#" },
]

const serviceItems = [
  { label: "Cars & SUVs", href: "/grid?vehicle=Cars%2C+SUV%27s+%26+4WD%27s" },
  { label: "Motorcycles", href: "/grid?vehicle=Motorbikes+%26+Quads" },
  { label: "Caravans", href: "/grid?vehicle=Caravan+%26+Campers" },
  { label: "Trucks & Buses", href: "/grid?vehicle=Trucks+%26+Buses" },
  { label: "Heavy Machinery", href: "/grid?vehicle=Heavy+Machinery" },
  { label: "Boats & Jet Skis", href: "/grid?vehicle=Boats+%26+Jet+Skis" },
]

export function MobileFooter() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = React.useState(false)

  // Show floating CTA only after scrolling past hero
  React.useEffect(() => {
    const handleScroll = () => {
      // Show CTA when scrolled past 80% of viewport height
      setShowFloatingCTA(window.scrollY > window.innerHeight * 0.8)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Floating Menu Button - bottom left */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-6 z-40 flex h-12 w-12 items-center justify-center bg-white text-neutral-900 shadow-lg transition-all hover:bg-neutral-100 md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Floating CTA Button - bottom right (only after scrolling past hero) */}
      <div 
        className={`fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-40 transition-all duration-300 md:hidden ${
          showFloatingCTA 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <LiquidMetalButton href="/grid" size="md">
          Get Quote
        </LiquidMetalButton>
      </div>

      {/* Full-screen mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900 md:hidden">
          {/* Menu header - fixed at top */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6">
            <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu content - scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            <div className="mb-8 border-t border-neutral-700" />
            
            <p className="mb-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
              Navigation
            </p>

            <nav className="space-y-2">
              {/* Services with sub-items */}
              <a
                href="#services"
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-medium text-white transition-colors hover:text-neutral-300"
              >
                Services
              </a>
              <div className="space-y-1 pb-4">
                {serviceItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-1 text-lg text-neutral-400 transition-colors hover:text-white"
                  >
                    <span className="text-neutral-600">↳</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Other nav items */}
              {navItems.slice(1).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-2xl font-medium text-white transition-colors hover:text-neutral-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Bottom section */}
            <div className="mt-12 border-t border-neutral-700 pt-8">
              <p className="mb-6 text-xs font-medium uppercase tracking-widest text-neutral-500">
                Get Started
              </p>
              <LiquidMetalButton href="/grid" size="lg" onClick={() => setIsMenuOpen(false)}>
                Get Quote
              </LiquidMetalButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

