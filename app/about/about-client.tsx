"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { SparkleButton } from "@/components/ui/sparkle-button"
import { useEffect, useState } from "react"

export function AboutClient() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: visionRef, inView: visionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: creativityRef, inView: creativityInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: storyRef, inView: storyInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: whyRef, inView: whyInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: promiseRef, inView: promiseInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: ctaRef, inView: ctaInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden pt-24">
      {/* Grid Background */}
      <div className="fixed inset-0 grid-background opacity-30" />
      {/* Cosmic Background */}
      <div className="fixed inset-0 cosmic-background" />
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="space-y-6 mb-24"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-fram3-yellow mr-2"></span>
            <span className="text-sm font-medium">Our Story</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight">
            About <span className="text-fram3-yellow">Fram3</span>
          </h1>

          <div className="h-1 w-20 bg-fram3-yellow"></div>
        </motion.div>
        {/* Vision Section */}
        <motion.section
          ref={visionRef}
          initial="hidden"
          animate={visionInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="space-y-6 mb-24"
        >
          <h2 className="text-3xl font-bold text-fram3-yellow font-orbitron">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
            We believe that storytelling should be fast, fluid, and limitless—without sacrificing creativity, depth, or
            cultural impact. Fram3 unites cinematic artistry with cutting-edge AI, empowering anyone with a story to
            create stunning, audience-ready videos in record time.
          </p>
        </motion.section>
        {/* Creativity Meets Intelligence Section */}
        <motion.section
          ref={creativityRef}
          initial="hidden"
          animate={creativityInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10 mb-24"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            Where Creativity Meets Intelligence
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                  <rect x="7" y="7" width="10" height="10" rx="1" ry="1" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Automated Video Intelligence (AVIA)
              </h3>
              <p className="text-gray-300">
                Our proprietary AI engine, built upon 65 years of film-making techniques and marketing insights, decodes
                scripts to deliver high-impact visuals, story arcs, and production-ready edits.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M2 12h20"></path>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Global Cultural Insights
              </h3>
              <p className="text-gray-300">
                Leveraging advanced analytics, our platform ensures your content resonates worldwide—tailoring your
                message to local nuances with pinpoint precision.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M15 9.354a4 4 0 1 0 0 5.292"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Seamless Brand Synergy
              </h3>
              <p className="text-gray-300">
                From color palettes to character design, we lock in the nuances of your brand identity, ensuring every
                scene is on point and on brand.
              </p>
            </motion.div>
          </div>
        </motion.section>
        {/* Our Story Section */}
        <motion.section
          ref={storyRef}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="space-y-6 mb-24"
        >
          <h2 className="text-3xl font-bold text-fram3-yellow font-orbitron">Our Story</h2>
          <div className="relative p-8 bg-black/50 border border-white/10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fram3-yellow/5 to-transparent opacity-50"></div>
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              Fram3 was born from a team of veteran filmmakers, tech innovators, and brand strategists who saw a gap
              between high-end studio production and the need for faster, more dynamic content creation. Fuelled by our
              shared passion for storytelling, we built a platform that removes tedious bottlenecks, helping creators
              and businesses speak the language of film—faster and smarter than ever before.
            </p>
          </div>
        </motion.section>
        {/* Why Fram3 Section */}
        <motion.section
          ref={whyRef}
          initial="hidden"
          animate={whyInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10 mb-24"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            Why Fram3?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUpVariants} className="flex gap-4 group">
              <div className="flex-shrink-0 w-1 bg-fram3-yellow group-hover:h-full transition-all duration-500 h-12"></div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-fram3-yellow transition-colors duration-300">
                  10x Faster
                </h3>
                <p className="text-gray-300 mt-2">Go from script to screen in just minutes, not months.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex gap-4 group">
              <div className="flex-shrink-0 w-1 bg-fram3-yellow group-hover:h-full transition-all duration-500 h-12"></div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-fram3-yellow transition-colors duration-300">
                  Cinematic Mastery
                </h3>
                <p className="text-gray-300 mt-2">
                  Our AI harnesses decades of industry knowledge, delivering professional-grade videos without expensive
                  overhead.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex gap-4 group">
              <div className="flex-shrink-0 w-1 bg-fram3-yellow group-hover:h-full transition-all duration-500 h-12"></div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-fram3-yellow transition-colors duration-300">
                  Brand Guardian
                </h3>
                <p className="text-gray-300 mt-2">
                  Every element—from character look to the final cut—stays true to your identity.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex gap-4 group">
              <div className="flex-shrink-0 w-1 bg-fram3-yellow group-hover:h-full transition-all duration-500 h-12"></div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-fram3-yellow transition-colors duration-300">
                  End-to-End Ecosystem
                </h3>
                <p className="text-gray-300 mt-2">
                  Collaborate, edit, and publish in one seamless interface, removing the friction of juggling multiple
                  tools.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex gap-4 group md:col-span-2">
              <div className="flex-shrink-0 w-1 bg-fram3-yellow group-hover:h-full transition-all duration-500 h-12"></div>
              <div>
                <h3 className="font-bold text-xl text-white group-hover:text-fram3-yellow transition-colors duration-300">
                  Trusted by Industry Leaders
                </h3>
                <p className="text-gray-300 mt-2">
                  Disney, Ogilvy, and Skydance trust Fram3's intelligence to elevate their creative output.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Our Promise Section */}
        <motion.section
          ref={promiseRef}
          initial="hidden"
          animate={promiseInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10 mb-24"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            Our Promise
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Data Security
              </h3>
              <p className="text-gray-300">
                Your scripts, footage, and final videos remain secure and private. We only train our AI with your
                explicit permission.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Creative Freedom
              </h3>
              <p className="text-gray-300">
                We empower you to shape your vision the way you want—no forced templates, no limits on inspiration.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <div className="w-12 h-12 rounded-full bg-fram3-yellow/10 flex items-center justify-center mb-4 group-hover:bg-fram3-yellow/20 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-fram3-yellow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Global Community
              </h3>
              <p className="text-gray-300">
                Join a thriving network of creators, agencies, and studios redefining video production.
              </p>
            </motion.div>
          </div>
        </motion.section>
        {/* Ready to Create Section */}
        <motion.section
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="space-y-6"
        >
          <div className="relative p-10 bg-black/40 border border-white/10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fram3-yellow/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-fram3-yellow font-orbitron mb-6">Ready to Create?</h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-8 max-w-2xl">
                Unleash your imagination and transform words into worlds. Whether you're a student, indie filmmaker, or
                a major studio, Fram3's flexible plans fit every stage of your creative journey.
              </p>
              <p className="text-xl font-orbitron font-bold text-fram3-yellow mt-2 mb-6">
                Fram3 — From Words to Worlds
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <SparkleButton className="w-full sm:w-auto">Start Your Free Trial</SparkleButton>
                <p className="text-sm text-gray-400 self-center">
                  No credit card required. No prompts needed—just pure creativity.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}

