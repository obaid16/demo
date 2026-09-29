'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#100E0D] text-[#F4EFE6] border-t border-stone-800 pt-20 pb-16 overflow-hidden">
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#A9573F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper Editorial Row: Brand + Essential Links + Timings */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20 border-b border-stone-800/80">
          {/* Brand Identity & Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#FAF7F2] block">
                NOOR
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#B89A63] uppercase -mt-1 block font-mono">
                Indian Dining
              </span>
            </Link>
            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Rooted in centuries of Awadhi and Kashmiri heritage. Crafted with 36-hour charcoal slow-cooking, single-origin spices, and refined culinary restraint.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-[2px] border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:concierge@noordinings.com"
                className="w-8 h-8 rounded-[2px] border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:+911149828800"
                className="w-8 h-8 rounded-[2px] border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/menu" className="text-stone-300 hover:text-white transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-stone-300 hover:text-white transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors">
                  Our Story & Heritage
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-stone-300 hover:text-white transition-colors">
                  Experiences & Salons
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-stone-300 hover:text-white transition-colors">
                  Visual Archive
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-white transition-colors">
                  Sanctuary Coordinates
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Address (4 cols) */}
          <div className="md:col-span-4 space-y-4 text-xs font-light text-stone-300">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono mb-2">
                Service Hours
              </h4>
              <p className="text-stone-400">
                Lunch: <span className="text-[#FAF7F2]">12:00 PM – 3:30 PM</span> <br />
                Dinner: <span className="text-[#FAF7F2]">7:00 PM – 11:30 PM</span> <br />
                Open daily Monday through Sunday.
              </p>
            </div>

            <div className="pt-2 border-t border-stone-800">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono mb-1">
                Sanctuary Address
              </h4>
              <p className="text-stone-400">
                The Heritage Promenade, Diplomatic Enclave, Chanakyapuri, New Delhi — 110021
              </p>
            </div>
          </div>
        </div>

        {/* Lower Grand Statement: YOUR TABLE IS WAITING */}
        <div className="pt-16 pb-12 text-center max-w-3xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#A9573F] font-mono block mb-3">
            AN INVITATION TO DINE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF7F2] font-light leading-tight mb-8">
            Your table is waiting.
          </h2>
          <div className="flex justify-center gap-4">
            <Button href="/book" variant="primary" size="lg">
              Reserve a Table
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              View Menu
            </Button>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-12 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-3">
          <span>© {currentYear} NOOR — Indian Dining. All rights reserved.</span>
          <span>CHANAKYAPURI · NEW DELHI</span>
        </div>
      </div>
    </footer>
  );
}
