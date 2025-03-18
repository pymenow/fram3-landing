"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SparkleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  href?: string
  target?: string
}

export const SparkleButton: React.FC<SparkleButtonProps> = ({
  className,
  children,
  href,
  target = "_blank",
  ...props
}) => {
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

    // Add enhanced button text properties
    if (buttonRef.current) {
      buttonRef.current.classList.add("group")

      // Set properties for text glow effect
      const button = buttonRef.current.querySelector(".sparkle-button__button")
      if (button) {
        button.style.setProperty("--text-glow-opacity", "0")
        button.style.setProperty("--text-glow-blur", "4px")
        button.style.setProperty("--text-shadow-intensity", "0.2")
      }
    }

    // Add enhanced hover effects
    const button = buttonRef.current?.querySelector(".sparkle-button__button")
    if (button) {
      button.addEventListener("mouseenter", () => {
        button.style.setProperty("--text-glow-opacity", "1")
        button.style.setProperty("--text-shadow-intensity", "0.4")
      })

      button.addEventListener("mouseleave", () => {
        button.style.setProperty("--text-glow-opacity", "0")
        button.style.setProperty("--text-shadow-intensity", "0.2")
      })

      // Add subtle pulse animation on click
      button.addEventListener("click", () => {
        button.style.animation = "none"
        button.offsetHeight // Trigger reflow
        button.style.animation = "buttonPulse 0.5s ease-out"
      })
    }

    // Clean up event listeners
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", () => {})
        button.removeEventListener("mouseleave", () => {})
        button.removeEventListener("click", () => {})
      }
    }
  }, [])

  return (
    <div className="sparkle-button" ref={buttonRef}>
      {href ? (
        <Link href={href} target={target} rel="noopener noreferrer">
          <button className={cn("sparkle-button__button relative overflow-hidden", className)} {...props}>
            {/* Rainbow border animation on hover - matches landing section */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fram3-yellow to-[#FFC107] opacity-100 transition-opacity duration-300"></span>

            {/* Main content */}
            <span className="text-button relative inline-flex items-center justify-center z-20">
              <span className="relative z-10 font-medium tracking-wide text-black">{children}</span>
            </span>

            {/* Hover glow effect */}
            <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </button>
        </Link>
      ) : (
        <button className={cn("sparkle-button__button relative overflow-hidden", className)} {...props}>
          {/* Rainbow border animation on hover - matches landing section */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fram3-yellow to-[#FFC107] opacity-100 transition-opacity duration-300"></span>

          {/* Main content */}
          <span className="text-button relative inline-flex items-center justify-center z-20">
            <span className="relative z-10 font-medium tracking-wide text-black">{children}</span>
          </span>

          {/* Hover glow effect */}
          <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
        </button>
      )}

      {/* Particle effects */}
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
      <style jsx>{`
        .sparkle-button__button {
          background-color: #ffd700;
          color: #000;
          box-shadow: 0 0 20px 0 rgba(255, 215, 0, 0.4);
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
          z-index: 1;
        }
        
        .sparkle-button__button:hover {
          box-shadow: 0 0 30px 0 rgba(255, 215, 0, 0.6);
          transform: translateY(-2px);
        }
        
        .sparkle-button__button::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0) 70%);
          transform: scale(0);
          transition: transform 0.6s ease-out;
        }
        
        .sparkle-button__button:hover::before {
          transform: scale(1);
        }
        
        .sparkle-button__button::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0) 70%);
          opacity: 0;
          transition: opacity 1.5s ease;
          pointer-events: none;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.25;
          }
          70% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.25;
          }
        }
        
        @keyframes float-out {
          to {
            rotate: 360deg;
          }
        }
      `}</style>
    </div>
  )
}

