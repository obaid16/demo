'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Navigation, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function LocationReserveBanner() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] border-t border-[#B89A63]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Reservation & Sanctuary Info */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-3">
              <span className="w-8 h-[1px] bg-[#B89A63]" />
              <span>THE DESTINATION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF7F2] leading-tight mb-6">
              In the Heart of New Delhi’s Diplomatic Enclave
            </h2>

            <p className="text-stone-300 text-sm leading-relaxed font-light mb-8">
              Nestled along the quiet, tree-lined avenue of Chanakyapuri, NOOR offers a cloistered sanctuary away from the city’s pulse. Complimentary valet parking is provided for all dinner and private dining guests.
            </p>

            <div className="space-y-4 mb-8 text-xs sm:text-sm">
              <div className="flex items-start gap-3 text-stone-300">
                <MapPin className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">The Heritage Promenade</span>
                  <span className="text-stone-400">Diplomatic Enclave, Chanakyapuri, New Delhi — 110021</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Clock className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">Hours of Service</span>
                  <span className="text-stone-400">Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 11:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-stone-300">
                <Phone className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">Reservations Concierge</span>
                  <span className="text-stone-400 font-mono">+91 (11) 4982 8800</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/book" variant="brass" size="md">
                Reserve Your Table
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Get Directions
              </Button>
            </div>
          </div>

          {/* Right Column: Architectural Map Design Placeholder */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-[#141210] border border-[#B89A63]/30 overflow-hidden shadow-2xl p-8 flex flex-col justify-between">
              {/* Map Grid Graphic Effect */}
              <div className="absolute inset-0 bg-grain opacity-70" />
              <div className="absolute inset-0 bg-[radial-gradient(#B89A63_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

              {/* Decorative Map Vector Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-[#B89A63]/20 stroke-1" fill="none">
                <path d="M 0 120 Q 200 80, 400 160 T 800 140" />
                <path d="M 100 0 Q 150 250, 450 350" />
                <circle cx="280" cy="180" r="80" strokeDasharray="3 3" />
                <circle cx="280" cy="180" r="140" strokeDasharray="4 4" />
              </svg>

              {/* Map Center Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#B89A63] opacity-40" />
                  <div className="relative w-6 h-6 rounded-full bg-[#A9573F] border-2 border-[#FAF7F2] shadow-lg flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
                <div className="mt-2 px-3 py-1 bg-[#171513]/90 border border-[#B89A63]/50 backdrop-blur-md shadow-xl text-center">
                  <span className="font-serif text-xs text-[#FAF7F2] tracking-wider block">NOOR DINING</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#B89A63] block">Diplomatic Enclave</span>
                </div>
              </div>

              {/* Map Card Header */}
              <div className="relative z-10 flex items-center justify-between text-xs text-stone-400">
                <span className="tracking-widest uppercase text-[10px] text-[#B89A63]">CHANAKYAPURI SECTOR</span>
                <span className="font-mono text-[10px]">28.5921° N, 77.1855° E</span>
              </div>

              {/* Map Card Footer Note */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#B89A63]/20 text-[11px] text-stone-300">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#B89A63]" />
                  Dedicated Private Porte-Cochère
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B89A63] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
