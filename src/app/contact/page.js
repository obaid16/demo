'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Compass,
  Send,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Dining & Events',
    partySize: '8-15 Guests',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success('Your message has reached our Guest Relations Concierge.');
    }, 1000);
  };

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="COMMUNICATION & CONCIERGE"
          title="Connect with NOOR"
          subtitle="For table reservations, private dining inquiries, press requests, or special culinary arrangements, our concierge awaits."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Direct Sanctuary Coordinates & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#1D1A18] border border-[#B89A63]/30 shadow-xl space-y-6 text-xs sm:text-sm">
              <h2 className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold pb-4 border-b border-[#B89A63]/20">
                The Sanctuary Coordinates
              </h2>

              <div className="flex items-start gap-3.5 text-stone-300">
                <MapPin className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">The Heritage Promenade</span>
                  <span className="text-stone-400 font-light block mt-0.5">
                    Diplomatic Enclave, Chanakyapuri, New Delhi — 110021, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-300">
                <Phone className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">Telephone Concierge</span>
                  <span className="text-[#B89A63] font-mono block mt-0.5">+91 (11) 4982 8800</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Available daily from 10:00 AM to 11:30 PM
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-300">
                <Mail className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">Electronic Correspondence</span>
                  <span className="text-[#B89A63] block mt-0.5">concierge@noordinings.com</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Press & Media: press@noordinings.com
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-stone-300">
                <Clock className="w-4 h-4 text-[#B89A63] shrink-0 mt-1" />
                <div>
                  <span className="text-[#FAF7F2] font-medium block">Dining Hours</span>
                  <span className="text-stone-400 block mt-0.5">
                    Lunch: 12:00 PM – 3:30 PM <br />
                    Dinner: 7:00 PM – 11:30 PM
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Car className="w-3.5 h-3.5 text-[#B89A63]" />
                  Valet Service Included
                </span>
                <span className="px-2.5 py-1 bg-[#231F1C] text-[#B89A63] border border-[#B89A63]/30 text-[10px] tracking-wider uppercase">
                  Dress: Smart Elegant
                </span>
              </div>
            </div>

            {/* Architectural Dark Map Widget */}
            <div className="relative aspect-[16/10] bg-[#141210] border border-[#B89A63]/30 p-6 flex flex-col justify-between overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-grain opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(#B89A63_1px,transparent_1px)] [background-size:18px_18px] opacity-15" />

              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-[#B89A63] opacity-35" />
                <div className="relative w-5 h-5 rounded-full bg-[#A9573F] border-2 border-white shadow-xl flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white" />
                </div>
                <div className="mt-2 px-2.5 py-1 bg-[#171513]/90 border border-[#B89A63]/50 backdrop-blur-xs text-[10px] text-[#FAF7F2]">
                  NOOR DINING
                </div>
              </div>

              <div className="relative z-10 flex justify-between text-[11px] text-stone-400">
                <span>NEW DELHI DIPLOMATIC ENCLAVE</span>
                <span className="font-mono">28.5921° N, 77.1855° E</span>
              </div>

              <div className="relative z-10 flex justify-between items-center pt-2 border-t border-[#B89A63]/20 text-[11px]">
                <span className="text-stone-300">Near Embassy of France & Shanti Path</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B89A63] hover:underline flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Private Dining & Concierge Inquiry Form */}
          <div className="lg:col-span-7 bg-[#1D1A18] border border-[#B89A63]/30 p-8 sm:p-12 shadow-2xl">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold block mb-2">
                INQUIRY & PRIVATE EVENTS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light">
                Send an Inquiry to Our Maitre d’
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
                For buyout banquets, corporate hosting, or dietary consults, submit your details below.
              </p>
            </div>

            {isSent ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#B89A63] mx-auto" />
                <h3 className="font-serif text-2xl text-[#FAF7F2]">Correspondence Dispatched</h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
                  Thank you, {formData.name}. Our Guest Relations Concierge will contact you within four hours to curate your dining arrangements.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-6 px-6 py-2.5 border border-[#B89A63] text-xs uppercase tracking-widest text-[#B89A63] hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Maharani Gayatri"
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98111 22334"
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="patron@domain.com"
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                      Nature of Inquiry
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                    >
                      <option value="Private Dining & Events">Private Salon & Event Buyout</option>
                      <option value="The Royal Dastan Degustation">Chef’s Tasting Table Inquiry</option>
                      <option value="Corporate Executive Dining">Corporate Hospitality Banquet</option>
                      <option value="Press & Media">Media & Editorial Request</option>
                      <option value="General Dining Questions">General Dining Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                    Anticipated Guest Count
                  </label>
                  <select
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleChange}
                    className="w-full bg-[#141210] border border-[#B89A63]/30 px-4 py-3 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                  >
                    <option value="2-4 Guests">Intimate (2 – 4 Guests)</option>
                    <option value="5-8 Guests">Small Group (5 – 8 Guests)</option>
                    <option value="8-15 Guests">Private Salon (8 – 15 Guests)</option>
                    <option value="16-25 Guests">Noor Mahal Grand Suite (16 – 25 Guests)</option>
                    <option value="25+ Guests">Full Restaurant Buyout (25+ Guests)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2">
                    Message & Event Details
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Kindly share your anticipated date, culinary preferences, or special requests..."
                    className="w-full bg-[#141210] border border-[#B89A63]/30 p-4 text-xs text-[#FAF7F2] focus:outline-none focus:border-[#B89A63]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#B89A63] hover:bg-[#D4BA88] text-[#171513] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <span>Transmit Inquiry to Concierge</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
