'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { REVIEWS } from '@/data/reviews';

export default function ReviewsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#12100F] text-[#F4EFE6] border-t border-[#B89A63]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="CRITICAL APPRAISALS"
          title="In the Words of Our Guests"
          subtitle="Reflections from culinary critics, visiting international chefs, and patrons who hold our tables dear."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="relative p-8 sm:p-10 bg-[#1A1715] border border-[#B89A63]/25 flex flex-col justify-between group hover:border-[#B89A63]/60 transition-colors"
            >
              <Quote className="w-8 h-8 text-[#B89A63]/25 mb-4 group-hover:text-[#B89A63]/40 transition-colors" />

              <blockquote className="font-serif italic text-base sm:text-lg text-stone-200 leading-relaxed mb-8 font-light">
                “{review.quote}”
              </blockquote>

              <div className="pt-6 border-t border-[#B89A63]/20 flex items-end justify-between">
                <div>
                  <div className="font-serif text-lg text-[#FAF7F2] font-medium">
                    {review.author}
                  </div>
                  <div className="text-xs text-[#B89A63] font-light mt-0.5">
                    {review.title}
                  </div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider mt-1">
                    Noted dish: <span className="text-stone-400">{review.dishMentioned}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono tracking-wider text-stone-400 uppercase bg-[#24201D] px-2.5 py-1 border border-[#B89A63]/20">
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
