"use client"

import { useEffect, useRef, useState } from "react"
import { SparkleButton } from "@/components/sparkle-button"
import { motion, useInView } from "framer-motion"
import { Check } from "lucide-react"

export function HowItWorksSection() {
  const listRef = useRef<HTMLUListElement>(null)
  const itemsRef = useRef<HTMLLIElement[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const customStyles = `
.card-title {
position: absolute;
top: 50%;
left: 10px;
transform-origin: 0 50%;
rotate: 90deg;
transform: translateY(-50%);
font-size: 1rem;
font-weight: 300;
text-transform: uppercase;
opacity: 0.8;
transition: all 0.3s ease;
white-space: nowrap;
letter-spacing: 0.05em;
}

.cascade-item {
transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
box-shadow: none;
transform: translateY(0);
will-change: transform, opacity;
}

.cascade-item:hover {
box-shadow: none;
transform: translateY(-5px);
z-index: 10;
}

.cascade-item[data-active="true"] {
box-shadow: none;
transform: translateY(-8px);
z-index: 20;
}

.cascade-item[data-active="true"] .card-title {
rotate: 0deg;
top: 1rem;
left: 1rem;
transform: none;
font-size: 1.25rem;
font-weight: 500;
opacity: 1;
color: #FFD700;
}

.card-description {
text-align: right;
font-size: 0.875rem;
line-height: 1.5;
opacity: 0; /* Hidden by default */
transition: opacity 0.4s ease-out;
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
width: 100%;
padding-right: 10px;
margin-bottom: 3rem;
pointer-events: none; /* Prevent interaction when invisible */
visibility: hidden;
height: 0;
overflow: hidden;
}

.cascade-item[data-active="true"] .card-description {
opacity: 1;
transition: opacity 0.4s ease-in, height 0.3s ease-in;
pointer-events: auto;
visibility: visible;
height: auto;
overflow: visible;
}
`

  // Add an intersection observer to trigger animations only when in view
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    fallbackInView: true,
  })

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  }

  // Update the useEffect for cascade items to be more performant
  useEffect(() => {
    const list = listRef.current
    const items = itemsRef.current

    if (!list || items.length === 0) return

    // More efficient event handler
    const setIndex = (event: MouseEvent | FocusEvent) => {
      const target = event.target as HTMLElement
      const closest = target.closest("li")

      if (closest) {
        const index = items.indexOf(closest as HTMLLIElement)
        if (index === -1) return // Skip if not found

        setActiveIndex(index)

        // Use requestAnimationFrame for DOM updates
        requestAnimationFrame(() => {
          items.forEach((item, i) => {
            // Set the active state
            item.dataset.active = (index === i).toString()

            // Ensure title is properly positioned
            const title = item.querySelector(".card-title") as HTMLElement
            if (title) {
              title.style.zIndex = index === i ? "10" : "5"
            }
          })

          const cols = new Array(items.length)
            .fill("")
            .map((_, i) => (index === i ? "10fr" : "1fr"))
            .join(" ")

          list.style.setProperty("grid-template-columns", cols)
        })
      }
    }

    // More efficient resize handler with debounce
    let resizeTimeout: NodeJS.Timeout
    const resync = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const w = Math.max(...items.map((i) => i.offsetWidth))
        list.style.setProperty("--article-width", w.toString())
      }, 100)
    }

    // Use passive event listeners for better performance
    list.addEventListener("click", setIndex, { passive: true })

    // Use mouseover instead of pointermove for better performance
    list.addEventListener("mouseover", setIndex, { passive: true })

    window.addEventListener("resize", resync, { passive: true })

    // Set first item as active by default
    items[0].dataset.active = "true"
    const cols = new Array(items.length)
      .fill("")
      .map((_, i) => (i === 0 ? "10fr" : "1fr"))
      .join(" ")
    list.style.setProperty("grid-template-columns", cols)

    resync()

    return () => {
      list.removeEventListener("click", setIndex)
      list.removeEventListener("mouseover", setIndex)
      window.removeEventListener("resize", resync)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Function to highlight specific words
  const highlightText = (text: string, wordsToHighlight: string[]) => {
    let result = text
    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi")
      result = result.replace(regex, '<span class="text-fram3-yellow">$1</span>')
    })
    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  const cards = [
    {
      title: "Enter Your Script",
      description:
        "Even a rough draft. Our proprietary script engine decodes the narrative, thematic and visual aesthetics of your vision to generate the first draft of your video.",
      image: "https://storage.googleapis.com/fram3-ext/Web2/img/howItWorks/A.png",
      highlights: ["Drop in your script", "proprietary script engine"],
      icon: "📝",
      color: "#FFD700",
    },
    {
      title: "Customize Brand DNA",
      description:
        "Upload your creative guidelines, including brand style guides, visual asset libraries, and any specific instructions for wardrobe, set design, and ambient sounds.",
      image: "https://storage.googleapis.com/fram3-ext/Web2/img/howItWorks/B.png",
      highlights: ["creative guidelines"],
      icon: "🧬",
      color: "#00A3FF",
    },
    {
      title: "Shape Your Vision",
      description:
        "Fine-tune the entire creative process from reviewing storyboards, adjusting scene compositions and optimising your final cut based on data-driven insights.",
      image: "https://storage.googleapis.com/fram3-ext/Web2/img/howItWorks/C.png",
      highlights: ["intelligently storyboarding scenes", "final cut", "data-driven insights"],
      icon: "🎬",
      color: "#FF5757",
    },
    {
      title: "Preview & Share",
      description:
        "Export your studio-grade video in various formats and resolutions, ready for distribution across Theaters, TV, and Digital Platforms.",
      image: "https://storage.googleapis.com/fram3-ext/Web2/img/howItWorks/D.png",
      highlights: ["studio-grade video", "diverse cultures"],
      icon: "🚀",
      color: "#00E676",
    },
  ]

  // Add a class to the section for transition effects
  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`section-container py-28 px-4 bg-black relative overflow-hidden section-transition ${
        isInView ? "section-active" : "section-inactive"
      }`}
      aria-labelledby="how-it-works-heading"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Decorative background elements - keep as is */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle animated gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

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

      <style>{customStyles}</style>
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
            <span className="text-sm font-medium text-white/80">How it Works</span>
          </div>

          <h2 id="how-it-works-heading" className="section-title subheadline">
            <span>First Draft</span> to <span className="italic text-fram3-yellow">Final Cut</span>
          </h2>

          <p className="section-description text-gray-300">
            Transform your ideas into optimized video content with unprecedented speed and efficiency. Our platform
            unifies the entire creation journey, from concept to distribution.
          </p>
        </motion.div>

        {/* Rest of the component remains the same */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
          className="mb-16"
        >
          {/* Keep existing content */}
          <div className="relative">
            {/* Step indicators with minimalist and elegant design */}
            <div className="hidden md:block mb-16 relative z-10">
              {/* Minimalist step indicators */}
              <div className="flex justify-between relative px-[7%]">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer group relative"
                    onClick={() => {
                      setActiveIndex(index)

                      // Update the cascade container when clicking on circles
                      const items = itemsRef.current
                      if (items.length > 0) {
                        items.forEach((item, i) => {
                          item.dataset.active = (index === i).toString()
                        })

                        const list = listRef.current
                        if (list) {
                          const cols = new Array(items.length)
                            .fill("")
                            .map((_, i) => (index === i ? "10fr" : "1fr"))
                            .join(" ")
                          list.style.setProperty("grid-template-columns", cols)
                        }
                      }
                    }}
                  >
                    {/* Elegant step indicator */}
                    <div className="relative mb-6">
                      {/* Clean circle design */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          activeIndex >= index ? "border-fram3-yellow bg-black" : "border-white/30 bg-black/50"
                        }`}
                      >
                        {/* Simple number or check */}
                        <div
                          className={`transition-all duration-300 ${
                            activeIndex > index ? "text-fram3-yellow" : "text-white/50"
                          }`}
                        >
                          {activeIndex > index ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Clean title */}
                    <span
                      className={`text-sm font-medium transition-all duration-300 ${
                        activeIndex >= index ? "text-white" : "text-white/40 group-hover:text-white/60"
                      }`}
                    >
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Keep existing animation styles */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.5);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }
              .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
              }
            `}</style>
          </div>

          {/* Keep existing cascade container */}
          <motion.ul
            ref={listRef}
            className="cascade-container"
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.6}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {cards.map((card, index) => (
              <li
                key={index}
                ref={(el) => el && (itemsRef.current[index] = el)}
                className="cascade-item"
                data-active={index === activeIndex ? "true" : "false"}
              >
                <article className="cascade-article">
                  <div className="card-content">
                    <div className="flex items-center">
                      <h3 className="card-title">{card.title}</h3>
                    </div>
                    <div className="card-description-wrapper">
                      <p className="card-description">{highlightText(card.description, card.highlights)}</p>
                    </div>
                  </div>
                  <div className="card-image-wrapper">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 opacity-70 transition-opacity duration-300"
                      style={{ opacity: index === activeIndex ? 0.5 : 0.7 }}
                    ></div>
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      className="card-image"
                      loading="lazy"
                    />
                  </div>
                </article>
              </li>
            ))}
          </motion.ul>

          {/* Mobile step indicators */}
          <div className="flex justify-center mt-8 md:hidden">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-fram3-yellow" : "bg-white/30"
                }`}
                onClick={() => {
                  setActiveIndex(index)

                  // Update the cascade container
                  const items = itemsRef.current
                  if (items.length > 0) {
                    items.forEach((item, i) => {
                      item.dataset.active = (index === i).toString()
                    })

                    const list = listRef.current
                    if (list) {
                      const cols = new Array(items.length)
                        .fill("")
                        .map((_, i) => (index === i ? "10fr" : "1fr"))
                        .join(" ")
                      list.style.setProperty("grid-template-columns", cols)
                    }
                  }
                }}
                aria-label={`View step ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.9}
        >
          <p className="section-description text-gray-300 mb-8">
            Ready to transform your creative vision into professional video content?
          </p>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-fram3-yellow/30 via-[#007bff]/30 to-fram3-yellow/30 rounded-full opacity-75 blur"></div>
            <SparkleButton
              className="relative px-8 py-4 text-base font-semibold rounded-full yellow-glow-button"
              onClick={() => window.open("https://app.fram3studio.io/dashboard", "_blank", "noopener,noreferrer")}
            >
              Generate My Video
            </SparkleButton>
          </div>

          <p className="mt-6 text-sm text-gray-500">No credit card required. Start with a free trial.</p>
        </motion.div>
      </div>
    </section>
  )
}

