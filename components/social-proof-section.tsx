"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useInView } from "framer-motion"

const logos = [
  {
    name: "Skydance",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Skydance_Media_2021-LYgEwxBTehX1ruNqxBmAJdr7YzRVjo.svg",
    invert: true,
    className: "brightness-0 invert",
  },
  {
    name: "Disney",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Disney_Television_Animation_logo-Ne2bugtQ3uEhuB6quko1Ksircdryww.webp",
    invert: true,
    className: "brightness-0 invert",
  },
  {
    name: "Ogilvy",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ogilvy%20white-w60G4SFIxLxR2K9qq5wkovozmMR9qF.png",
    invert: false,
    className: "brightness-0 invert opacity-80",
  },
]

const testimonials = [
  {
    quote: "Avia nailed a TV ad that worked across 10 countries. It's unreal.",
    author: "Lena Knightley",
    title: "Head of Production, Skydance Entertainment",
  },
  {
    quote: "Our previz costs dropped, and the turnaround times reduced by 90%",
    author: "Stan Hoult",
    title: "Previz Director, Disney Animation Studio",
  },
  {
    quote: "AVIA gave my indie script a Christopher Nolan treatment.",
    author: "Mia T.",
    title: "Indie Filmmaker",
  },
]

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length]) // Add proper dependency

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section
      ref={sectionRef}
      id="social-proof"
      className="section-container py-16 px-6 bg-black relative overflow-hidden"
      style={{ minHeight: "auto" }}
    >
      {/* Simplified background elements - keep as is */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] rounded-full bg-fram3-yellow/5 blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Compact header */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="text-center section-header"
        >
          <div className="section-badge">
            <div className="section-badge-dot bg-fram3-yellow animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">Trusted by</span>
          </div>

          <h2 className="section-title subheadline"></h2>
        </motion.div>

        {/* Compact logos section - keep as is */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
          className="mb-12"
        >
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-[60px] z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

            <div className="logos-scroll-container py-4">
              <div className="logos-scroll-content">
                {[...logos, ...logos, ...logos].map((logo, i) => (
                  <div key={`logo-${i}`} className="mx-12 opacity-70 flex-shrink-0 logo-container">
                    <div className="relative">
                      <Image
                        src={logo.url || "/placeholder.svg"}
                        alt={`${logo.name} logo - Fram3 client`}
                        width={100}
                        height={40}
                        className={`object-contain h-10 logo-image ${logo.className.replace("opacity-80", "")}`}
                        quality={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compact testimonials section */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.6}
          className="w-full max-w-3xl mx-auto"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-fram3-yellow/50 to-transparent mx-auto"></div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }} // Changed from x to y for more subtle transition
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }} // Faster transition
                className="relative"
              >
                <div className="relative overflow-hidden py-3">
                  <div className="relative z-10">
                    <blockquote className="mb-4">
                      <p className="text-lg md:text-xl text-white font-light leading-relaxed text-center section-description">
                        "{testimonials[currentTestimonial].quote}"
                      </p>
                    </blockquote>

                    <div className="flex flex-col items-center space-y-1">
                      <p className="font-medium text-fram3-yellow text-base">
                        {testimonials[currentTestimonial].author}
                      </p>
                      <p className="text-white text-xs">{testimonials[currentTestimonial].title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6">
              <div className="flex space-x-3 items-center bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-fram3-yellow scale-110" : "bg-white/20 hover:bg-white/40"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keep existing styles */}
      <style jsx>{`
        .logos-scroll-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .logos-scroll-content {
          display: flex;
          align-items: center;
          animation: scrollLogos 40s linear infinite;
          width: max-content;
          gap: 1.5rem;
        }
        
        @keyframes scrollLogos {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${logos.length * 150}px);
          }
        }

        .logo-container {
          position: relative;
          padding: 8px;
          transition: opacity 0.3s ease;
        }

        .logo-image {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          filter: grayscale(0.5);
        }
      `}</style>
    </section>
  )
}

