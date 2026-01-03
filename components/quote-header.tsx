"use client"

import Link from "next/link"
import Image from "next/image"

export function QuoteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200/60 bg-neutral-50/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="WeMoveX"
            width={100}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="hidden sm:inline">Need help?</span>
          <a 
            href="tel:1300123456" 
            className="font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            1300 123 456
          </a>
        </div>
      </div>
    </header>
  )
}

