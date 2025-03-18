import { LandingSection } from "@/components/landing-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import BenefitsSection from "@/components/benefits-section"
import MeetAviaSection from "@/components/meet-avia-section"
import { CtaSection } from "@/components/cta-section"
import { SubscriptionPlansSection } from "@/components/subscription-plans-section"
import { SiteFooter } from "@/components/site-footer"
import { SideNav } from "@/components/side-nav"
import { TopBar } from "@/components/top-bar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fram3 - AI-Powered Video Creation Platform | Transform Scripts into Videos",
  description:
    "Fram3 with AVIA - Your creative assistant transforming scripts into culturally attuned high-impact video content. Generate professional videos instantly with AI.",
  keywords:
    "AI video creation, video production, AVIA, script to video, AI video generator, video content creation, automated video production",
  openGraph: {
    title: "Fram3 - AI-Powered Video Creation Platform",
    description: "Transform your scripts into professional videos with AVIA, your AI creative assistant.",
    url: "https://fram3.ai",
    siteName: "Fram3",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon512-BltUGmUYuud13sZHlzplinGXTZRR5h.png",
        width: 1200,
        height: 630,
        alt: "Fram3 - Video Creation Reimagined",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fram3 - AI-Powered Video Creation Platform",
    description: "Transform your scripts into professional videos with AVIA, your AI creative assistant.",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon512-BltUGmUYuud13sZHlzplinGXTZRR5h.png"],
  },
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden cosmic-background">
      <TopBar />
      <SideNav />

      <LandingSection />
      <div className="section-divider" />

      <SocialProofSection />
      <div className="section-divider" />

      <HowItWorksSection />
      <div className="section-divider" />

      <MeetAviaSection />
      <div className="section-divider" />

      <BenefitsSection />
      <div className="section-divider" />

      <CtaSection />
      <div className="section-divider" />

      <SubscriptionPlansSection />
      <div className="section-divider" />

      <SiteFooter />
    </main>
  )
}

