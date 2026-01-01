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
  { label: "Cars & SUVs", href: "/grid" },
  { label: "Motorcycles", href: "/grid" },
  { label: "Caravans", href: "/grid" },
  { label: "Trucks & Buses", href: "/grid" },
  { label: "Heavy Machinery", href: "/grid" },
  { label: "Boats & Jet Skis", href: "/grid" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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
      <nav className="sticky top-4 z-20 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full bg-black/20 px-6 backdrop-blur-md">
        {/* Logo */}
        <div className="animate-slide-in-left">
          <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" priority />
        </div>

        {/* Center Nav - desktop only */}
        <div className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex animate-slide-in-down">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Get Quote - centered on mobile, right on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 animate-slide-in-right md:animate-none">
          <LiquidMetalButton href="/grid" size="sm">
            Get Quote
          </LiquidMetalButton>
        </div>

        {/* Hamburger - mobile only */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Full-screen mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900 md:hidden">
          {/* Menu header */}
          <div className="flex h-16 items-center justify-between px-6">
            <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu content */}
          <div className="px-6 pt-8">
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
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-medium text-white transition-colors hover:text-neutral-300"
              >
                Fleet
              </a>
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-medium text-white transition-colors hover:text-neutral-300"
              >
                Tracking
              </a>
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-medium text-white transition-colors hover:text-neutral-300"
              >
                About
              </a>
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
