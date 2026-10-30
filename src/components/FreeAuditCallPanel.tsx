import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BOOKING_URL } from '../constants';

const outcomes = [
  'Where you lose customers today',
  'What to automate first',
  'A clear price for your business',
];

export const FreeAuditCallPanel: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#18181B] text-white rounded-[24px] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FFB020]/15 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-white/60 mb-3 block">
              Free 1:1 strategy session
            </span>

            {/* Panel Heading */}
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] mb-8">
              Get your AI growth plan in a free 1:1 call
            </h2>

            {/* The three things you leave with */}
            <div className="space-y-4 mb-10">
              {outcomes.map((item, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#FFB020] text-[#18181B] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-base sm:text-lg text-white/90 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Action button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center gap-2.5 bg-[#FFB020] text-[#18181B] font-semibold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg shadow-[#FFB020]/25 hover:brightness-105 transition-all text-center"
              >
                <span>Book a free audit call</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
