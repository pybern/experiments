import type { Metadata } from "next"
import { QuoteHeader } from "@/components/quote-header"

export const metadata: Metadata = {
  title: "Car Transport Quote - WeMoveX",
  description: "Get an instant car transport quote. Answer a few questions about your vehicle and we'll provide tailored pricing options.",
  openGraph: {
    title: "Car Transport Quote | WeMoveX",
    description: "Get an instant car transport quote in under 2 minutes.",
  },
}

export default function CarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 pb-6 md:pb-8">
      <QuoteHeader />
      {children}
    </div>
  )
}

