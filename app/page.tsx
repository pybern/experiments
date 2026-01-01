import Image from "next/image"
import dynamic from "next/dynamic"
import { AnnouncementBanner } from "@/components/landing/announcement-banner"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Footer } from "@/components/landing/footer"
import { StructuredData } from "@/components/landing/structured-data"

// Lazy load below-the-fold components for better initial page load
const ServicesCarousel = dynamic(
  () => import("@/components/landing/services-carousel").then((mod) => mod.ServicesCarousel),
  { ssr: true }
)

const Features = dynamic(
  () => import("@/components/landing/features").then((mod) => mod.Features),
  { ssr: true }
)

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData />
      
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Spacer between banner and header */}
      <div className="relative z-20 h-4" />

      {/* Background Image - Optimized with Next.js Image */}
      <div className="fixed inset-0">
        <Image
          src="/backdrop.png"
          alt="Transport background"
          fill
          preload
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      
      {/* Gradient Overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <Header />
      <Hero />
      <ServicesCarousel />
      <Features />
      <Footer />
    </div>
  )
}
