'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const CATEGORIES_DATA = [
  {
    id: 'starters',
    title: 'Starters & Small Plates',
    subtitle: 'Crisp textures, spiced yoghurt, and tamarind reductions',
    count: '6 Dishes',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tandoor',
    title: 'Tandoor & Sigri',
    subtitle: 'Smoked over sal wood and glowing charcoal embers',
    count: '4 Dishes',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mains',
    title: 'Heritage Curries',
    subtitle: '36-hour slow simmered aromatic reductions',
    count: '6 Dishes',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'biryani',
    title: 'Royal Dum Biryani',
    subtitle: 'Aged basmati steamed in dough-sealed copper deghs',
    count: '3 Dishes',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'breads',
    title: 'Artisanal Breads',
    subtitle: 'Truffle-brushed naans and saffron sheermals',
    count: '3 Dishes',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'desserts',
    title: 'Sweet Epilogues',
    subtitle: 'Cardamom baked cheesecakes and saffron rasmalai',
    count: '4 Dishes',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'drinks',
    title: 'Elixirs & Infusions',
    subtitle: 'Saffron botanicals and smoked terracotta chai',
    count: '4 Dishes',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
];

export default function MenuCategoriesNav() {
  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CULINARY LANDSCAPE"
          title="The Chapters of Our Menu"
          subtitle="Explore each genre of Indian dining artistry, from the clay tandoor to the delicate perfume of Awadhi dum biryanis."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={`group relative overflow-hidden bg-[#201D1A] border border-stone-800/80 hover:border-[#B89A63]/60 transition-all duration-500 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <Link href={`/menu?category=${cat.id}`} className="block relative h-64 sm:h-72">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-[#100E0D]/60 to-transparent group-hover:via-[#100E0D]/40 transition-colors duration-500" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63] font-semibold bg-[#171513]/85 px-2.5 py-1 border border-[#B89A63]/30 backdrop-blur-xs font-mono">
                      {cat.count}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white group-hover:bg-[#B89A63] group-hover:text-[#171513] group-hover:border-[#B89A63] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] group-hover:text-[#B89A63] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs text-stone-300 font-light line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
