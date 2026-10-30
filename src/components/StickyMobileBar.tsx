import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { BOOKING_URL } from '../constants';

export const StickyMobileBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden p-3 bg-[#18181B]/95 backdrop-blur-md border-t border-white/10 shadow-2xl pb-safe">
      <div className="max-w-md mx-auto">
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB020] text-[#18181B] font-semibold text-sm sm:text-base py-3 px-5 rounded-full shadow-lg shadow-[#FFB020]/20 active:brightness-95 transition-all text-center"
        >
          <span>Book a free audit call</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </motion.a>
      </div>
    </div>
  );
};
