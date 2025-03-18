import { TopBar } from "@/components/top-bar"
import { SiteFooter } from "@/components/site-footer"
import { AboutClient } from "./about-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Fram3 - AI-Powered Video Creation Platform",
  description: "Learn about Fram3's mission to transform storytelling with AI-powered video creation technology.",
  openGraph: {
    title: "About Fram3 - AI-Powered Video Creation Platform",
    description: "Learn about Fram3's mission to transform storytelling with AI-powered video creation technology.",
    url: "https://fram3.ai/about",
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
}

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <AboutClient />
      <SiteFooter />
    </>
  )
}

