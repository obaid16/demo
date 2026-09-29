'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { GALLERY_ITEMS } from '@/data/gallery';

export default function GalleryPreview() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const previewItems = GALLERY_ITEMS.slice(0, 6);

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = () => {
    setSelectedIdx((prev) => (prev === 0 ? previewItems.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIdx((prev) => (prev === previewItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#171513] text-[#F4EFE6] border-t border-[#B89A63]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="VISUAL DISPATCHES"
          title="The Aesthetics of NOOR"
          subtitle="Glimpses into our live sigri hearth, antique brass dining sanctum, and artistic table service."
        />

        {/* Masonry / Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              onClick={() => openLightbox(idx)}
              className={`group relative overflow-hidden bg-[#201D1B] border border-[#B89A63]/20 hover:border-[#B89A63] cursor-pointer transition-all duration-500 ${
                idx === 1 ? 'sm:row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100E0D] via-[#100E0D]/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover Overlay Meta */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-[#171513]/80 border border-[#B89A63]/50 flex items-center justify-center text-[#B89A63]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B89A63] block">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-lg text-[#FAF7F2] leading-snug mt-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/gallery" variant="outline" size="lg">
            <span>Explore Complete Gallery ({GALLERY_ITEMS.length} Photos)</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-stone-300 hover:text-white bg-[#24201D] border border-[#B89A63]/30 rounded-full z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white bg-[#24201D]/80 border border-[#B89A63]/30 rounded-full z-50 hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white bg-[#24201D]/80 border border-[#B89A63]/30 rounded-full z-50 hover:bg-[#B89A63] hover:text-[#171513] transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={previewItems[selectedIdx].image}
                  alt={previewItems[selectedIdx].title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89A63]">
                  {previewItems[selectedIdx].location}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] mt-1">
                  {previewItems[selectedIdx].title}
                </h3>
                <p className="text-xs text-stone-400 font-light mt-1">
                  {previewItems[selectedIdx].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
