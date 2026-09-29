'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#100E0D] text-[#F4EFE6] border-t border-[#B89A63]/25 pt-20 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-radial from-[#B89A63]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Grand Invitation Banner */}
        <div className="pb-16 mb-16 border-b border-[#B89A63]/20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89A63] font-medium block mb-3">
              RESERVATIONS & PRIVATE DINING
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF7F2] font-light leading-tight">
              Your table is waiting.
            </h3>
            <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-xl font-light">
              We seat for lunch and evening dinner service. For parties larger than eight or private salon bookings, our maitre d’ will coordinate every detail.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Button href="/book" variant="brass" size="lg">
              Reserve A Table
            </Button>
            <Button href="/order" variant="outline" size="lg">
              Order Online
            </Button>
          </div>
        </div>

        {/* 4-Column Editorial Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#B89A63]/15">
          {/* Brand & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#FAF7F2] block">NOOR</span>
              <span className="text-[10px] tracking-[0.35em] text-[#B89A63] uppercase -mt-1 block font-medium">
                Indian Dining
              </span>
            </Link>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              A contemporary temple of Indian gastronomy. Honouring ancient royal recipes from Awadh, Kashmir, and coastal Malabar with uncompromised modern precision.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#B89A63]/30 flex items-center justify-center text-[#B89A63] hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:reservations@noordinings.com"
                className="w-9 h-9 rounded-full border border-[#B89A63]/30 flex items-center justify-center text-[#B89A63] hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+911149828800"
                className="w-9 h-9 rounded-full border border-[#B89A63]/30 flex items-center justify-center text-[#B89A63] hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5">
              Explore Noor
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/menu" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  The Full Tasting Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  Philosophy & Executive Chef
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  The Royal Dastan & Private Salons
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  Atmosphere & Culinary Gallery
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  Artisanal Home Dining & Takeaway
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-300 hover:text-[#B89A63] transition-colors">
                  Location & Private Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Service Hours</span>
            </h4>
            <div className="space-y-4 text-xs sm:text-sm text-stone-300 font-light">
              <div>
                <span className="text-[#FAF7F2] font-medium block">Lunch Service</span>
                <span className="text-stone-400">Monday – Sunday</span>
                <span className="block text-[#B89A63]">12:00 PM — 3:30 PM</span>
              </div>
              <div className="pt-2 border-t border-stone-800/80">
                <span className="text-[#FAF7F2] font-medium block">Dinner Service</span>
                <span className="text-stone-400">Monday – Sunday</span>
                <span className="block text-[#B89A63]">7:00 PM — 11:30 PM</span>
              </div>
              <div className="text-[11px] text-stone-400 pt-1">
                *The Sigri Hearth and Tandoor close at 11:00 PM.
              </div>
            </div>
          </div>

          {/* Address & Direct Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold mb-5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89A63]" />
              <span>Sanctuary & Contact</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              <p>
                The Heritage Promenade, Diplomatic Enclave, Chanakyapuri, New Delhi — 110021
              </p>
              <p className="pt-2 text-stone-400">
                Direct Concierge: <br />
                <span className="text-[#FAF7F2] font-mono font-medium">+91 (11) 4982 8800</span>
              </p>
              <p className="text-stone-400">
                Inquiries: <br />
                <span className="text-[#B89A63]">concierge@noordinings.com</span>
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 text-[10px] tracking-wider uppercase bg-[#211E1B] text-[#B89A63] border border-[#B89A63]/30">
                  Valet Parking Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Subtle Agency Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {currentYear} NOOR Indian Dining. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider">
            <span>CULINARY DIRECTION: VIKRAMADITYA RATHORE</span>
            <span className="text-stone-600">•</span>
            <span>NEW DELHI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
