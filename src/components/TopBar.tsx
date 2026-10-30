import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from './Logo';
import { BOOKING_URL } from '../constants';

const navItems = [
  { label: 'What changes', href: '#what-changes' },
  { label: 'Sample builds', href: '#sample-builds' },
  { label: 'Missed calls cost', href: '#cost-calculator' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Questions', href: '#questions' },
];

export const TopBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#18181B]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB020] rounded-lg">
          <Logo variant="light" size="md" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors duration-150 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Top bar pill button */}
        <div className="hidden sm:flex items-center">
          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FFB020] text-[#18181B] font-semibold text-sm px-5 py-2.5 rounded-full shadow-md shadow-[#FFB020]/20 hover:brightness-105 transition-all"
          >
            <span>Free audit call</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </motion.a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className="inline-flex items-center gap-1 bg-[#FFB020] text-[#18181B] font-semibold text-xs px-3.5 py-2 rounded-full"
          >
            <span>Audit call</span>
          </motion.a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB020] rounded-lg"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drop-down drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#18181B] border-b border-white/10 px-6 py-5 flex flex-col gap-4 animate-in fade-in duration-150">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/90 text-base font-medium py-1.5 hover:text-[#FFB020] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB020] text-[#18181B] font-semibold text-base py-3 rounded-full"
            >
              <span>Book a free audit call</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
