import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { BOOKING_URL, CITY, BUSINESS_NAME } from '../constants';

export const Closing: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative bg-[#18181B] text-white overflow-hidden">
      {/* Closing Hero with place.jpg under dark color layer */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        {/* Background Image: place.jpg */}
        <img
          src="/place.jpg"
          alt="Clean calm plumbing showroom and contractor workshop interior in the United States"
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Dark colour layer */}
        <div className="absolute inset-0 bg-[#18181B]/85 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
              Lock in your after-hours calls
            </span>

            <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-8">
              Stop losing night calls when your plumbing office closes
            </h2>

            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2.5 bg-[#FFB020] text-[#18181B] font-semibold text-base sm:text-lg px-9 py-4 rounded-full shadow-xl shadow-[#FFB020]/25 hover:brightness-105 transition-all text-center"
            >
              <span>Book a free audit call</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Footer info: logo, City, links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <Logo variant="light" size="md" />

          {/* City label */}
          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin className="w-4 h-4 text-[#FFB020]" />
            <span>Serving plumbing companies across {CITY}</span>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <a href="#what-changes" className="hover:text-white transition-colors">What changes</a>
            <a href="#sample-builds" className="hover:text-white transition-colors">Sample builds</a>
            <a href="#cost-calculator" className="hover:text-white transition-colors">Missed calls cost</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#questions" className="hover:text-white transition-colors">Questions</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {BUSINESS_NAME}. All rights reserved.</p>
          <p>The After Hours Answer Fix for plumbing companies.</p>
        </div>
      </div>
    </footer>
  );
};
