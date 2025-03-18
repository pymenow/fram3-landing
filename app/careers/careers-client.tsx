"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"

export function CareersClient() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: whoRef, inView: whoInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: whyRef, inView: whyInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: skillsRef, inView: skillsInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const { ref: positionsRef, inView: positionsInView } = useInView({
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

  const tableRowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
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
            <span className="text-sm font-medium">Join Our Team</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight">
            Careers at <span className="text-fram3-yellow">Fram3</span>
          </h1>

          <div className="h-1 w-20 bg-fram3-yellow"></div>

          <motion.div variants={fadeInUpVariants} className="mt-8">
            <h2 className="text-2xl font-bold text-fram3-yellow font-orbitron mb-4">
              Shape the Future of AI-Driven Storytelling
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
              At Fram3, we're transforming the way stories come to life. Our mission is to empower creators—studios,
              agencies, and indie filmmakers alike—to produce stunning, culturally resonant videos at unprecedented
              speed. If you're passionate about the intersection of creativity and cutting-edge technology, we'd love to
              hear from you.
            </p>
          </motion.div>
        </motion.div>

        {/* Who We Are Section */}
        <motion.section
          ref={whoRef}
          initial="hidden"
          animate={whoInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="space-y-6 mb-24"
        >
          <h2 className="text-3xl font-bold text-fram3-yellow font-orbitron">Who We Are</h2>
          <div className="relative p-8 bg-black/50 border border-white/10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fram3-yellow/5 to-transparent opacity-50"></div>
            <p className="text-gray-300 leading-relaxed text-lg relative z-10">
              We're a collective of filmmakers, technologists, and dreamers who believe in forging new frontiers in
              media production. Guided by our proprietary Automated Video Intelligence (AVIA) and decades of cinematic
              know-how, we're helping creators around the globe bring their visions to life faster and smarter.
            </p>
          </div>
        </motion.section>

        {/* Why Join Fram3 Section */}
        <motion.section
          ref={whyRef}
          initial="hidden"
          animate={whyInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10 mb-24"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            Why Join Fram3?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-fram3-yellow transition-colors duration-300">
                Pioneering Innovation
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-fram3-yellow mr-2">•</span>
                  <span>Work at the forefront of AI, cloud technology, and filmmaking.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-fram3-yellow mr-2">•</span>
                  <span>
                    Collaborate with world-class engineers, artists, and data scientists to push the boundaries of
                    what's possible.
                  </span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-fram3-yellow transition-colors duration-300">
                Impactful Products
              </h3>
              <p className="text-gray-300">
                Your work will directly influence how major brands and indie filmmakers craft their stories—shaping
                trends in the film, marketing, and media industries.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-fram3-yellow transition-colors duration-300">
                Creative Freedom
              </h3>
              <p className="text-gray-300">
                We celebrate bold thinking and new ideas. Our open culture encourages experimentation, learning from
                failure, and turning visionary concepts into reality.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group"
            >
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-fram3-yellow transition-colors duration-300">
                Global Reach
              </h3>
              <p className="text-gray-300">
                Fram3's platform is used by creators in diverse markets, from big-screen studios to fast-paced marketing
                agencies. Expand your global network and skill set.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="bg-black/30 border border-white/10 p-6 rounded-lg hover:border-fram3-yellow/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] group md:col-span-2"
            >
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-fram3-yellow transition-colors duration-300">
                Inclusive Culture
              </h3>
              <p className="text-gray-300">
                Our strength lies in our differences. We champion diversity of thought, background, and
                approach—ensuring every voice finds a spotlight.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* What We're Looking For Section */}
        <motion.section
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10 mb-24"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            What We're Looking For: Skills Over Credentials
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
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Coding Chops
              </h3>
              <p className="text-gray-300">Show us your Python prowess, your JavaScript genius, or your C++ mastery.</p>
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
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                System-Building Wizardry
              </h3>
              <p className="text-gray-300">
                Demonstrate your ability to architect and optimize high-performance systems.
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
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-white mb-2 group-hover:text-fram3-yellow transition-colors duration-300">
                Infrastructure Expertise
              </h3>
              <p className="text-gray-300">
                Showcase your skills in designing scalable and efficient infrastructure solutions.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Open Positions Section */}
        <motion.section
          ref={positionsRef}
          initial="hidden"
          animate={positionsInView ? "visible" : "hidden"}
          variants={staggerChildrenVariants}
          className="space-y-10"
        >
          <motion.h2 variants={fadeInUpVariants} className="text-3xl font-bold text-fram3-yellow font-orbitron">
            Open Positions: Your Next Role Awaits
          </motion.h2>

          <motion.p variants={fadeInUpVariants} className="text-gray-300 text-lg">
            Check out our current openings below—we're always on the lookout for rockstars to join our mission.
          </motion.p>

          <motion.div
            variants={fadeInUpVariants}
            className="overflow-x-auto bg-black/30 border border-white/10 rounded-lg"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Role</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Department</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Location</th>
                  <th className="py-4 px-6 text-left text-gray-400 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    role: "Director of Machine Learning, Dataset Engineering",
                    department: "Research",
                    location: "Remote / Remote",
                  },
                  {
                    role: "Research Manager, Foundation Models",
                    department: "Research",
                    location: "Remote / Mumbai",
                  },
                  { role: "Sales & Revenue Ops Manager", department: "Finance & Sales", location: "Remote / Mumbai" },
                  {
                    role: "Technical Customer Success Manager",
                    department: "Finance & Sales",
                    location: "Remote / Mumbai",
                  },
                  { role: "Animator", department: "Fram3", location: "Mumbai / Bengaluru" },
                  { role: "VFX Artist", department: "Fram3", location: "Mumbai / Bengaluru" },
                ].map((job, index) => (
                  <motion.tr
                    key={index}
                    custom={index}
                    variants={tableRowVariants}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-white">{job.role}</td>
                    <td className="py-4 px-6 text-gray-300">{job.department}</td>
                    <td className="py-4 px-6 text-gray-300">{job.location}</td>
                    <td className="py-4 px-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-fram3-yellow border-fram3-yellow hover:bg-fram3-yellow hover:text-black transition-all duration-300"
                      >
                        Apply
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="mt-12 p-8 bg-black/40 border border-white/10 rounded-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fram3-yellow/10 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Don't see your role?</h3>
              <p className="text-gray-300 text-lg">
                Send an email to{" "}
                <Link
                  href="mailto:careers@fram3studio.io"
                  className="text-fram3-yellow hover:underline transition-all duration-300"
                >
                  careers@fram3studio.io
                </Link>{" "}
                and we'll let you know if there's a fit.
              </p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}

