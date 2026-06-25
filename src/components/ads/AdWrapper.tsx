"use client"

import { ReactNode } from "react"

interface AdWrapperProps {
  children: ReactNode
  className?: string
  spacing?: "sm" | "md" | "lg"
}

/**
 * AdWrapper - A reusable wrapper for ad components
 * 
 * Features:
 * - Adds consistent spacing around ads
 * - Centers the ad horizontally
 * - Prevents layout shift with fixed minimum height
 * - Client-side only rendering
 * 
 * @param children - Ad component to wrap
 * @param className - Additional CSS classes
 * @param spacing - Vertical spacing: sm (8px), md (16px), lg (24px)
 */
export default function AdWrapper({ 
  children, 
  className = "", 
  spacing = "md" 
}: AdWrapperProps) {
  const spacingClasses = {
    sm: "my-2",
    md: "my-4",
    lg: "my-6"
  }

  return (
    <div 
      className={`w-full flex justify-center ${spacingClasses[spacing]} ${className}`}
      role="complementary"
      aria-label="Advertisement"
      aria-hidden="true"
    >
      <div className="w-full max-w-4xl flex justify-center items-center">
        <div className="min-h-[90px] w-full flex items-center justify-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
