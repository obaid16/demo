'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false,
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`relative z-10 max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 mb-3 text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase ${
            light ? 'text-[#B89A63]' : 'text-[#B89A63]'
          }`}
        >
          <span className="w-6 h-[1px] bg-[#B89A63]" />
          <span>{eyebrow}</span>
          {isCenter && <span className="w-6 h-[1px] bg-[#B89A63]" />}
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12] ${
            light ? 'text-[#171513]' : 'text-[#F4EFE6]'
          }`}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed max-w-2xl font-light ${
            isCenter ? 'mx-auto' : ''
          } ${light ? 'text-[#5A4638]' : 'text-[#D9D2C5]'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
