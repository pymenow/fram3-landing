"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Users, Zap, NetworkIcon as Hub } from "lucide-react"
import { motion, useInView } from "framer-motion"
import React from "react"
import dynamic from "next/dynamic"

// Import the SphereDots component with dynamic loading to prevent SSR issues with Three.js
const SphereDots = dynamic(() => import("./SphereDots"), { ssr: false })

export default function BenefitsSection() {
  const gsapRef = useRef(null)

  const benefits = [
    {
      title: "Words to Worlds",
      description: "Our proprietary script engine turns your words into optimized video content.",
      subtext: "Creative Assistant",
      icon: Bot,
      color: "#007bff",
    },
    {
      title: "Cultivate Global Appeal",
      description:
        "Tap into decades of cultural analytics for messages that resonate in any region—no misfires, just universal impact.",
      subtext: "Global Reach",
      icon: Users,
      color: "#00c2ff",
    },
    {
      title: "Accelerate Production",
      description:
        "Go from brainstorm to final cut in record time, guided by AVIA’s intelligent automations and real-time suggestions.",
      subtext: "Maximum Efficiency",
      icon: Zap,
      color: "#00ff8a",
    },
    {
      title: "Streamline Everything",
      description: "Develop, refine, shoot, edit, export, and publish—within one unified interface",
      subtext: "Complete Ecosystem",
      icon: Hub,
      color: "#ff00ff",
    },
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Access GSAP from the window object after it's loaded
    if (typeof window !== "undefined") {
      gsapRef.current = window.gsap

      // Throttled mouse move handler for better performance
      let ticking = false
      const updateCardEffect = ({ x, y }) => {
        if (gsapRef.current && !ticking) {
          requestAnimationFrame(() => {
            gsapRef.current.set(document.documentElement, {
              "--x": gsapRef.current.utils.mapRange(0, window.innerWidth, -1, 1, x),
              "--y": gsapRef.current.utils.mapRange(0, window.innerHeight, -1, 1, y),
            })
            ticking = false
          })
          ticking = true
        }
      }

      const handleMouseMove = (e) => {
        updateCardEffect({ x: e.clientX, y: e.clientY })
      }

      // Optimized device orientation handler
      let orientationTicking = false
      const handleOrientation = (e) => {
        if (!gsapRef.current || orientationTicking) return

        orientationTicking = true
        requestAnimationFrame(() => {
          const isLandscape = window.matchMedia("(orientation: landscape)").matches
          const beta = e.beta || 0
          const gamma = e.gamma || 0

          gsapRef.current.set(document.documentElement, {
            "--x": gsapRef.current.utils.clamp(
              -1,
              1,
              isLandscape
                ? gsapRef.current.utils.mapRange(-45, 45, -1, 1, beta)
                : gsapRef.current.utils.mapRange(-45, 45, -1, 1, gamma),
            ),
            "--y": gsapRef.current.utils.clamp(
              -1,
              1,
              isLandscape
                ? gsapRef.current.utils.mapRange(20, 70, 1, -1, Math.abs(gamma))
                : gsapRef.current.utils.mapRange(20, 70, 1, -1, beta),
            ),
          })
          orientationTicking = false
        })
      }

      window.addEventListener("mousemove", handleMouseMove, { passive: true })

      const startDeviceOrientation = () => {
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          DeviceOrientationEvent.requestPermission()
            .then((result) => {
              if (result === "granted") {
                window.addEventListener("deviceorientation", handleOrientation, { passive: true })
              }
            })
            .catch(console.error)
        } else if (typeof DeviceOrientationEvent !== "undefined") {
          window.addEventListener("deviceorientation", handleOrientation, { passive: true })
        }
      }

      document.body.addEventListener("click", startDeviceOrientation, { once: true, passive: true })

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("deviceorientation", handleOrientation)
        document.body.removeEventListener("click", startDeviceOrientation)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className={`section-container py-28 px-4 relative overflow-visible bg-black section-transition ${isInView ? "section-active" : "section-inactive"}`}
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center section-header"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <div className="section-badge">
            <div className="section-badge-dot bg-fram3-yellow animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">Why Fram3?</span>
          </div>

          <h2 id="benefits-heading" className="section-title subheadline">
            Built for <span className="text-fram3-yellow italic">Creators</span>
          </h2>

          <p className="section-description text-gray-300">
            Fram3 combines cutting-edge AI with decades of cinematic expertise to deliver a video creation platform that
            understands both creative vision and business objectives.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={fadeInUpVariants}
              custom={0.3 + index * 0.15}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center text-center transition-all duration-500">
                {/* Icon with glow effect */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                    hoveredIndex === index ? "scale-110" : ""
                  }`}
                  style={{
                    background:
                      hoveredIndex === index
                        ? `radial-gradient(circle at center, ${benefit.color}20, transparent 70%)`
                        : "transparent",
                    boxShadow: hoveredIndex === index ? `0 0 25px ${benefit.color}30` : "none",
                    transform: hoveredIndex === index ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  {React.createElement(benefit.icon, {
                    className: `w-8 h-8 transition-all duration-500`,
                    style: {
                      color: hoveredIndex === index ? benefit.color : "rgba(255,255,255,0.7)",
                    },
                  })}
                </div>

                {/* Title with hover effect */}
                <h3
                  className="text-xl font-bold mb-2 transition-all duration-500 subheadline"
                  style={{
                    color: hoveredIndex === index ? benefit.color : "white",
                    transform: hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
                  }}
                >
                  {benefit.title}
                </h3>

                {/* Subtitle with subtle animation */}
                <p
                  className="text-sm mb-3 transition-all duration-500"
                  style={{
                    color: hoveredIndex === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                    transform: hoveredIndex === index ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {benefit.subtext}
                </p>

                {/* Description with fade-in effect */}
                <p
                  className="text-sm leading-relaxed max-w-xs mx-auto transition-all duration-500"
                  style={{
                    color: hoveredIndex === index ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                >
                  {benefit.description}
                </p>

                {/* Subtle underline that appears on hover */}
                <div
                  className="h-px w-0 bg-gradient-to-r transition-all duration-500 mt-4"
                  style={{
                    width: hoveredIndex === index ? "40%" : "0%",
                    background:
                      hoveredIndex === index
                        ? `linear-gradient(to right, transparent, ${benefit.color}, transparent)`
                        : "transparent",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        ></div>

        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full bg-fram3-yellow/5 blur-[100px] opacity-30"></div>
      </div>
    </section>
  )
}

