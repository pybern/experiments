import { ChevronDownIcon } from "lucide-react"
import { LiquidMetalButton } from "./liquid-metal-button"

export function Hero() {
  return (
    <>
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <div className="max-w-4xl text-center animate-fade-in-up">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md animate-fade-in-scale">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-white/90">Australia&apos;s #1 Vehicle Transport</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Your Journey,
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
              Our Road
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 md:text-xl">
            From cars to heavy machinery, we move anything with wheels across Australia. Fast, safe, and fully insured.
          </p>

          {/* CTA - desktop only */}
          <div className="mt-10 hidden md:block animate-fade-in-up-delay">
            <LiquidMetalButton href="/grid" size="lg">
              Get Quote
            </LiquidMetalButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-delay">
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
            <span className="text-xs font-medium uppercase tracking-wider text-white/50">Scroll</span>
            <ChevronDownIcon className="h-5 w-5 text-white/50" />
          </div>
        </div>
      </div>

      {/* Fixed CTA - mobile only, always visible for easy thumb reach */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <LiquidMetalButton href="/grid" size="md">
          Get Quote
        </LiquidMetalButton>
      </div>
    </>
  )
}
