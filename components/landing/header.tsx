"use client"

import * as React from "react"
import Image from "next/image"
import { LiquidMetalButton } from "./liquid-metal-button"

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#" },
  { label: "Tracking", href: "#" },
  { label: "About", href: "#" },
]

export function Header() {
  return (
    <nav className="sticky top-0 z-20">
      {/* Mobile Header - logo left, frosted glass effect, full width */}
      <div className="flex h-14 items-center bg-black/20 px-4 backdrop-blur-md md:hidden">
        <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" priority />
      </div>

      {/* Desktop Header - full nav */}
      <div className="mx-auto mt-4 hidden h-16 max-w-7xl items-center justify-between rounded-full bg-black/20 px-6 backdrop-blur-md md:flex">
        {/* Logo */}
        <div className="animate-slide-in-left">
          <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" priority />
        </div>

        {/* Center Nav */}
        <div className="flex items-center gap-1 rounded-full px-2 py-1.5 animate-slide-in-down">
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

        {/* Get Quote */}
        <div className="animate-slide-in-right">
          <LiquidMetalButton href="/grid" size="sm">
            Get Quote
          </LiquidMetalButton>
        </div>
      </div>
    </nav>
  )
}
