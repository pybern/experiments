"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

type NavigationDirection = "forward" | "back" | "initial"

interface NavigationContextType {
  direction: NavigationDirection
  setForwardNavigation: () => void
  isFirstRender: boolean
}

const NavigationContext = React.createContext<NavigationContextType | null>(null)

// Step order for determining direction
const stepOrder = [
  "/car/questions/location",
  "/car/questions/vehicle", 
  "/car/questions/auction",
  "/car/questions/dimensions",
  "/car/questions/contact",
]

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [isFirstRender, setIsFirstRender] = React.useState(true)
  const previousPathRef = React.useRef<string | null>(null)
  const pendingForwardRef = React.useRef<boolean>(false)
  
  // Compute direction SYNCHRONOUSLY during render (not in effect)
  // This ensures direction is correct on first render
  const direction = React.useMemo((): NavigationDirection => {
    // If we explicitly marked navigation as forward
    if (pendingForwardRef.current) {
      return "forward"
    }
    
    // First visit - no previous path
    if (!previousPathRef.current) {
      return "initial"
    }
    
    // Same page - no navigation
    if (previousPathRef.current === pathname) {
      return "initial"
    }
    
    // Compute direction based on step order
    const prevIndex = stepOrder.indexOf(previousPathRef.current)
    const currentIndex = stepOrder.indexOf(pathname)
    
    if (prevIndex !== -1 && currentIndex !== -1) {
      return currentIndex > prevIndex ? "forward" : "back"
    }
    
    return "initial"
  }, [pathname])
  
  // Update the previous path ref AFTER render via layout effect
  // useLayoutEffect runs synchronously after DOM mutations but before paint
  React.useLayoutEffect(() => {
    // Clear the pending forward flag after we've used it
    pendingForwardRef.current = false
    // Store current path for next navigation comparison
    previousPathRef.current = pathname
  }, [pathname])

  // Handle first render flag
  React.useEffect(() => {
    if (isFirstRender) {
      const timer = setTimeout(() => setIsFirstRender(false), 100)
      return () => clearTimeout(timer)
    }
  }, [isFirstRender])

  // Prefetch adjacent routes
  React.useEffect(() => {
    const currentIndex = stepOrder.indexOf(pathname)
    
    // Prefetch next step
    if (currentIndex < stepOrder.length - 1) {
      const nextPath = `${stepOrder[currentIndex + 1]}?${searchParams.toString()}`
      router.prefetch(nextPath)
    }
    
    // Prefetch previous step  
    if (currentIndex > 0) {
      const prevPath = `${stepOrder[currentIndex - 1]}?${searchParams.toString()}`
      router.prefetch(prevPath)
    }
  }, [pathname, searchParams, router])

  // Called before navigation to mark as forward
  const setForwardNavigation = React.useCallback(() => {
    pendingForwardRef.current = true
  }, [])

  const value = React.useMemo(() => ({
    direction,
    setForwardNavigation,
    isFirstRender,
  }), [direction, setForwardNavigation, isFirstRender])

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = React.useContext(NavigationContext)
  // Return default values if context is not available (during SSR or edge cases)
  if (!context) {
    return {
      direction: "initial" as NavigationDirection,
      setForwardNavigation: () => {},
      isFirstRender: true,
    }
  }
  return context
}


