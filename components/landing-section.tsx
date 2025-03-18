"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { SparkleButton } from "@/components/sparkle-button"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function LandingSection() {
  const [script, setScript] = useState("")
  const nextSectionRef = useRef<HTMLElement | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [text, setText] = useState("")
  const fullText = "10x Faster"
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToNextSection = () => {
    const socialProofSection = document.getElementById("social-proof")
    if (socialProofSection) {
      socialProofSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="landing" className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-10 px-4">
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.5}px)`, top: "80px" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-60"
          src="https://storage.googleapis.com/fram3-ext/Web2/video/Fram3%20Loop.mov"
          poster="https://storage.googleapis.com/fram3-ext/Web2/img/landing-poster.jpg"
          aria-label="Background video showing Fram3 video creation process"
          onError={(e) => {
            // Hide video element if it fails to load
            const target = e.target as HTMLVideoElement
            target.style.display = "none"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
      </div>

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-6xl mx-auto text-center mt-8"
        style={{ marginTop: "-30px" }}
      >
        <div className="flex flex-col items-center">
          {/* Removed decorative circles as requested */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ marginTop: "-80px" }}
          >
            <h1 className="mb-4 text-center">
              <span
                className="block text-gray-300 mega-text bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-transparent"
                style={{ transform: "scale(1.2)", marginBottom: "30px" }}
              >
                High Impact Videos
              </span>

              <div className="relative inline-block overflow-visible w-full">
                <span
                  className="block mega-text bg-clip-text text-transparent bg-gradient-to-r from-white to-white bg-[length:200%_100%] animate-[shine_3s_linear_infinite] italic whitespace-nowrap"
                  style={{ transform: "scale(1.2)" }}
                >
                  {text}
                </span>
              </div>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center mb-8 relative"
            style={{ marginTop: "170px" }}
          >
            <p className="text-xl md:text-2xl font-semibold mb-2 text-gray-200 text-shadow">
              <span className="highlight italic relative">Script to Screen in 5 mins</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-2xl mx-auto mt-12 relative"
          >
            <div className="flex justify-center">
              <div className="relative group">
                {/* Rainbow border animation on hover */}
                <div className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 rainbow-border-animation"></div>

                <SparkleButton
                  className="px-8 py-4 text-base font-semibold rounded-full relative z-10"
                  onClick={() =>
                    window.open("https://app.fram3studio.io/dashboard/script-analysis", "_blank", "noopener,noreferrer")
                  }
                >
                  Generate My Video
                </SparkleButton>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-sm text-[#007bff] mt-6 flex items-center justify-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-[#007bff] rounded-full animate-pulse"></span>
              automated video intelligence
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fram3-yellow/75"
        onClick={scrollToNextSection}
      >
        <ChevronDown className="h-8 w-8 down-arrow" aria-label="Scroll down to learn more" />
      </motion.div>
      <style jsx>{`
  .rainbow-border-animation {
    background: linear-gradient(
      90deg,
      #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff, #ff0000
    );
    background-size: 400% 400%;
    animation: rainbow-move 3s linear infinite;
    border-radius: 9999px;
    z-index: 0;
  }

  @keyframes rainbow-move {
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
`}</style>
    </section>
  )
}

