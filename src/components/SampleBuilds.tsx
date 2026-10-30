import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PhoneCall, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface SampleBuildItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  whatYouGet: string;
  whatChangesForYou: string;
  notification: {
    icon: typeof PhoneCall;
    title: string;
    detail: string;
  };
}

const builds: SampleBuildItem[] = [
  {
    id: '1',
    imageSrc: '/work-1.jpg',
    imageAlt: 'Plumbing office coordinator smiling at phone at front desk',
    title: 'After-Hours Voice Pickup',
    whatYouGet: 'An AI voice agent connected to your office number that answers every ring after closing time with clear, natural speech.',
    whatChangesForYou: 'Your office staff leaves at five without forwarding calls to their personal phones. Every evening call gets picked up right away.',
    notification: {
      icon: PhoneCall,
      title: 'Call answered after hours',
      detail: 'Burst pipe repair request captured and dispatched.',
    },
  },
  {
    id: '2',
    imageSrc: '/work-2.jpg',
    imageAlt: 'Plumbing business contractor glancing at smartphone in service shop',
    title: 'Service Area and Fee Screening',
    whatYouGet: 'Automated verification of the caller zip code against your coverage zones and upfront explanation of your call out fee.',
    whatChangesForYou: 'You stop driving across town for out-of-zone calls or arguing about trip fees. Only paying customers in your service area get booked.',
    notification: {
      icon: MapPin,
      title: 'Zone and fee verified',
      detail: 'Coverage confirmed. Customer accepted emergency fee.',
    },
  },
  {
    id: '3',
    imageSrc: '/work-3.jpg',
    imageAlt: 'Customer smiling outside residential home with smartphone in hand',
    title: 'Direct Calendar Booking',
    whatYouGet: 'Live calendar sync that reserves open dispatch slots in real time and sends confirmation text messages to the homeowner.',
    whatChangesForYou: 'You wake up to locked-in morning jobs. Customers know a technician is on the way and do not look for another plumber.',
    notification: {
      icon: Calendar,
      title: 'Morning job locked in',
      detail: 'Dispatch slot reserved with address and repair notes.',
    },
  },
];

const SampleBuildRow: React.FC<{ item: SampleBuildItem; index: number }> = ({ item, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isImageRight = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Photo drifts a little slower than page as you scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
        isImageRight ? '' : ''
      }`}
    >
      {/* Content Column */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55 }}
        className={`lg:col-span-6 flex flex-col justify-center ${
          isImageRight ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Sample build label */}
        <span className="text-xs font-semibold tracking-wider uppercase text-[#18181B]/60 mb-2">
          Sample build
        </span>

        {/* Title */}
        <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#18181B] tracking-tight mb-6">
          {item.title}
        </h3>

        {/* Two parts headed exactly 'What you get' and 'What changes for you' */}
        <div className="space-y-6 bg-white rounded-[24px] p-6 sm:p-8 border border-black/[0.06] shadow-sm">
          <div>
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#18181B] mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#18181B]" />
              <span>What you get</span>
            </h4>
            <p className="text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal">
              {item.whatYouGet}
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.08]">
            <h4 className="font-heading font-bold text-base sm:text-lg text-[#18181B] mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#18181B]" />
              <span>What changes for you</span>
            </h4>
            <p className="text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal">
              {item.whatChangesForYou}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Image Column */}
      <div
        className={`lg:col-span-6 relative ${
          isImageRight ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Photo soft wipe reveal and drift */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }
              : { opacity: 0, clipPath: 'inset(10% 0% 10% 0%)' }
          }
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[24px] overflow-hidden shadow-md bg-[#18181B]/5 aspect-[3/2] w-full"
        >
          <motion.img
            src={item.imageSrc}
            alt={item.imageAlt}
            width={600}
            height={400}
            style={shouldReduceMotion ? {} : { y: imageY }}
            className="w-full h-full object-cover rounded-[24px] scale-105"
            loading="lazy"
          />

          {/* Coded phone notification overlapping corner */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.3 }}
            className={`absolute bottom-4 sm:bottom-6 ${
              isImageRight ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
            } max-w-[280px] sm:max-w-[320px] bg-[#18181B]/95 text-white backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-white/15`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFB020] text-[#18181B] flex items-center justify-center shrink-0">
                <item.notification.icon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white tracking-tight truncate">
                  {item.notification.title}
                </div>
                <div className="text-[11px] text-white/70 leading-snug mt-0.5">
                  {item.notification.detail}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const SampleBuilds: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="sample-builds" className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B] border-t border-black/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-[1.15] mb-4">
              Built for your after-hours dispatch
            </h2>
            <p className="text-base sm:text-lg text-[#18181B]/75 font-normal">
              See what we set up on your office phone and how each part answers your night callers.
            </p>
          </motion.div>
        </div>

        {/* Rows */}
        <div className="space-y-16 sm:space-y-24">
          {builds.map((build, index) => (
            <SampleBuildRow key={build.id} item={build} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
