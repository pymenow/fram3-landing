"use client"

import { SparkleButton } from "@/components/sparkle-button"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ArrowRight } from "lucide-react"

// Import the SphereDots component with dynamic loading to prevent SSR issues with Three.js
const SphereDots = dynamic(() => import("./SphereDots"), { ssr: false })

// Modify the component to add animation
export function CtaSection() {
  // Add intersection observer for better performance
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    fallbackInView: true,
  })
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  // Add a class to the section for transition effects
  return (
    <section
      ref={sectionRef}
      id="cta"
      className={`section-container py-32 px-4 bg-black relative overflow-visible section-transition ${isInView ? "section-active" : "section-inactive"}`}
    >
      {/* Creative background elements - keep as is */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient borders */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007bff]/30 to-transparent animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fram3-yellow/30 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Glowing orbs - positioned to not interfere with content */}
        <div className="absolute -left-20 top-1/3 w-64 h-64 rounded-full bg-[#007bff]/10 blur-[100px] opacity-30 animate-pulse"></div>
        <div
          className="absolute -right-20 bottom-1/3 w-64 h-64 rounded-full bg-fram3-yellow/10 blur-[100px] opacity-30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Diagonal light beams */}
        <div className="absolute -top-20 -left-20 w-[150%] h-40 bg-gradient-to-r from-[#007bff]/5 to-transparent rotate-12 blur-xl"></div>
        <div className="absolute -bottom-20 -right-20 w-[150%] h-40 bg-gradient-to-r from-fram3-yellow/5 to-transparent -rotate-12 blur-xl"></div>

        {/* Simple grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Subtle animated dots */}
        <div
          className="absolute top-10 left-10 w-2 h-2 rounded-full bg-fram3-yellow/50 animate-ping"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-[#007bff]/50 animate-ping"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-white/50 animate-ping"
          style={{ animationDuration: "5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-fram3-yellow/50 animate-ping"
          style={{ animationDuration: "4.5s" }}
        ></div>

        {/* SphereDots background */}
        {isMounted && (
          <div className="absolute inset-0 z-0 pointer-events-none cosmic-sphere-container">
            <SphereDots
              position="center"
              size={20}
              density={3000}
              color="#ffffff"
              tilt={10}
              speed={0.04}
              useTransparency={true}
              expandHorizontally={false}
            />
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center">
          {/* Main CTA content - centered */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="text-center"
          >
            {/* Enhanced badge with subtle animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-badge inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-fram3-yellow/10 to-[#007bff]/10 border border-fram3-yellow/20 mb-6 relative overflow-hidden group"
            >
              <div className="section-badge-dot bg-fram3-yellow animate-pulse relative z-10"></div>
              <span className="text-sm font-medium text-fram3-yellow relative z-10">Start Creating Now</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="section-title subheadline relative"
            >
              <span className="relative inline-block">Video Production</span>
              <br />
              <span className="text-fram3-yellow italic relative inline-block">Reimagined</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="section-description text-gray-300 leading-relaxed"
            >
              Join a global community of creators transforming content creation.
              <br />
              Unlock your creative potential with tools designed for professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center gap-4"
            >
              <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Rainbow border animation on hover */}
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-fram3-yellow via-[#007bff] to-fram3-yellow opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>

                <SparkleButton
                  className="px-8 py-4 text-base font-semibold rounded-full relative z-10"
                  href="https://app.fram3studio.io/dashboard/script-analysis"
                >
                  Get Started
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4 inline-block transition-opacity duration-300" />
                  </motion.span>
                </SparkleButton>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-fram3-yellow"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>No Credit Card Required. No Prompts Required. Only Creativity.</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
      .cosmic-sphere-container {
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        opacity: 0.4;
        top: -50vh;
        bottom: -50vh;
        height: 200vh;
      }
      
      @keyframes gradient-x {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
      }
    `}</style>
    </section>
  )
}

