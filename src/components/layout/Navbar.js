'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled
            ? 'bg-[#171513]/96 backdrop-blur-md py-3.5 border-b border-stone-800 shadow-xl'
            : 'bg-gradient-to-b from-[#100E0D]/90 via-[#100E0D]/30 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Minimal Brand Identity */}
            <Link href="/" className="group flex flex-col items-start select-none">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.22em] text-[#FAF7F2] transition-colors group-hover:text-[#B89A63]">
                NOOR
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#B89A63] uppercase -mt-1 font-mono transition-colors group-hover:text-[#FAF7F2]">
                Indian Dining
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-1 ${
                      isActive ? 'text-[#FAF7F2] font-semibold' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A9573F]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs: Order & Reserve */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5">
              {/* Order Online Quick Link */}
              <Link
                href="/order"
                className="text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-colors"
              >
                Order
              </Link>

              {/* Cart Drawer Trigger with Animated Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="View order tray"
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#A9573F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>

              {/* Reserve a Table CTA */}
              <Button href="/book" variant="primary" size="sm">
                Reserve
              </Button>
            </div>

            {/* Mobile Actions: Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#F4EFE6] hover:text-[#B89A63] cursor-pointer"
                aria-label="View order tray"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#A9573F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#F4EFE6] hover:text-[#B89A63] transition-colors cursor-pointer"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Modal with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#171513] text-[#F4EFE6] flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar inside modal */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-5">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <span className="font-serif text-2xl tracking-[0.2em] text-[#FAF7F2]">NOOR</span>
                <span className="block text-[9px] tracking-[0.35em] text-[#B89A63] uppercase font-mono">
                  Indian Dining
                </span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-300 hover:text-white rounded-full bg-[#201D1A] border border-stone-800 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links with Stagger */}
            <nav className="flex flex-col space-y-5 my-auto py-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-3xl sm:text-4xl text-[#F4EFE6] hover:text-[#B89A63] transition-colors flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#A9573F]" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <Link
                  href="/order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl sm:text-4xl text-[#F4EFE6] hover:text-[#B89A63] transition-colors flex items-center justify-between group"
                >
                  <span>Order Online</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#A9573F]" />
                </Link>
              </motion.div>
            </nav>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-6 border-t border-stone-800">
              <Button
                href="/book"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reserve a Table
              </Button>
              <div className="flex justify-between items-center text-[10px] text-stone-500 pt-2 font-mono">
                <span>NEW DELHI · CHANAKYAPURI</span>
                <span>OPEN DAILY 12PM–11:30PM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
