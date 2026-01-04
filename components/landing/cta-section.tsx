import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative z-10 bg-background">
      {/* Top border */}
      <div className="h-px bg-border" />
      
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Contact Us Button */}
          <Link
            href="/contact"
            className="group flex items-center justify-between bg-muted px-8 py-8 rounded-xl transition-all duration-300 hover:scale-[0.98] hover:bg-accent active:scale-[0.96] md:px-10 md:py-12"
          >
            <span className="text-2xl font-normal text-foreground md:text-3xl">
              Contact Us
            </span>
            <ArrowRight 
              className="size-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 md:size-7" 
              strokeWidth={1.5}
            />
          </Link>

          {/* Get Quote Button */}
          <Link
            href="/grid"
            className="group flex items-center justify-between bg-primary px-8 py-8 rounded-xl transition-all duration-300 hover:scale-[0.98] hover:bg-primary/90 active:scale-[0.96] md:px-10 md:py-12"
          >
            <span className="text-2xl font-medium text-primary-foreground md:text-3xl">
              Get Quote
            </span>
            <ArrowRight 
              className="size-6 text-primary-foreground transition-transform duration-300 group-hover:translate-x-1 md:size-7" 
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-border" />
    </section>
  )
}

