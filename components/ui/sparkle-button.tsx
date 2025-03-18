"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SparkleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

export const SparkleButton: React.FC<SparkleButtonProps> = ({ className, children, ...props }) => {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const particles = buttonRef.current.querySelectorAll(".particle")

    // Set properties for each particle
    particles.forEach((p) => {
      const elem = p as HTMLElement
      elem.style.setProperty("--x", `${Math.floor(Math.random() * (80 - 20 + 1) + 20)}`)
      elem.style.setProperty("--y", `${Math.floor(Math.random() * (80 - 20 + 1) + 20)}`)
      elem.style.setProperty("--duration", `${Math.floor(Math.random() * (20 - 6 + 1) + 6)}`)
      elem.style.setProperty("--delay", `${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`)
      // Increase opacity for better visibility - 90% opacity on hover
      elem.style.setProperty("--alpha", `${Math.floor(Math.random() * (90 - 70 + 1) + 70) / 100}`)
      elem.style.setProperty(
        "--origin-x",
        `${Math.random() > 0.5 ? Math.floor(Math.random() * (800 - 300 + 1) + 300) * -1 : Math.floor(Math.random() * (800 - 300 + 1) + 300)}%`,
      )
      elem.style.setProperty(
        "--origin-y",
        `${Math.random() > 0.5 ? Math.floor(Math.random() * (800 - 300 + 1) + 300) * -1 : Math.floor(Math.random() * (800 - 300 + 1) + 300)}%`,
      )
      // Increase size for better visibility
      elem.style.setProperty("--size", `${Math.floor(Math.random() * (120 - 60 + 1) + 60) / 100}`)
    })
  }, [])

  return (
    <div className="sparkle-button" ref={buttonRef}>
      <button className={cn("sparkle-button__button", className)} {...props}>
        <span className="spark"></span>
        <span className="backdrop"></span>
        <span className="text-button">{children}</span>
      </button>
      <span aria-hidden="true" className="particle-pen">
        {[...Array(12)].map((_, i) => (
          <svg key={i} className="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z"
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </span>
    </div>
  )
}

