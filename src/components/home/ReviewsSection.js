'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS } from '@/data/reviews';

export default function ReviewsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#12100F] text-[#F4EFE6] border-t border-stone-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="PATRON LOG & REFLECTIONS"
          title="Guest Notes"
          subtitle="Reflections and observations from patrons who have shared our candlelit salons and tasting sequences."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-8 sm:p-9 bg-[#1A1715] border border-stone-800 flex flex-col justify-between group hover:border-[#B89A63]/50 transition-colors"
            >
              <Quote className="w-7 h-7 text-[#B89A63]/30 mb-4" />

              <blockquote className="font-serif italic text-base sm:text-lg text-stone-200 leading-relaxed mb-6 font-light">
                “{review.quote}”
              </blockquote>

              <div className="pt-5 border-t border-stone-800 flex items-end justify-between">
                <div>
                  <div className="font-serif text-base text-[#FAF7F2] font-medium">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#B89A63] font-light mt-0.5">
                    {review.title}
                  </div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-1 font-mono">
                    Dish: <span className="text-stone-300">{review.dishMentioned}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-wider text-stone-400 uppercase bg-[#221F1C] px-2.5 py-1 border border-stone-700/50">
                    {review.source}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
