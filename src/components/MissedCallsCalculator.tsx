import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Calculator, AlertCircle } from 'lucide-react';
import { BOOKING_URL } from '../constants';

function useAnimatedNumber(target: number, duration: number = 400, shouldReduce: boolean | null = false) {
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (shouldReduce) {
      setCurrent(target);
      return;
    }

    const startVal = current;
    const diff = target - startVal;
    if (diff === 0) return;

    const startTime = performance.now();
    let frameId: number;

    const step = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.round(startVal + diff * ease));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldReduce]);

  return current;
}

export const MissedCallsCalculator: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Round example values
  const [customersPerMonth, setCustomersPerMonth] = useState(120);
  const [missedShare, setMissedShare] = useState(15);
  const [averageBill, setAverageBill] = useState(450);

  // Math
  const monthlyLossExact = Math.round(customersPerMonth * (missedShare / 100) * averageBill);
  const annualLossExact = monthlyLossExact * 12;

  const animatedMonthlyLoss = useAnimatedNumber(monthlyLossExact, 350, shouldReduceMotion);
  const animatedAnnualLoss = useAnimatedNumber(annualLossExact, 350, shouldReduceMotion);

  return (
    <section id="cost-calculator" className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B] border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Headed exactly 'What missed appointments cost you' */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-[1.15] mb-4">
              What missed appointments cost you
            </h2>
            <p className="text-base sm:text-lg text-[#18181B]/75 font-normal">
              When callers reach voicemail after hours, they dial the next plumbing contractor. Slide the numbers below to see what slipping calls cost your business.
            </p>
          </motion.div>
        </div>

        {/* Calculator Container */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[24px] p-6 sm:p-10 lg:p-12 shadow-sm border border-black/[0.08]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Sliders */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-2 pb-2 border-b border-black/[0.08]">
                <Calculator className="w-5 h-5 text-[#18181B]" />
                <span className="font-heading font-bold text-base uppercase tracking-wider text-[#18181B]">
                  Your numbers
                </span>
              </div>

              {/* Slider 1: Customers a month */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="customers-slider" className="text-sm sm:text-base font-semibold text-[#18181B]">
                    Customers a month
                  </label>
                  <span className="font-heading font-bold text-lg sm:text-xl text-[#18181B] px-3 py-1 bg-[#18181B]/5 rounded-lg">
                    {customersPerMonth}
                  </span>
                </div>
                <input
                  id="customers-slider"
                  type="range"
                  min="20"
                  max="400"
                  step="5"
                  value={customersPerMonth}
                  onChange={(e) => setCustomersPerMonth(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#FFB020] focus:outline-none"
                />
                <div className="flex justify-between text-xs text-[#18181B]/50 mt-1">
                  <span>20</span>
                  <span>400</span>
                </div>
              </div>

              {/* Slider 2: Share who miss their appointment */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="share-slider" className="text-sm sm:text-base font-semibold text-[#18181B]">
                    Share who miss their appointment
                  </label>
                  <span className="font-heading font-bold text-lg sm:text-xl text-[#18181B] px-3 py-1 bg-[#18181B]/5 rounded-lg">
                    {missedShare}%
                  </span>
                </div>
                <input
                  id="share-slider"
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={missedShare}
                  onChange={(e) => setMissedShare(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#FFB020] focus:outline-none"
                />
                <div className="flex justify-between text-xs text-[#18181B]/50 mt-1">
                  <span>5%</span>
                  <span>45%</span>
                </div>
              </div>

              {/* Slider 3: Average bill */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="bill-slider" className="text-sm sm:text-base font-semibold text-[#18181B]">
                    Average bill
                  </label>
                  <span className="font-heading font-bold text-lg sm:text-xl text-[#18181B] px-3 py-1 bg-[#18181B]/5 rounded-lg">
                    ${averageBill}
                  </span>
                </div>
                <input
                  id="bill-slider"
                  type="range"
                  min="150"
                  max="1200"
                  step="25"
                  value={averageBill}
                  onChange={(e) => setAverageBill(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#FFB020] focus:outline-none"
                />
                <div className="flex justify-between text-xs text-[#18181B]/50 mt-1">
                  <span>$150</span>
                  <span>$1,200</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Money Lost */}
            <div className="lg:col-span-5 bg-[#18181B] text-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-white/60 mb-1">
                  Estimated money lost
                </div>

                {/* Monthly Loss */}
                <div className="py-4 border-b border-white/10">
                  <div className="text-xs sm:text-sm text-white/70 mb-1">Money lost a month</div>
                  <div className="font-heading font-bold text-3xl sm:text-4xl text-[#FFB020] tracking-tight">
                    ${animatedMonthlyLoss.toLocaleString()}
                  </div>
                </div>

                {/* Yearly Loss */}
                <div className="py-4">
                  <div className="text-xs sm:text-sm text-white/70 mb-1">Money lost a year</div>
                  <div className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                    ${animatedAnnualLoss.toLocaleString()}
                  </div>
                </div>

                {/* Under the result note */}
                <div className="pt-2 flex items-start gap-2 text-xs sm:text-sm text-white/70 font-normal">
                  <AlertCircle className="w-4 h-4 text-[#FFB020] shrink-0 mt-0.5" />
                  <span>Your estimate. We go through it on the free audit call.</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="mt-8 pt-4">
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FFB020] text-[#18181B] font-semibold text-base py-3.5 px-6 rounded-full shadow-md shadow-[#FFB020]/20 hover:brightness-105 transition-all text-center"
                >
                  <span>Book a free audit call</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
