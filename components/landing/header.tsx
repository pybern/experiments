import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

export function Header() {
  return (
    <nav className="sticky top-4 z-20 mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full bg-black/20 px-6 backdrop-blur-md">
      {/* Logo */}
      <div className="animate-slide-in-left">
        <Image src="/logo.svg" alt="WeMoveX Logo" width={120} height={32} className="h-8 w-auto" priority />
      </div>

      {/* Center Nav */}
      <div className="hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex animate-slide-in-down">
        <a href="#services" className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white">
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
      </div>

      {/* Right CTA */}
      <div className="animate-slide-in-right">
        <Link
          href="/grid"
          className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
        >
          Get Quote
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  )
}
