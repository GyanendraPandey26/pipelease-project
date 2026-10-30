import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PhoneCall, ShieldCheck, CalendarCheck, FileEdit } from 'lucide-react';

interface ChangeCard {
  id: string;
  problemHeading: string;
  whatChanges: string;
  icon: typeof PhoneCall;
}

const cards: ChangeCard[] = [
  {
    id: '1',
    problemHeading: 'Your phone rings at night while you try to rest',
    whatChanges: 'Every late call is answered immediately. You get your evenings back while emergencies get handled and logged.',
    icon: PhoneCall,
  },
  {
    id: '2',
    problemHeading: 'You lose emergency callers to competing local plumbers',
    whatChanges: 'Callers learn your service area and call out fee right away. Qualified homeowners lock in with you instead of calling the next shop on Google.',
    icon: ShieldCheck,
  },
  {
    id: '3',
    problemHeading: 'Your dispatch board stays empty until morning',
    whatChanges: 'Appointments drop straight into your calendar with complete customer details, address, and repair notes. Your crew starts morning runs ready.',
    icon: CalendarCheck,
  },
  {
    id: '4',
    problemHeading: 'You worry about robotic or inaccurate answers',
    whatChanges: 'We write the exact answers with you. The voice agent speaks with your tone, knows your exact towns, and follows your dispatch rules.',
    icon: FileEdit,
  },
];

export const WhatChanges: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="what-changes" className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-[1.15] mb-4">
              What changes for your plumbing business
            </h2>
            <p className="text-base sm:text-lg text-[#18181B]/75 font-normal">
              You stop losing jobs when your office closes and you stop answering phone calls during dinner.
            </p>
          </motion.div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
              className="bg-white rounded-[24px] p-7 sm:p-9 shadow-sm border border-black/[0.06] flex flex-col justify-between transition-all"
            >
              <div>
                {/* Big icon in a rounded highlight tile */}
                <div className="w-14 h-14 rounded-[18px] bg-[#FFB020] flex items-center justify-center text-[#18181B] mb-6 shadow-sm">
                  <card.icon className="w-7 h-7 stroke-[2.2]" />
                </div>

                {/* Card Heading starting with You or Your */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#18181B] tracking-tight leading-snug mb-3">
                  {card.problemHeading}
                </h3>

                {/* What changes for you */}
                <p className="text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal">
                  {card.whatChanges}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
