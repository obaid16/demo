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
  const baseStyles = 'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 select-none group overflow-hidden';
  
  const sizeStyles = {
    sm: 'text-xs uppercase tracking-wider py-2.5 px-4',
    md: 'text-xs sm:text-sm uppercase tracking-widest py-3.5 px-6 sm:px-7',
    lg: 'text-sm sm:text-base uppercase tracking-widest py-4 px-8 sm:px-10',
  };

  const variants = {
    primary: 'bg-[#A9573F] text-[#FAF7F2] hover:bg-[#924530] border border-[#A9573F]/60 shadow-[0_4px_20px_rgba(169,87,63,0.25)] hover:shadow-[0_6px_25px_rgba(169,87,63,0.4)]',
    brass: 'bg-[#B89A63] text-[#171513] font-semibold hover:bg-[#D4BA88] border border-[#B89A63] shadow-[0_4px_20px_rgba(184,154,99,0.25)] hover:shadow-[0_6px_30px_rgba(184,154,99,0.4)]',
    outline: 'bg-transparent text-[#F4EFE6] border border-[#B89A63]/50 hover:border-[#B89A63] hover:text-[#FAF7F2] hover:bg-[#B89A63]/10 backdrop-blur-xs',
    dark: 'bg-[#211e1b] text-[#F4EFE6] border border-[#B89A63]/30 hover:border-[#B89A63] hover:bg-[#282420]',
    ghost: 'bg-transparent text-[#B89A63] hover:text-[#D4BA88] p-0 tracking-widest',
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {/* Subtle shine / glow overlay */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out" />
    </>
  );

  const combinedClass = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

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
