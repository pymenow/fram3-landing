"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SiteFooterClientProps {
  children: React.ReactNode
}

export function SiteFooterClient({ children }: SiteFooterClientProps) {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.2 })

  // Update the fadeInUpVariants for better performance
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y distance for subtler animation
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2, // Reduced delay for faster loading
        duration: 0.6, // Slightly faster animation
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  return (
    <footer
      ref={footerRef}
      className={`py-16 md:py-20 px-4 bg-black border-t border-white/10 relative overflow-hidden section-transition ${
        isInView ? "section-active" : "section-inactive"
      }`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 grid-background"></div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-fram3-yellow/30 to-transparent blur-sm"></div>

      <motion.div variants={fadeInUpVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} custom={0}>
        {children}
      </motion.div>
    </footer>
  )
}

