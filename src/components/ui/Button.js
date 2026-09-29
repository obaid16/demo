'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-[0.18em] transition-all duration-300 select-none group overflow-hidden rounded-[2px] cursor-pointer';

  const sizeStyles = {
    sm: 'text-[11px] uppercase py-2 px-4',
    md: 'text-xs uppercase py-3.5 px-6 sm:px-7',
    lg: 'text-xs sm:text-sm uppercase py-4 px-8 sm:px-9',
  };

  const variants = {
    primary:
      'bg-[#A9573F] text-[#FAF7F2] hover:bg-[#934833] border border-[#A9573F] shadow-[0_4px_16px_rgba(169,87,63,0.2)]',
    brass:
      'bg-[#B89A63] text-[#171513] font-semibold hover:bg-[#C5A872] border border-[#B89A63]',
    ivory:
      'bg-[#F4EFE6] text-[#171513] font-semibold hover:bg-[#FAF7F2] border border-[#F4EFE6]',
    outline:
      'bg-transparent text-[#F4EFE6] border border-[#B89A63]/40 hover:border-[#B89A63] hover:text-[#FAF7F2] hover:bg-[#B89A63]/10',
    outlineDark:
      'bg-transparent text-[#171513] border border-stone-800/30 hover:border-[#171513] hover:bg-[#171513]/5',
    dark:
      'bg-[#211E1B] text-[#FAF7F2] border border-stone-700/60 hover:border-[#B89A63]',
    ghost:
      'bg-transparent text-[#B89A63] hover:text-[#D4BA88] p-0 tracking-widest',
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {/* Subtle sheen on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out pointer-events-none" />
    </>
  );

  const combinedClass = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variants[variant] || variants.primary
  } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
}
