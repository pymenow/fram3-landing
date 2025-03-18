import { TopBar } from "@/components/top-bar"
import { SiteFooter } from "@/components/site-footer"
import { CareersClient } from "./careers-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers at Fram3 - Join Our Team",
  description: "Join Fram3's team of innovators shaping the future of AI-driven storytelling and video creation.",
  openGraph: {
    title: "Careers at Fram3 - Join Our Team",
    description: "Join Fram3's team of innovators shaping the future of AI-driven storytelling and video creation.",
    url: "https://fram3.ai/careers",
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

export default function CareersPage() {
  return (
    <>
      <TopBar />
      <CareersClient />
      <SiteFooter />
    </>
  )
}

