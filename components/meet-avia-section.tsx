"use client"

import { useRef, useState, useEffect } from "react"
import { BookOpen, Globe, Shield, Layers, Music, Film } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the capabilities with their icons and descriptions
const capabilities = [
  {
    title: "Narrative Alchemist",
    description: "Analyzes your script for maximum viewer impact",
    icon: BookOpen,
    color: "#007bff",
  },
  {
    title: "Cultural Cartographer",
    description: "Maps your story to fit any cultural context, making your message resonate globally",
    icon: Globe,
    color: "#00c2ff",
  },
  {
    title: "Brand Guardian",
    description: "Synchronizes characters, locations, and design elements to maintain impeccable brand identity.",
    icon: Shield,
    color: "#FFD700",
  },
  {
    title: "Scene Sculptor",
    description:
      "Identifies narrative arcs to propose dynamic storyboards and shot lists for a seamless creative flow.",
    icon: Layers,
    color: "#ff7b00",
  },
  {
    title: "Emotion Amplifier",
    description: "Optimizes music, sound design, and pacing to evoke genuine emotional responses.",
    icon: Music,
    color: "#ff00c8",
  },
  {
    title: "Auto Cutter",
    description: "Autonomously handles transitions and cutting points to deliver polished, studio-grade videos",
    icon: Film,
    color: "#9000ff",
  },
]

function MeetAviaSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [textAnimationComplete, setTextAnimationComplete] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [letterIndex, setLetterIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [pauseTimestamp, setPauseTimestamp] = useState(0)
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null)
  // Add these to the existing state variables
  const [isUserIdle, setIsUserIdle] = useState(false)
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now())
  const [animatedFeatures, setAnimatedFeatures] = useState<number[]>([])
  const [currentAnimatingFeature, setCurrentAnimatingFeature] = useState<number | null>(null)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const featureTextRefs = useRef<Array<HTMLHeadingElement | null>>([])
  const [isVideoHovered, setIsVideoHovered] = useState(false)
  // Add this to the existing state variables
  const [videoPlaybackFailed, setVideoPlaybackFailed] = useState(false)

  const words = ["AUTOMATED", "VIDEO", "INTELLIGENCE", "ASSISTANT"]
  const letters = "AVIA"

  // Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Handle letter-by-letter animation for "AVIA"
  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      if (letterIndex < letters.length) {
        setLetterIndex((prev) => prev + 1)
      } else {
        // Start word animation after AVIA is complete
        setTimeout(() => {
          setWordIndex(1) // Start with the first word (after "AUTOMATED")
        }, 500)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [isInView, letterIndex])

  // Handle word-by-word animation for full text
  useEffect(() => {
    if (wordIndex === 0 || wordIndex >= words.length) return

    const timer = setTimeout(() => {
      if (wordIndex < words.length) {
        setWordIndex((prev) => prev + 1)
      } else {
        setTextAnimationComplete(true)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [wordIndex])

  // Handle video playback
  useEffect(() => {
    if (!isInView || !videoRef.current) return

    // Always show features regardless of video playback
    const featuresTimer = setTimeout(() => {
      setShowFeatures(true)
    }, 1000)

    // Start video after text animation begins
    const videoTimer = setTimeout(() => {
      if (videoRef.current && !videoPlaybackFailed) {
        // Try to play the video, but handle failure gracefully
        videoRef.current.play().catch((err) => {
          console.warn("Initial video playback failed:", err)
          setVideoPlaybackFailed(true)
          setVideoEnded(true)
          // Only hide the video if it never played at all
          if (videoRef.current && videoRef.current.currentTime === 0) {
            videoRef.current.style.display = "none"
          }
        })
      }
    }, 1000)

    return () => {
      clearTimeout(videoTimer)
      clearTimeout(featuresTimer)
    }
  }, [isInView, textAnimationComplete, videoPlaybackFailed])

  // Handle pause between loops
  useEffect(() => {
    if (!isPaused || videoPlaybackFailed) return

    const now = Date.now()
    const elapsedPauseTime = now - pauseTimestamp

    // If 9 seconds have passed since we paused (increased from 4 seconds)
    if (elapsedPauseTime >= 9000) {
      setIsPaused(false)

      // Resume playback
      if (videoRef.current && !videoPlaybackFailed) {
        videoRef.current.currentTime = 1 // Set to 1-second mark
        videoRef.current.play().catch((err) => {
          console.error("Video playback failed:", err)
          setVideoPlaybackFailed(true)
        })
      }
    } else {
      // Check again after some time
      const remainingTime = 9000 - elapsedPauseTime
      const checkTimer = setTimeout(() => {
        if (isPaused) {
          setIsPaused(false)

          // Resume playback
          if (videoRef.current && !videoPlaybackFailed) {
            videoRef.current.currentTime = 1 // Set to 1-second mark
            videoRef.current.play().catch((err) => {
              console.error("Video playback failed:", err)
              setVideoPlaybackFailed(true)
            })
          }
        }
      }, remainingTime)

      return () => clearTimeout(checkTimer)
    }
  }, [isPaused, pauseTimestamp, videoPlaybackFailed])

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoLoaded = () => {
      setVideoLoaded(true)
    }

    video.addEventListener("loadeddata", handleVideoLoaded)

    return () => {
      video.removeEventListener("loadeddata", handleVideoLoaded)
    }
  }, [])

  // Add this useEffect after the other useEffect hooks
  useEffect(() => {
    // Reset idle timer on user interaction
    const handleUserInteraction = () => {
      setLastInteractionTime(Date.now())
      setIsUserIdle(false)

      // Clear any existing timers
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      // Set new idle timer - 4 seconds
      idleTimerRef.current = setTimeout(() => {
        setIsUserIdle(true)
      }, 4000)
    }

    // Add event listeners for user interaction
    window.addEventListener("mousemove", handleUserInteraction)
    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("keydown", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)
    window.addEventListener("scroll", handleUserInteraction)

    // Initial idle timer
    idleTimerRef.current = setTimeout(() => {
      setIsUserIdle(true)
    }, 4000)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleUserInteraction)
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("keydown", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
      window.removeEventListener("scroll", handleUserInteraction)

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [])

  // Add this useEffect to handle the animation cycle
  useEffect(() => {
    if (!isUserIdle || !showFeatures) {
      // If user is active or features aren't shown yet, clear any animation timer
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
        setCurrentAnimatingFeature(null)
      }
      return
    }

    // Function to get the next feature to animate
    const getNextFeatureIndex = () => {
      // If we've animated all features, reset the list
      if (animatedFeatures.length >= capabilities.length) {
        setAnimatedFeatures([])
        return Math.floor(Math.random() * capabilities.length)
      }

      // Get features that haven't been animated yet
      const remainingFeatures = Array.from({ length: capabilities.length }, (_, i) => i).filter(
        (index) => !animatedFeatures.includes(index),
      )

      // Randomly select one
      const randomIndex = Math.floor(Math.random() * remainingFeatures.length)
      return remainingFeatures[randomIndex]
    }

    const applyScrambleEffect = (featureIndex: number) => {
      setCurrentAnimatingFeature(featureIndex)

      const featureElement = featureTextRefs.current[featureIndex]
      if (!featureElement) return

      const originalText = capabilities[featureIndex].title
      const duration = 1500 // Total animation duration in ms
      const interval = 50 // Interval between character changes
      const steps = Math.floor(duration / interval)
      let currentStep = 0

      // Characters to use for scrambling
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?"

      // Start the scramble animation
      const scrambleInterval = setInterval(() => {
        currentStep++

        // Calculate how many characters should be settled
        const progress = currentStep / steps
        const settledChars = Math.floor(progress * originalText.length)

        // Create the new text with scrambled and settled parts
        let newText = ""
        for (let i = 0; i < originalText.length; i++) {
          if (i < settledChars) {
            // This character is settled
            newText += originalText[i]
          } else {
            // This character is still scrambling
            newText += chars.charAt(Math.floor(Math.random() * chars.length))
          }
        }

        // Update the element text if it exists
        if (featureElement) {
          featureElement.textContent = newText
        }

        // End the animation when all characters are settled
        if (currentStep >= steps) {
          clearInterval(scrambleInterval)
          if (featureElement) {
            featureElement.textContent = originalText
          }

          // Add this feature to the animated list
          setAnimatedFeatures((prev) => [...prev, featureIndex])
          setCurrentAnimatingFeature(null)

          // Schedule the next animation after a random delay between 6-9 seconds
          const randomDelay = Math.floor(Math.random() * 3000) + 6000 // Random between 6000-9000ms
          animationTimerRef.current = setTimeout(() => {
            const nextIndex = getNextFeatureIndex()
            applyScrambleEffect(nextIndex)
          }, randomDelay)
        }
      }, interval)

      // Cleanup function to clear interval if component unmounts during animation
      return () => clearInterval(scrambleInterval)
    }

    // Start the animation cycle if not already running
    if (currentAnimatingFeature === null) {
      const initialDelay = Math.floor(Math.random() * 3000) + 6000 // Random between 6000-9000ms
      animationTimerRef.current = setTimeout(() => {
        const nextIndex = getNextFeatureIndex()
        applyScrambleEffect(nextIndex)
      }, initialDelay)
    }

    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
    }
  }, [isUserIdle, showFeatures, animatedFeatures, currentAnimatingFeature, capabilities])

  // Calculate positions for features in the arc
  const getFeaturePosition = (angle, radius = 320) => {
    // Convert angle to radians
    const radians = (angle * Math.PI) / 180
    // Calculate x and y positions
    const x = Math.cos(radians) * radius
    const y = Math.sin(radians) * radius
    return { x, y }
  }

  return (
    <section
      ref={sectionRef}
      id="meet-avia"
      className="section-container py-32 px-4 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center"
      aria-labelledby="meet-avia-heading"
    >
      {/* Dynamic background elements - keep as is */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(0, 123, 255, 0.4) 0%, transparent 30%), radial-gradient(circle at 70% 60%, rgba(255, 215, 0, 0.3) 0%, transparent 40%)",
            backgroundSize: "100% 100%",
          }}
        ></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        ></div>

        {/* Animated particles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header with animated reveal */}
        <motion.div
          className="text-center section-header"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-badge">
            <div
              className="section-badge-dot bg-[#007bff] shadow-[0_0_8px_rgba(0,123,255,0.8)] transition-all duration-300"
              style={{
                filter: "brightness(1.2)",
                animation: "pulseCustom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            ></div>
            <span className="text-sm font-medium text-white/80">Creative Assistant</span>
          </div>

          <motion.h2
            id="meet-avia-heading"
            className="section-title subheadline tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet{" "}
            <span className="text-fram3-yellow font-orbitron relative inline-block">
              AVIA
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fram3-yellow to-transparent"></span>
            </span>
          </motion.h2>

          <motion.p
            className="section-description text-gray-300 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-gray-400 font-light text-lg">
              Leveraging by 65 years of film-making techniques and marketing insights,
            </span>
            <br />
            <span className="text-white font-medium">
              AVIA transforms scripts into culturally attuned videos with maximum audience engagement.
            </span>
          </motion.p>
        </motion.div>

        {/* Rest of the component remains the same */}
        {/* Main content area with interactive elements - restructured layout */}
        <div className="relative mt-10 mb-20">
          {/* New layout with features on left and right sides of video */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* First half of features - Left side */}
            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  className="w-full md:w-1/4 flex flex-col space-y-12 items-start justify-center md:pr-4"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }} // Reduced delay to appear earlier
                >
                  {capabilities.slice(0, 3).map((capability, index) => (
                    <motion.div
                      key={`feature-left-${index}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }} // Reduced delay to appear earlier
                      className="flex flex-col items-start text-left group w-full feature-group relative"
                      onMouseEnter={() => setHoveredFeatureIndex(index)}
                      onMouseLeave={() => setHoveredFeatureIndex(null)}
                    >
                      {/* Keep existing content */}
                      {/* Connection lines to center - improved positioning */}
                      <div
                        className="feature-connection-line"
                        style={{
                          position: "absolute",
                          right: "-20px",
                          top: "20px",
                          width: "120px",
                          height: "2px",
                          borderTop: "2px dotted rgba(255, 255, 255, 0.2)",
                          transform: index === 0 ? "rotate(15deg)" : index === 1 ? "rotate(0deg)" : "rotate(-15deg)",
                          transformOrigin: "left center",
                          zIndex: 1,
                          opacity: hoveredFeatureIndex === index || isVideoHovered ? 1 : 0,
                          transition: "opacity 0.3s ease",
                          animation: isVideoHovered ? "pulseDotted 3s infinite ease-in-out" : "none",
                        }}
                      >
                        <div
                          className="glowing-line-animation"
                          style={{
                            position: "absolute",
                            width: "30px",
                            height: "2px",
                            background: `linear-gradient(90deg, rgba(${
                              index === 0 ? "0, 123, 255" : index === 1 ? "0, 194, 255" : "255, 215, 0"
                            }, 0), rgba(${
                              index === 0 ? "0, 123, 255" : index === 1 ? "0, 194, 255" : "255, 215, 0"
                            }, 0.8), rgba(${
                              index === 0 ? "0, 123, 255" : index === 1 ? "0, 194, 255" : "255, 215, 0"
                            }, 0))`,
                            borderRadius: "4px",
                            opacity: hoveredFeatureIndex === index ? 1 : 0,
                            animation: "moveGlowingLineBidirectional 1.33s infinite linear",
                            animationPlayState: hoveredFeatureIndex === index ? "running" : "paused",
                          }}
                        />
                      </div>

                      <div className="flex items-center mb-2">
                        {/* Icon with pop-up effect */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 relative transition-all duration-300 ease-in-out`}
                          style={{
                            background: `radial-gradient(circle, ${
                              hoveredFeatureIndex === index ? `${capability.color}30` : "rgba(255,255,255,0.05)"
                            } 0%, transparent 70%)`,
                            transform:
                              hoveredFeatureIndex === index ? "translateY(-5px) scale(1.05)" : "translateY(0) scale(1)",
                          }}
                        >
                          {(() => {
                            const Icon = capability.icon
                            return (
                              <Icon
                                className="w-5 h-5 transition-all duration-300 ease-in-out"
                                style={{
                                  color: hoveredFeatureIndex === index ? capability.color : "rgba(255,255,255,0.8)",
                                }}
                              />
                            )
                          })()}
                          <div
                            className="absolute inset-0 rounded-full opacity-30 transition-all duration-300"
                            style={{
                              boxShadow: hoveredFeatureIndex === index ? `0 0 20px ${capability.color}50` : "none",
                            }}
                          ></div>
                        </div>

                        {/* Main text with pop-up effect */}
                        <h3
                          ref={(el) => {
                            if (featureTextRefs.current.length <= index) {
                              featureTextRefs.current[index] = el
                            } else {
                              featureTextRefs.current[index] = el
                            }
                          }}
                          className={`text-base font-medium transition-all duration-300 ease-in-out ${currentAnimatingFeature === index ? "digital-scramble" : ""}`}
                          style={{
                            color:
                              hoveredFeatureIndex === index
                                ? capability.color
                                : currentAnimatingFeature === index
                                  ? capability.color
                                  : "rgba(255,255,255,0.8)",
                            transform: hoveredFeatureIndex === index ? "translateY(-3px)" : "translateY(0)",
                          }}
                        >
                          {capability.title}
                        </h3>
                      </div>

                      {/* Description that appears only on hover - multi-line format */}
                      <div className="pl-14 relative overflow-visible">
                        <p
                          className="text-sm text-white/70 leading-relaxed transition-all duration-500 ease-in-out"
                          style={{
                            opacity: hoveredFeatureIndex === index ? 1 : 0,
                            transform: hoveredFeatureIndex === index ? "translateY(0)" : "translateY(10px)",
                            transitionDelay: hoveredFeatureIndex === index ? "0.15s" : "0s",
                            maxWidth: "220px",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {capability.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Central video showcase - increased by 20% and shifted left */}
            <motion.div
              className="relative mx-auto my-8 md:my-0 md:w-2/4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Center point marker (invisible but used for positioning) */}
              <div
                className="absolute left-1/2 top-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-transparent z-10"
                id="center-point"
              ></div>

              {/* Video container - increased size by 20% */}
              <div
                className="relative w-[384px] h-[288px] md:w-[768px] md:h-[432px] mx-auto overflow-hidden"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                <video
                  ref={videoRef}
                  src="https://storage.googleapis.com/fram3-ext/Web2/video/Avia%20Low.mov"
                  className="w-full h-full object-contain z-10"
                  style={{ transform: "translateX(-70px)" }}
                  muted
                  playsInline
                  preload="auto"
                  poster="https://storage.googleapis.com/fram3-ext/Web2/img/avia-poster.png"
                  onTimeUpdate={(e) => {
                    if (videoPlaybackFailed) return

                    const video = e.target as HTMLVideoElement

                    // For first play, show features earlier and stop at 3 seconds
                    if (!videoEnded && video.currentTime >= 0.5) {
                      // Show features 3 seconds earlier
                      setShowFeatures(true)
                    }

                    if (!videoEnded && video.currentTime >= 2) {
                      video.pause()
                      setVideoEnded(true)

                      // After a brief pause, start the loop
                      setTimeout(() => {
                        if (videoRef.current && !videoPlaybackFailed) {
                          videoRef.current.currentTime = 1 // Set to 1-second mark
                          videoRef.current.play().catch((err) => {
                            console.warn("Video playback failed on loop:", err)
                            // Only set videoPlaybackFailed if the video never loaded successfully
                            if (!videoLoaded) {
                              setVideoPlaybackFailed(true)
                            }
                            // Don't hide the video element if it initially played
                          })
                        }
                      }, 500)
                    }

                    // For subsequent loops, pause for 9 seconds (increased from 4) when reaching 2 seconds
                    else if (videoEnded && video.currentTime >= 2 && !isPaused) {
                      video.pause()
                      setIsPaused(true)
                      setPauseTimestamp(Date.now())
                    }
                  }}
                  onError={(e) => {
                    console.warn("Video failed to load", e)
                    setVideoPlaybackFailed(true)
                    setShowFeatures(true)
                    // Only hide video if it never loaded
                    if (!videoLoaded) {
                      if (videoRef.current) {
                        videoRef.current.style.display = "none"
                      }
                    }
                  }}
                />
                {/* Fallback image in case video fails */}
                <div
                  className={`absolute inset-0 z-5 flex items-center justify-center bg-black ${
                    videoPlaybackFailed && !videoLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transition: "opacity 0.3s ease" }}
                >
                  <img
                    src="https://storage.googleapis.com/fram3-ext/Web2/img/avia-poster.png"
                    alt="AVIA"
                    className="w-full h-full object-contain"
                    style={{ transform: "translateX(-70px)" }}
                  />
                </div>
              </div>

              {/* Full text overlay with highlighted first letters - moved below video */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="font-orbitron text-lg md:text-xl text-white/90 tracking-wider">
                  <span className="text-fram3-yellow">A</span>utomated <span className="text-fram3-yellow">V</span>ideo{" "}
                  <span className="text-fram3-yellow">I</span>ntelligence <span className="text-fram3-yellow">A</span>
                  ssistant
                </div>
              </motion.div>
            </motion.div>

            {/* Second half of features - Right side */}
            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  className="w-full md:w-1/4 flex flex-col space-y-12 items-end justify-center md:pl-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }} // Reduced delay to appear earlier
                >
                  {capabilities.slice(3, 6).map((capability, index) => {
                    const actualIndex = index + 3 // Adjust index for hover state
                    return (
                      <motion.div
                        key={`feature-right-${index}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }} // Reduced delay to appear earlier
                        className="flex flex-col items-end text-right group w-full feature-group relative"
                        onMouseEnter={() => setHoveredFeatureIndex(actualIndex)}
                        onMouseLeave={() => setHoveredFeatureIndex(null)}
                      >
                        {/* Connection lines to center - improved positioning */}
                        <div
                          className="feature-connection-line"
                          style={{
                            position: "absolute",
                            left: "-20px",
                            top: "20px",
                            width: "120px",
                            height: "2px",
                            borderTop: "2px dotted rgba(255, 255, 255, 0.2)",
                            transform: index === 0 ? "rotate(-15deg)" : index === 1 ? "rotate(0deg)" : "rotate(15deg)",
                            transformOrigin: "right center",
                            zIndex: 1,
                            opacity: hoveredFeatureIndex === actualIndex || isVideoHovered ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            animation: isVideoHovered ? "pulseDotted 3s infinite ease-in-out" : "none",
                          }}
                        >
                          <div
                            className="glowing-line-animation"
                            style={{
                              position: "absolute",
                              width: "30px",
                              height: "2px",
                              background: `linear-gradient(90deg, rgba(${
                                index === 0 ? "255, 123, 0" : index === 1 ? "255, 0, 200" : "144, 0, 255"
                              }, 0), rgba(${
                                index === 0 ? "255, 123, 0" : index === 1 ? "255, 0, 200" : "144, 0, 255"
                              }, 0.8), rgba(${
                                index === 0 ? "255, 123, 0" : index === 1 ? "255, 0, 200" : "144, 0, 255"
                              }, 0))`,
                              borderRadius: "4px",
                              opacity: hoveredFeatureIndex === actualIndex ? 1 : 0,
                              animation: "moveGlowingLineBidirectionalReverse 1.33s infinite linear",
                              animationPlayState: hoveredFeatureIndex === actualIndex ? "running" : "paused",
                            }}
                          />
                        </div>

                        <div className="flex items-center mb-2">
                          {/* Main text with pop-up effect */}
                          <h3
                            ref={(el) => {
                              if (featureTextRefs.current.length <= actualIndex) {
                                featureTextRefs.current[actualIndex] = el
                              } else {
                                featureTextRefs.current[actualIndex] = el
                              }
                            }}
                            className={`text-base font-medium transition-all duration-300 ease-in-out mr-3 ${currentAnimatingFeature === actualIndex ? "digital-scramble" : ""}`}
                            style={{
                              color:
                                hoveredFeatureIndex === actualIndex
                                  ? capability.color
                                  : currentAnimatingFeature === actualIndex
                                    ? capability.color
                                    : "rgba(255,255,255,0.8)",
                              transform: hoveredFeatureIndex === actualIndex ? "translateY(-3px)" : "translateY(0)",
                            }}
                          >
                            {capability.title}
                          </h3>

                          {/* Icon with pop-up effect */}
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center relative transition-all duration-300 ease-in-out"
                            style={{
                              background: `radial-gradient(circle, ${
                                hoveredFeatureIndex === actualIndex ? `${capability.color}30` : "rgba(255,255,255,0.05)"
                              } 0%, transparent 70%)`,
                              transform:
                                hoveredFeatureIndex === actualIndex
                                  ? "translateY(-5px) scale(1.05)"
                                  : "translateY(0) scale(1)",
                            }}
                          >
                            {(() => {
                              const Icon = capability.icon
                              return (
                                <Icon
                                  className="w-5 h-5 transition-all duration-300 ease-in-out"
                                  style={{
                                    color:
                                      hoveredFeatureIndex === actualIndex ? capability.color : "rgba(255,255,255,0.8)",
                                  }}
                                />
                              )
                            })()}
                            <div
                              className="absolute inset-0 rounded-full opacity-30 transition-all duration-300"
                              style={{
                                boxShadow:
                                  hoveredFeatureIndex === actualIndex ? `0 0 20px ${capability.color}50` : "none",
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Description that appears only on hover - multi-line format */}
                        <div className="pr-14 relative overflow-visible">
                          <p
                            className="text-sm text-white/70 leading-relaxed transition-all duration-500 ease-in-out text-right"
                            style={{
                              opacity: hoveredFeatureIndex === actualIndex ? 1 : 0,
                              transform: hoveredFeatureIndex === actualIndex ? "translateY(0)" : "translateY(10px)",
                              transitionDelay: hoveredFeatureIndex === actualIndex ? "0.15s" : "0s",
                              maxWidth: "220px",
                              marginLeft: "auto",
                              lineHeight: "1.4",
                              display: "-webkit-box",
                              WebkitLineClamp: "3",
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {capability.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && showFeatures ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a
            href="https://app.fram3studio.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-fram3-yellow to-fram3-yellow/80 text-black rounded-full font-medium hover:shadow-lg hover:shadow-fram3-yellow/20 transition-all duration-300 hover:scale-105"
          >
            Experience AVIA
          </a>
          <p className="text-sm text-white/50 mt-4">Your creative IP and scripts remain protected and private.</p>
        </motion.div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(10px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        /* Ensure smooth animations throughout */
        :global(.motion-div) {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        /* Improved bidirectional animations for glowing lines */
        @keyframes moveGlowingLineBidirectional {
          0% { left: 0; }
          50% { left: calc(100% - 30px); }
          100% { left: 0; }
        }

        @keyframes moveGlowingLineBidirectionalReverse {
          0% { right: 0; }
          50% { right: calc(100% - 30px); }
          100% { right: 0; }
        }

        .feature-group {
          position: relative;
        }

        .feature-group:hover .glowing-line-animation {
          opacity: 1;
        }

        /* Add this to the existing style jsx section */
        .digital-scramble {
          position: relative;
        }

        .digital-scramble::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.1), transparent);
          animation: digitalGlitch 0.8s ease-out;
        }

        @keyframes digitalGlitch {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes pulseCustom {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes pulseDotted {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .section-container {
          padding-left: 2rem;
          padding-right: 2rem;
        }

        .section-header {
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1.5rem;
        }

        .section-badge-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          margin-right: 0.5rem;
        }

        .section-title {
          font-size: 3.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          color: white;
        }

        .section-description {
          font-size: 1.25rem;
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </section>
  )
}

export default MeetAviaSection

