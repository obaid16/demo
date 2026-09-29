import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Flame, Heart, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Our Story & Philosophy — NOOR Indian Dining',
  description: 'The story of NOOR. Reinterpreting royal Awadhi and Kashmiri recipes through 36-hour charcoal slow-cooking, single-origin spices, and refined culinary restraint.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32 bg-[#171513] text-[#F4EFE6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <SectionHeading
          eyebrow="HERITAGE & VISION"
          title="Rooted in History. Refined for Today."
          subtitle="NOOR was conceived not merely as a luxury restaurant, but as a living archive of India’s forgotten royal court banquets, elevated by modern culinary precision."
        />

        {/* Hero Story Banner */}
        <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden border border-[#B89A63]/30 shadow-2xl mb-24">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="NOOR Indian Dining Interior and Heritage Ambiance"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 max-w-xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B89A63] font-semibold block mb-2">
              ESTABLISHED IN NEW DELHI
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF7F2] font-light leading-snug">
              A temple of contemporary Indian hospitality and charcoal alchemy.
            </h2>
          </div>
        </div>

        {/* STORY CHAPTER 1: The Philosophy of Restraint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold block mb-3">
              CHAPTER I
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-light leading-tight mb-6">
              The Lost Language of Royal Restraint
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Across the mid-20th century, global Indian restaurants inadvertently popularized an altered interpretation of North Indian cuisine: rich, heavy, indistinguishable orange gravies weighted down by excessive cream and commercial pastes.
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light mb-6">
              Yet in the historical courts of the Nawabs of Awadh and the Maharajas of Kashmir, food was celebrated for its lightness, fragrance, and physiological harmony. A single stew might demand thirty-two distinct aromatics, each roasted at different temperatures to yield its singular medicinal essence.
            </p>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              NOOR is our commitment to unmasking the truth of these court traditions. We cook slowly, we smoke gently with live sal wood coals, and we allow the pure character of the ingredient to breathe.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden border border-[#B89A63]/25 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Slow simmered coals"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* STORY CHAPTER 2: Executive Chef Vikramaditya Rathore */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-[#B89A63]/25 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Chef Vikramaditya Rathore"
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold block mb-3">
              CHAPTER II
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-light leading-tight mb-6">
              The Guardian of Ancient Techniques
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Executive Chef Vikramaditya Rathore was born into a family with ancestral ties to the court kitchens of Mewar. Having spent over two decades training between European Michelin kitchens and hereditary ustaads in Lucknow and Old Delhi, he brings an obsessive rigor to culinary history.
            </p>
            <div className="p-6 bg-[#201D1A] border-l-2 border-[#B89A63] mb-6">
              <p className="font-serif italic text-base text-[#FAF7F2] leading-relaxed">
                “When you taste our 36-hour Dal Makhani, you are tasting embers that were lit two days prior. There are no shortcuts to time. Time is our most valuable culinary ingredient.”
              </p>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light">
              Under his direction, NOOR uses no artificial food coloring, no commercial purees, and no factory spice blends. Every cardamom pod, clove, and cinnamon quill is inspected and ground on stone silbattas twice daily.
            </p>
          </div>
        </div>

        {/* STORY CHAPTER 3: Single-Origin Spices */}
        <div className="p-8 sm:p-14 bg-[#1B1816] border border-[#B89A63]/25 mb-28">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold block mb-2">
              CHAPTER III
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light leading-tight">
              Single-Origin Spices & Direct Farm Partnerships
            </h2>
            <p className="mt-4 text-stone-300 text-sm font-light leading-relaxed">
              We partner directly with small-holder heritage farmers across the Indian subcontinent to procure spices in their purest, unadulterated state.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#231F1C] border border-[#B89A63]/15">
              <span className="text-[#B89A63] font-serif text-2xl block mb-1">Pampore</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-3">
                Kashmir • Altitude 1,600m
              </span>
              <h3 className="font-serif text-lg text-[#FAF7F2] mb-2">Grade-1 Royal Saffron</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Hand-harvested purple crocus sativus blossoms, providing intense floral aroma and natural golden color.
              </p>
            </div>

            <div className="p-6 bg-[#231F1C] border border-[#B89A63]/15">
              <span className="text-[#B89A63] font-serif text-2xl block mb-1">Tellicherry</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-3">
                Malabar Coast, Kerala
              </span>
              <h3 className="font-serif text-lg text-[#FAF7F2] mb-2">TGSEB Black Peppercorns</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Extra bold vine-ripened berries offering complex resinous warmth without harsh acrid bitterness.
              </p>
            </div>

            <div className="p-6 bg-[#231F1C] border border-[#B89A63]/15">
              <span className="text-[#B89A63] font-serif text-2xl block mb-1">Nagaur</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-3">
                Thar Desert, Rajasthan
              </span>
              <h3 className="font-serif text-lg text-[#FAF7F2] mb-2">Sun-Dried Kasuri Methi</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Wild aromatic fenugreek leaves cured in dry desert winds, lending unmistakable smoky maple notes to our gravies.
              </p>
            </div>

            <div className="p-6 bg-[#231F1C] border border-[#B89A63]/15">
              <span className="text-[#B89A63] font-serif text-2xl block mb-1">Hooghly</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-3">
                West Bengal
              </span>
              <h3 className="font-serif text-lg text-[#FAF7F2] mb-2">Fermented Queen Kasundi</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Pungent stone-ground heirloom mustard seeds fermented under terracotta covers for wild river seafood.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center p-12 bg-[#211E1B] border border-[#B89A63]/30 max-w-3xl mx-auto shadow-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B89A63] font-semibold block mb-3">
            EXPERIENCE THE REALITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light mb-4">
            Join Us for Dinner
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-lg mx-auto mb-8">
            Experience our 9-course degustation or dine à la carte in our candlelit Amber Salon.
          </p>
          <div className="flex justify-center gap-4">
            <Button href="/book" variant="brass" size="md">
              Reserve A Table
            </Button>
            <Button href="/menu" variant="outline" size="md">
              Explore Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
