"use client"

import { useEffect } from "react"
import type React from "react"
import { Roboto, Orbitron, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { initEmailJS } from "@/utils/email"
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
})

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const bebas_neue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    // Initialize EmailJS
    initEmailJS()
  }, [])

  return (
    <html lang="en" suppressHydrationWarning className={`${orbitron.variable} ${bebas_neue.variable}`}>
      <head>
        <Script
          id="gsap-script"
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
          strategy="beforeInteractive"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${roboto.className} antialiased theme-transition overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>

        {/* Structured Data for Organization */}
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Fram3",
              "url": "https://fram3.ai",
              "logo": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon512-BltUGmUYuud13sZHlzplinGXTZRR5h.png",
              "description": "AI-powered video creation platform transforming scripts into professional videos.",
              "sameAs": [
                "https://twitter.com/fram3ai",
                "https://facebook.com/fram3ai",
                "https://instagram.com/fram3ai"
              ]
            }
          `}
        </Script>

        {/* Structured Data for Product */}
        <Script id="product-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Fram3 AVIA",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "499",
                "priceCurrency": "INR"
              },
              "description": "AI-powered video creation assistant transforming scripts into professional videos."
            }
          `}
        </Script>
      </body>
    </html>
  )
}

