import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { LogoMark } from './Logo';
import { FOUNDER_NAME, FOUNDER_FIRST_NAME, BUSINESS_NAME, ABOUT_ME, BOOKING_URL } from '../constants';

export const Founder: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B] border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[24px] p-8 sm:p-12 lg:p-16 border border-black/[0.06] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Left: 4:5 rounded tile of the highlight colour with large logo mark */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] bg-[#FFB020] rounded-[24px] flex flex-col items-center justify-center p-8 shadow-md relative overflow-hidden"
              >
                {/* Background decorative geometry */}
                <div className="absolute inset-0 bg-radial from-white/20 to-transparent pointer-events-none" />

                {/* Large inline SVG logo mark */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <LogoMark sizeClass="w-28 h-28 sm:w-32 sm:h-32" fillDark={true} />
                  <span className="font-heading font-bold text-2xl text-[#18181B] mt-6 tracking-tight">
                    {BUSINESS_NAME}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right: Founder details */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#18181B]/60 mb-2">
                Behind the service
              </span>

              {/* Founder Name */}
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-[#18181B] tracking-tight mb-1">
                {FOUNDER_NAME}
              </h3>

              {/* Title */}
              <p className="text-base sm:text-lg font-medium text-[#18181B]/70 mb-6">
                Founder, {BUSINESS_NAME}
              </p>

              {/* About me */}
              <p className="text-lg sm:text-xl text-[#18181B] leading-relaxed mb-8 max-w-xl font-normal">
                {ABOUT_ME}.
              </p>

              {/* Button: Book a free call with [my first name] */}
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                className="inline-flex items-center gap-2.5 bg-[#FFB020] text-[#18181B] font-semibold text-base sm:text-lg px-8 py-4 rounded-full shadow-md shadow-[#FFB020]/20 hover:brightness-105 transition-all"
              >
                <span>Book a free call with {FOUNDER_FIRST_NAME}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
