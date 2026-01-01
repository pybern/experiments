"use client"

import { AnnouncementBanner } from "@/components/landing/announcement-banner"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { ServicesCarousel } from "@/components/landing/services-carousel"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Announcement Banner */}
      <AnnouncementBanner />

      {/* Spacer between banner and header */}
      <div className="relative z-20 h-4" />

      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backdrop.png')" }}
      />
      
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
