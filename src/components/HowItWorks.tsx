import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CalendarCheck, ClipboardList, Smartphone } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: typeof CalendarCheck;
}

const steps: Step[] = [
  {
    number: '1',
    title: 'Book your free audit call',
    description: 'Pick a time on our calendar. We review how your plumbing office handles evening calls and where you lose customers today.',
    icon: CalendarCheck,
  },
  {
    number: '2',
    title: 'Get your plan',
    description: 'We map your service territory, your call out fee rules, and your dispatch schedule into an exact AI setup plan.',
    icon: ClipboardList,
  },
  {
    number: '3',
    title: 'We set it up on your WhatsApp',
    description: 'We connect the voice agent to your phone lines and WhatsApp. Calls get answered instantly and appointments drop into your calendar.',
    icon: Smartphone,
  },
];

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="how-it-works" ref={containerRef} className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B] border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-[1.15] mb-4">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-[#18181B]/75 font-normal">
              Three simple steps to stop losing evening calls and keep your schedule full.
            </p>
          </motion.div>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Desktop connecting highlight line */}
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-1 bg-black/10 z-0">
            <motion.div
              style={shouldReduceMotion ? { width: '100%' } : { width: lineHeight }}
              className="h-full bg-[#FFB020] origin-left"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.15,
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="bg-white rounded-[24px] p-7 sm:p-8 border border-black/[0.06] shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Step number inside highlight tile */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-[16px] bg-[#FFB020] text-[#18181B] font-heading font-bold text-lg flex items-center justify-center shadow-sm">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center text-[#18181B]/70">
                      <step.icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#18181B] tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
