"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

export function SideNav() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  // Define section IDs for better maintainability
  const sectionIds = ["landing", "how-it-works", "meet-avia", "benefits", "pricing"]
  const sectionLabels = ["Home", "How It Works", "Meet AVIA", "Benefits", "Pricing"]

  const handleDotClick = (index: number) => {
    // Get the corresponding section
    const targetSection = document.getElementById(sectionIds[index])

    if (targetSection) {
      // Calculate the header height to offset the scroll position
      const headerHeight = 80 // Approximate header height

      // Get the exact position of the section's top
      const sectionRect = targetSection.getBoundingClientRect()
      const absoluteTop = window.pageYOffset + sectionRect.top

      // Scroll to the exact top of the section minus the header height
      window.scrollTo({
        top: absoluteTop - headerHeight,
        behavior: "smooth",
      })
    }
  }

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const position = window.scrollY
    setScrollPosition(position)

    // Get all sections
    const sections = sectionIds.map((id) => {
      const element = document.getElementById(id)
      if (!element) return { id, top: 0, height: 0, bottom: 0 }

      const rect = element.getBoundingClientRect()
      return {
        id,
        top: rect.top + window.scrollY,
        height: rect.height,
        bottom: rect.bottom + window.scrollY,
      }
    })

    // Calculate which section is currently in view
    // We'll consider a section "active" when it occupies most of the viewport
    const viewportHeight = window.innerHeight
    const viewportMiddle = position + viewportHeight / 3 // Adjust to favor the top portion

    // Find the section that contains the middle of the viewport
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      // Add a small buffer to make transitions smoother
      const buffer = section.height * 0.1

      if (viewportMiddle >= section.top - buffer && viewportMiddle < section.bottom + buffer) {
        setActiveIndex(i)
        break
      }
    }
  }, [sectionIds])

  // Use a more efficient event listener setup
  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })
    // Initial call to set the active section on mount
    handleScroll()

    return () => window.removeEventListener("scroll", scrollListener)
  }, [handleScroll])

  useEffect(() => {
    const checkFooterVisibility = () => {
      const footer = document.querySelector("footer")
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        // Consider footer visible when it's 100px from entering the viewport
        const isVisible = footerRect.top < window.innerHeight + 100
        setIsFooterVisible(isVisible)
      }
    }

    // Initial check
    checkFooterVisibility()

    // Add event listener with throttling for better performance
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkFooterVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })

    // Cleanup
    return () => window.removeEventListener("scroll", scrollListener)
  }, [])

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-in-out ${
        isFooterVisible ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 translate-y-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-6 px-4 pl-6 transition-all duration-300 ease-in-out">
        <div className="relative">
          {/* Label that appears on hover */}
          <div
            className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 invisible"} pointer-events-none`}
          >
            <span className="text-white/50">Navigation</span>
          </div>

          <nav className="flex flex-col items-center gap-8 relative">
            {sectionLabels.map((label, index) => (
              <button
                key={index}
                className="group relative flex items-center transition-all duration-300 w-full"
                onClick={() => handleDotClick(index)}
                aria-label={`Navigate to ${label} section`}
                aria-current={activeIndex === index ? "true" : "false"}
              >
                {/* The dot */}
                <span
                  className={cn(
                    "h-[6px] w-[6px] rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-fram3-yellow scale-[1.3] shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                      : "bg-white/50",
                    isHovered && activeIndex === index ? "scale-[1.5]" : "",
                    isHovered && activeIndex !== index ? "bg-white scale-110" : "",
                  )}
                />

                {/* Section label that appears ONLY on hover - now clickable */}
                <div
                  className={`absolute left-6 whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                    activeIndex === index ? "text-white/90" : "text-white/50"
                  } ${isHovered ? "opacity-100 translate-x-0 cursor-pointer" : "opacity-0 translate-x-2 invisible"}`}
                >
                  {label}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

