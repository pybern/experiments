"use client"

import Link from "next/link"
import Image from "next/image"

export function QuoteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-neutral-50/95 backdrop-blur-sm">
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
      </div>
    </header>
  )
}

