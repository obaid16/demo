import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, Wine, Users, ArrowRight, Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { EXPERIENCES } from '@/data/experiences';

export const metadata = {
  title: 'Dining Experiences & Private Salons — NOOR',
  description: 'Explore signature dining rituals at NOOR. From the 9-course Royal Dastan tasting menu to Friday Sufi Strings and The Noor Mahal private dining suite.',
};

export default function ExperiencesPage() {
  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="BESPOKE RITUALS"
          title="Signature Dining Experiences"
          subtitle="Beyond our à la carte menu, NOOR hosts intimate multi-course degustations, live acoustic classical evenings, and private royal salon banquets."
        />

        <div className="space-y-16">
          {EXPERIENCES.map((exp, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={exp.id}
                className="bg-[#1C1916] border border-[#B89A63]/30 overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative min-h-[340px] sm:min-h-[460px] ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#1C1916] via-transparent to-transparent ${
                        isReversed
                          ? 'lg:bg-gradient-to-l lg:from-[#1C1916]'
                          : 'lg:bg-gradient-to-r lg:from-transparent lg:to-[#1C1916]'
                      }`}
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="px-3.5 py-1.5 bg-[#A9573F] text-white text-[10px] font-semibold uppercase tracking-[0.2em] shadow-md">
                        Exclusive Ritual
                      </span>
                    </div>
                  </div>

                  {/* Narrative & Details Column */}
                  <div
                    className={`lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89A63] font-medium mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#B89A63]" />
                        <span>RESERVATION REQUIRED</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F2] font-light leading-tight mb-2">
                        {exp.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#B89A63] italic mb-4 font-serif">
                        {exp.tagline}
                      </p>

                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Highlights Bullet List */}
                      <div className="space-y-2 mb-8">
                        {exp.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A63] mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing & Timing Bar */}
                      <div className="p-4 bg-[#231F1C] border border-[#B89A63]/20 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                            Privilege Pricing
                          </span>
                          <span className="font-serif text-2xl text-[#FAF7F2] font-medium block">
                            ₹{exp.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] text-stone-400 font-light">
                            {exp.priceNote}
                          </span>
                        </div>

                        <div className="sm:text-right border-t sm:border-0 pt-2 sm:pt-0 border-stone-800">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                            Schedule
                          </span>
                          <span className="text-stone-300 block font-medium mt-0.5">
                            {exp.time}
                          </span>
                          <span className="text-[11px] text-[#B89A63] block">
                            Duration: {exp.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        href={`/book?occasion=${encodeURIComponent(exp.title)}`}
                        variant="brass"
                        size="md"
                        className="w-full sm:w-auto"
                      >
                        Reserve This Experience
                      </Button>
                      <Button href="/contact" variant="outline" size="md" className="w-full sm:w-auto">
                        Inquire for Private Buyout
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
