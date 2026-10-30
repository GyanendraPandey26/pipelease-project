import React, { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { WHO_I_HELP, CITY } from '../constants';

export const Marquee: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const row1Items = [
    'The After Hours Answer Fix',
    'Instant Call Pickup',
    'Service Area and Call Out Fee Quotes',
    'Direct Calendar Booking',
    'Custom Answers Written With You',
  ];

  const row2Items = [
    `FOR ${WHO_I_HELP.toUpperCase()}`,
    CITY.toUpperCase(),
    'RUNS ON YOUR WHATSAPP',
  ];

  // Repeat for continuous loop
  const repeatedRow1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const repeatedRow2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const animationSpeed1 = isHovered ? '80s' : '32s';
  const animationSpeed2 = isHovered ? '90s' : '36s';

  return (
    <section
      className="relative w-full overflow-hidden bg-[#18181B] border-y border-white/10 py-6 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--speed-1) linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right var(--speed-2) linear infinite;
        }
      `}</style>

      {/* Row 1: Things I set up, bold in white, heading font */}
      <div className="flex overflow-hidden w-full whitespace-nowrap mb-4">
        <div
          className={`flex items-center shrink-0 ${shouldReduceMotion ? '' : 'animate-marquee-left'}`}
          style={{ '--speed-1': animationSpeed1 } as React.CSSProperties}
        >
          {repeatedRow1.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white px-5 sm:px-8">
                {item}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB020] shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Audience, City, Runs on WhatsApp, body font, uppercase, wide letter spacing */}
      <div className="flex overflow-hidden w-full whitespace-nowrap">
        <div
          className={`flex items-center shrink-0 ${shouldReduceMotion ? '' : 'animate-marquee-right'}`}
          style={{ '--speed-2': animationSpeed2 } as React.CSSProperties}
        >
          {repeatedRow2.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] text-white/60 font-semibold px-6 sm:px-10 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020] shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
