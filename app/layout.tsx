import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token", // Replace with actual Google verification token
  },
  alternates: {
    canonical: "https://fram3.ai",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}



import './globals.css'