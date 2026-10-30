import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WHO_I_HELP, CITY } from '../constants';

interface QuestionItem {
  id: string;
  question: string;
  answer: string;
}

const questionsData: QuestionItem[] = [
  {
    id: 'who-for',
    question: 'Who is this for?',
    answer: `It is built for ${WHO_I_HELP.toLowerCase()} in ${CITY} who want to stop losing jobs after office hours and stop evening phone calls.`,
  },
  {
    id: 'cost',
    question: 'What does it cost?',
    answer: 'It depends on your business. You get a plan and a clear price on the free audit call.',
  },
  {
    id: 'what-we-set-up',
    question: 'What do we set up for your business?',
    answer: 'We set up The After Hours Answer Fix for plumbing companies: an AI voice agent that picks up every call after your office closes, says your service area and call out fee, and books the job into your calendar. We write the answers with you.',
  },
  {
    id: 'how-to-start',
    question: 'How do you get started?',
    answer: 'Book a free audit call. We walk through your after-hours setup together and map out your AI plan.',
  },
];

export const Questions: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(questionsData[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="questions" className="py-20 sm:py-28 bg-[#F6F5F1] text-[#18181B] border-t border-black/[0.05]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-12 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#18181B] tracking-tight leading-[1.15] mb-4">
              Questions you may have
            </h2>
            <p className="text-base sm:text-lg text-[#18181B]/75 font-normal">
              Clear answers about what we set up and how we work with your plumbing business.
            </p>
          </motion.div>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {questionsData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-[24px] border border-black/[0.06] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB020]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-lg sm:text-xl text-[#18181B] tracking-tight">
                    {item.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#FFB020] text-[#18181B] rotate-180' : 'bg-black/[0.04] text-[#18181B]/70'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-1 text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal border-t border-black/[0.04]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
