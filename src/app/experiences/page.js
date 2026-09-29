import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, Wine, Users, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { EXPERIENCES } from '@/data/experiences';

export const metadata = {
  title: 'Dining Experiences & Private Salons — NOOR',
  description: 'Explore signature dining rituals at NOOR. From the 9-course Royal Dastan tasting menu to Friday Sufi Strings and The Noor Mahal private dining suite.',
};

export default function ExperiencesPage() {
  const [featuredExperience, ...otherExperiences] = EXPERIENCES;

  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="BESPOKE RITUALS"
          title="Signature Dining Experiences"
          subtitle="Beyond our à la carte menu, NOOR hosts intimate multi-course degustations, live acoustic classical evenings, and private royal salon banquets."
        />

        {/* 1. HERO FEATURED EXPERIENCE: The Royal Dastan Tasting */}
        {featuredExperience && (
          <div className="mb-20 bg-[#1B1816] border border-stone-800 overflow-hidden shadow-2xl rounded-[2px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[500px]">
                <Image
                  src={featuredExperience.image}
                  alt={featuredExperience.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1816] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1B1816]" />
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3 py-1 bg-[#A9573F] text-white text-[10px] font-semibold uppercase tracking-[0.2em] font-mono rounded-[2px]">
                    Signature Degustation
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono mb-2">
                    9-COURSE ODYSSEY
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light leading-tight mb-2">
                    {featuredExperience.title}
                  </h2>
                  <p className="text-xs text-[#B89A63] italic mb-4 font-serif">
                    {featuredExperience.tagline}
                  </p>
                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {featuredExperience.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    {featuredExperience.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B89A63] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#211E1B] border border-stone-800 mb-6 flex justify-between items-baseline">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                        Privilege Pricing
                      </span>
                      <span className="font-serif text-2xl text-[#FAF7F2] font-medium">
                        ₹{featuredExperience.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-400 font-light block">
                        per guest
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                        Seating
                      </span>
                      <span className="text-xs text-stone-200 block font-medium mt-0.5">
                        {featuredExperience.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    href={`/book?occasion=${encodeURIComponent(featuredExperience.title)}`}
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    Reserve Tasting Table
                  </Button>
                  <Button href="/contact" variant="outline" size="md" className="w-full sm:w-auto">
                    Inquire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. OTHER EDITORIAL EXPERIENCES */}
        <div className="space-y-14">
          {otherExperiences.map((exp, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={exp.id}
                className="bg-[#1C1916] border border-stone-800 overflow-hidden shadow-2xl rounded-[2px]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div
                    className={`lg:col-span-6 relative min-h-[320px] sm:min-h-[440px] ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-[#1C1916] via-transparent to-transparent ${
                        isReversed
                          ? 'lg:bg-gradient-to-l lg:from-[#1C1916]'
                          : 'lg:bg-gradient-to-r lg:from-transparent lg:to-[#1C1916]'
                      }`}
                    />
                  </div>

                  <div
                    className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-mono mb-2">
                        SPECIAL SALON RITUAL
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light leading-tight mb-2">
                        {exp.title}
                      </h2>

                      <p className="text-xs text-stone-300 italic mb-4 font-serif">
                        {exp.tagline}
                      </p>

                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {exp.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-stone-300 font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B89A63] mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3.5 bg-[#211E1B] border border-stone-800 mb-6 flex justify-between items-baseline text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                            Pricing
                          </span>
                          <span className="font-serif text-xl text-[#FAF7F2] font-medium block">
                            ₹{exp.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                            Schedule
                          </span>
                          <span className="text-stone-300 font-medium">
                            {exp.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        href={`/book?occasion=${encodeURIComponent(exp.title)}`}
                        variant="primary"
                        size="sm"
                      >
                        Reserve Experience
                      </Button>
                      <Button href="/contact" variant="outline" size="sm">
                        Private Inquiries
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
