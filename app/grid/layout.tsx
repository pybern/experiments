import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get a Quote - Select Your Vehicle Type",
  description: "Select your vehicle type to get an instant transport quote. Cars, SUVs, motorcycles, caravans, trucks, heavy machinery and more. Free quotes in under 2 minutes.",
  openGraph: {
    title: "Get a Quote | WeMoveX",
    description: "Select your vehicle type to get an instant transport quote. Free quotes in under 2 minutes.",
  },
}

export default function GridLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

