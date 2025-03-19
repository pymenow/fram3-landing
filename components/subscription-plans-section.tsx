"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"
import { ContactFormPopup } from "@/components/contact-form-popup"

const monthlyPlans = [
  {
    name: "Starter",
    forText: "For Students",
    price: "₹499",
    period: "/month",
    limited: "(limited)",
    features: [
      "1 script - 720p video (watermark)",
      "2 scripts - Storyboards (watermark)",
      "5 scripts - Script Analysis",
      "Low Priority Render",
    ],
    cta: "Subscribe",
    popular: false,
  },
  {
    name: "Pro",
    forText: "For Creators",
    price: "₹999",
    period: "/month",
    limited: "",
    features: [
      "4 scripts - 1080p videos with lipsync",
      "8 scripts - Storyboards",
      "25 scripts - Advanced Script Analytics",
      "Custom Editor",
    ],
    cta: "Subscribe",
    popular: true,
  },
  {
    name: "Premium",
    forText: "For Agencies",
    price: "₹1,999",
    period: "/month",
    limited: "",
    features: [
      "10 scripts - 2k videos with custom voice over",
      "20 scripts - Storyboards",
      "50 scripts - Analytics & Market Research",
      "Custom Editor",
    ],
    cta: "Subscribe",
    popular: false,
  },
  {
    name: "Ultra",
    forText: "For Studios",
    price: "₹4,999",
    period: "/month",
    limited: "",
    features: [
      "Unlimited - 4K videos, Storyboards & Script Research",
      "Custom Editor",
      "Custom Scene Engine",
      "Dedicated Server",
    ],
    cta: "Subscribe",
    popular: false,
  },
]

const yearlyPlans = [
  {
    name: "Starter",
    forText: "For Students",
    price: "₹4,999",
    period: "/year",
    limited: "(limited)",
    features: [
      "1 script - 720p video (watermark)",
      "2 scripts - Storyboards (watermark)",
      "5 scripts - Script Analysis",
      "Low Priority Render",
    ],
    cta: "Subscribe",
    popular: false,
  },
  {
    name: "Pro",
    forText: "For Creators",
    price: "₹9,999",
    period: "/year",
    limited: "",
    features: [
      "4 scripts - 1080p videos with lipsync",
      "8 scripts - Storyboards",
      "25 scripts - Advanced Script Analytics",
      "Custom Editor",
    ],
    cta: "Subscribe",
    popular: true,
  },
  {
    name: "Premium",
    forText: "For Agencies",
    price: "₹19,999",
    period: "/year",
    limited: "",
    features: [
      "10 scripts - 2k videos with custom voice over",
      "20 scripts - Storyboards",
      "50 scripts - Analytics & Market Research",
      "Custom Editor",
    ],
    cta: "Subscribe",
    popular: false,
  },
  {
    name: "Ultra",
    forText: "For Studios",
    price: "₹49,999",
    period: "/year",
    limited: "",
    features: [
      "Unlimited - 4K videos, Storyboards & Script Research",
      "Custom Editor",
      "Custom Scene Engine",
      "Dedicated Server",
    ],
    cta: "Subscribe",
    popular: false,
  },
]

export function SubscriptionPlansSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const plans = billingCycle === "monthly" ? monthlyPlans : yearlyPlans
  // Removed hover states as we're disabling hover interactions
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // Add intersection observer for better performance
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    fallbackInView: true,
  })

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

  // Optimize the card hover animations

  // Add a class to the section for transition effects
  return (
    <section
      ref={sectionRef}
      id="pricing"
      className={`section-container py-32 px-6 bg-black relative overflow-hidden section-transition ${isInView ? "section-active" : "section-inactive"}`}
      aria-labelledby="pricing-heading"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle animated gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-fram3-yellow/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-fram3-yellow/30 to-transparent"></div>

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

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#007bff]/5 blur-[120px] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-fram3-yellow/5 blur-[120px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center section-header"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        >
          <div className="section-badge">
            <div className="section-badge-dot bg-fram3-yellow animate-pulse"></div>
            <span className="text-sm font-medium text-white">Flexible Plans</span>
          </div>

          <h2 id="pricing-heading" className="section-title subheadline">
            Pricing & <span className="text-fram3-yellow italic">Plans</span>
          </h2>

          <p className="section-description text-gray-300">
            Choose the perfect plan for your creative needs. Scale as you grow with our flexible pricing options.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-20"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
        >
          <div className="inline-flex p-1.5 bg-fram3-dark/80 backdrop-blur-sm rounded-full border border-white/10">
            <button
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-fram3-yellow to-fram3-yellow text-black shadow-lg shadow-fram3-yellow/20"
                  : "text-white hover:bg-white/10",
              )}
              onClick={() => setBillingCycle("monthly")}
              aria-pressed={billingCycle === "monthly"}
            >
              Monthly Billing
            </button>
            <button
              className={cn(
                "px-8 py-3 rounded-full text-sm font-medium transition-all duration-300",
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-fram3-yellow to-fram3-yellow text-black shadow-lg shadow-fram3-yellow/20"
                  : "text-white hover:bg-white/10",
              )}
              onClick={() => setBillingCycle("yearly")}
              aria-pressed={billingCycle === "yearly"}
            >
              Yearly Billing{" "}
              <span className={cn("font-bold", billingCycle === "yearly" ? "text-black" : "text-fram3-yellow")}>
                (Save 20%)
              </span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.7}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={cn(
                "pricing-card group relative rounded-2xl backdrop-blur-xl border transition-all duration-500 bg-white/5",
                plan.popular ? "border-fram3-yellow/30" : "border-white/10",
              )}
              variants={fadeInUpVariants}
              custom={0.7 + index * 0.15}
              data-popular={plan.popular ? "true" : "false"}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-fram3-yellow text-black text-xs font-bold rounded-full shadow-lg invisible">
                  Most Popular
                </div>
              )}

              <div className="p-8 h-full flex flex-col backdrop-blur-md">
                <div className="mb-6 blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-1 subheadline">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.forText}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">
                      <span className="blur-lg">₹</span>
                      <span className="blur-lg">{plan.price.replace("₹", "")}</span>
                    </span>
                    <span className="text-gray-400 ml-2 blur-sm">{plan.period}</span>
                    {plan.limited && <span className="text-gray-400 text-xs ml-2 blur-sm">{plan.limited}</span>}
                  </div>
                </div>

                <div className="flex-grow mb-8 blur-sm">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5",
                            plan.popular ? "bg-fram3-yellow/20" : "bg-white/10",
                          )}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12L10 17L19 8"
                              stroke={plan.popular ? "#FFD700" : "white"}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <button
                    className={cn(
                      "w-full py-3 px-6 rounded-xl text-center text-sm font-semibold transition-all duration-300",
                      plan.popular
                        ? "bg-fram3-yellow text-black shadow-lg shadow-fram3-yellow/20"
                        : "bg-white/10 text-white border border-white/20",
                    )}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col items-center text-center max-w-2xl mx-auto mt-12 mb-8 p-8 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl"
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1.2}
        >
          <div className="section-badge inline-flex items-center px-8 py-4 rounded-xl bg-fram3-dark/60 border border-white/10 mb-8">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 text-fram3-yellow"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 8H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base font-medium text-white">Need a custom solution?</span>
          </div>

          <p className="text-gray-300 mb-6 max-w-lg">
            Our enterprise plans offer advanced features, dedicated support, and custom integrations tailored to your
            organization's needs.
          </p>

          <button
            onClick={() => setIsContactFormOpen(true)}
            className="inline-flex items-center justify-center text-fram3-yellow hover:underline text-lg font-medium px-8 py-3 border border-fram3-yellow/30 rounded-xl hover:bg-fram3-yellow/10 transition-all duration-300"
          >
            <span>Contact our sales team</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>
      </div>
      <ContactFormPopup isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </section>
  )
}

