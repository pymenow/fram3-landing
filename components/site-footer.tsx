import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Shield, FileText } from "lucide-react"
import { SiteFooterClient } from "./site-footer-client"
import { NewsletterForm } from "@/components/newsletter-form"

export function SiteFooter() {
  return (
    <SiteFooterClient>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 mb-12">
          {/* Column 1: Brand, About and Social */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-orbitron text-white text-2xl tracking-wider font-bold">
                  FRAM<span className="text-fram3-yellow">3</span>
                </span>
              </Link>
              <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                Transforming scripts into culturally attuned high-impact video content with AI-powered creative
                assistance.
              </p>
            </div>

            {/* Social icons moved up for better balance */}
            <div className="flex items-center space-x-5 pt-1">
              <Link
                href="https://x.com/fram3studio"
                aria-label="Twitter"
                className="text-gray-400 hover:text-fram3-yellow transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/fram3studio"
                aria-label="Facebook"
                className="text-gray-400 hover:text-fram3-yellow transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/automatedvideointelligence/"
                aria-label="Instagram"
                className="text-gray-400 hover:text-fram3-yellow transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="md:col-span-3 lg:col-span-2 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-fram3-yellow transition-colors duration-200 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-400 hover:text-fram3-yellow transition-colors duration-200 inline-block"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="md:col-span-4 lg:col-span-3 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-fram3-yellow mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-tight">
                  #1035, 3rd Floor, Vijaya Bank layout, Bilekahalli, Bangalore - 560076
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-fram3-yellow mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-400">+91 94489 08617</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-fram3-yellow mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-400">support@fram3.ai</span>
              </li>
            </ul>

            {/* Legal Section */}
            <div className="pt-4 mt-1 border-t border-white/10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-3">Legal</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/privacy-policy"
                  className="flex items-center text-sm text-gray-300 hover:text-fram3-yellow transition-colors duration-200 group"
                >
                  <Shield className="h-4 w-4 mr-2 text-fram3-yellow group-hover:text-fram3-yellow" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms-of-service"
                  className="flex items-center text-sm text-gray-300 hover:text-fram3-yellow transition-colors duration-200 group"
                >
                  <FileText className="h-4 w-4 mr-2 text-fram3-yellow group-hover:text-fram3-yellow" />
                  <span>Terms of Service</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: CTA Form */}
          <div className="md:col-span-12 lg:col-span-3 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Create Your First Video</h3>
            <div className="p-4 bg-fram3-dark/40 border border-fram3-yellow/20 rounded-lg shadow-lg">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 font-orbitron">© 2025 FRAM3. All rights reserved.</p>

            <div className="flex items-center">
              <p className="text-xs text-gray-600">
                <span className="text-fram3-yellow">*</span> Enterprise plans include custom terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteFooterClient>
  )
}

