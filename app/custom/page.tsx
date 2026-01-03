"use client"

import * as React from "react"
import { Suspense } from "react"
import { motion } from "motion/react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, PhoneIcon, MailIcon, MessageSquareIcon } from "lucide-react"
import { exitReasons } from "@/data/car-questions-flow"

const reasonMessages: Record<string, { title: string; description: string }> = {
  vehicle_age: {
    title: "Classic Vehicle Transport",
    description: "Vehicles manufactured before 1985 require special handling and care. Our team will work with you to ensure your classic car is transported safely with the appropriate equipment.",
  },
  drive_issues: {
    title: "Non-Driveable Vehicle Transport",
    description: "Vehicles with mechanical issues require special loading equipment. We'll arrange for a forklift or tilt-tray to safely load your vehicle.",
  },
  salvage_vehicle: {
    title: "Salvage Vehicle Transport",
    description: "Salvage auction vehicles often require special handling. Our team will assess your vehicle's condition and arrange the appropriate transport.",
  },
  custom_dimensions: {
    title: "Oversized Vehicle Transport",
    description: "Your vehicle has non-standard dimensions that require special equipment or routing. We'll prepare a custom quote based on your exact specifications.",
  },
  no_rates: {
    title: "Custom Route Quote",
    description: "We don't have standard rates for your requested route. Our team will prepare a custom quote for your specific transport needs.",
  },
}

function CustomPageContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get("reason") as keyof typeof exitReasons | null

  const content = reason && reasonMessages[reason] 
    ? reasonMessages[reason] 
    : {
        title: "Custom Quote Required",
        description: "Your request requires a personalized quote from our team. We'll get back to you within 24 hours with pricing options.",
      }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-neutral-200/80 bg-neutral-50/95 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/grid"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-800"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
            <p className="text-sm font-medium text-neutral-400">Custom Quote</p>
          </div>
          <h1 className="mt-2 font-serif text-2xl text-neutral-900 md:text-3xl">
            {content.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {content.description}
          </p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Contact Options */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Get in Touch
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Our team is ready to help you with your transport needs.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Phone */}
              <a
                href="tel:1300123456"
                className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <PhoneIcon className="h-5 w-5 text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Call Us</p>
                  <p className="text-xs text-neutral-500">1300 123 456</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:quotes@wemovex.com.au"
                className="flex items-center gap-3 rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                  <MailIcon className="h-5 w-5 text-neutral-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Email Us</p>
                  <p className="text-xs text-neutral-500">quotes@wemovex.com.au</p>
                </div>
              </a>
            </div>
          </div>

          {/* Request Callback Form */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d63c83]/10">
                <MessageSquareIcon className="h-5 w-5 text-[#d63c83]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Request a Callback
                </h2>
                <p className="text-sm text-neutral-500">
                  We'll call you within 2 hours
                </p>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="mt-1 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="0412 345 678"
                    className="mt-1 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Tell us about your transport needs
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your vehicle and any special requirements..."
                  className="mt-1 w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Request Callback
              </button>
            </form>
          </div>

          {/* Back to Start */}
          <div className="text-center">
            <Link
              href="/grid"
              className="text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
            >
              Start a new quote
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function CustomPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
      </div>
    }>
      <CustomPageContent />
    </Suspense>
  )
}

