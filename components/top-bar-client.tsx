"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TopBarClientProps {
  children: React.ReactNode
  orbitronVariable: string
}

export function TopBarClient({ children, orbitronVariable }: TopBarClientProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        scrolled
          ? "py-3 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "py-5 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm",
        orbitronVariable,
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6">{children}</div>
    </header>
  )
}

