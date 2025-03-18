import Link from "next/link"
import Image from "next/image"
import { TopBarClient } from "./top-bar-client"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export function TopBar() {
  return (
    <TopBarClient orbitronVariable={orbitron.variable}>
      <div className="flex items-center group">
        <Link href="/" className="flex items-center gap-3 relative" aria-label="Fram3 Home">
          <div className="relative w-10 h-10 flex items-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-fram3-yellow/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon512-BltUGmUYuud13sZHlzplinGXTZRR5h.png"
              alt="Fram3 Logo"
              width={40}
              height={40}
              className="object-contain relative z-10 transition-all duration-300"
              priority
            />
          </div>
          <span
            className="font-orbitron text-white text-2xl tracking-wider font-bold transition-transform duration-300 group-hover:text-fram3-yellow/90"
            style={{ transform: "translateY(-4.5px)" }}
          >
            FRAM<span className="text-fram3-yellow group-hover:text-white transition-colors duration-300">3</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative group">
          {/* Animated border on hover */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-fram3-yellow via-white/30 to-fram3-yellow rounded-full opacity-0 group-hover:opacity-100 blur-[1px] transition-all duration-300"></div>

          <Link href="https://app.fram3studio.io/" target="_blank" rel="noopener noreferrer">
            <div className="bg-fram3-yellow text-black hover:bg-fram3-yellow/90 rounded-full px-6 py-2 w-[120px] relative z-10 shadow-lg shadow-fram3-yellow/20 transition-all duration-300 group-hover:shadow-fram3-yellow/40 group-hover:scale-[1.02] flex items-center justify-center">
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fram3-yellow to-[#FFC107] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>
      </div>
    </TopBarClient>
  )
}

