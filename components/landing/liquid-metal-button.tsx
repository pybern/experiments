import Link from "next/link"

interface LiquidMetalButtonProps {
  href: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
}

export function LiquidMetalButton({
  href,
  children,
  size = "md",
  onClick,
  className = "",
}: LiquidMetalButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`btn-liquid-border inline-block rounded-full font-semibold text-neutral-900 transition-all ${sizeClasses[size]} ${className}`}
    >
      {children}
    </Link>
  )
}

