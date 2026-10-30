import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Phone, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { BOOKING_URL, WHO_I_HELP, CITY } from '../constants';

interface ChatMessage {
  id: string;
  sender: 'caller' | 'agent';
  text: string;
  time: string;
}

interface SetupTab {
  id: string;
  label: string;
  icon: typeof Phone;
  messages: ChatMessage[];
}

const setupTabs: SetupTab[] = [
  {
    id: 'pickup',
    label: 'Night Pickup',
    icon: Phone,
    messages: [
      { id: '1', sender: 'caller', text: 'Hi, our pipe burst and water is leaking across the kitchen floor.', time: 'Just now' },
      { id: '2', sender: 'agent', text: 'Hello, this is the after-hours dispatch for your local plumber. We pick up night calls immediately. What is your street?', time: 'Just now' },
      { id: '3', sender: 'caller', text: 'Oak Ridge Lane.', time: 'Just now' },
    ],
  },
  {
    id: 'area-fee',
    label: 'Area & Fee',
    icon: ShieldCheck,
    messages: [
      { id: '1', sender: 'agent', text: 'Oak Ridge Lane is in our primary service zone. Our after-hours emergency call out fee is standard and clear.', time: 'Just now' },
      { id: '2', sender: 'caller', text: 'That works. Can a technician dispatch tonight?', time: 'Just now' },
      { id: '3', sender: 'agent', text: 'Yes, our on-call plumber is on the road with a stocked service van.', time: 'Just now' },
    ],
  },
  {
    id: 'calendar',
    label: 'Calendar Booking',
    icon: Calendar,
    messages: [
      { id: '1', sender: 'caller', text: 'Please book the dispatch slot for tonight.', time: 'Just now' },
      { id: '2', sender: 'agent', text: 'Done. Your emergency repair is locked into our live calendar for tonight.', time: 'Just now' },
      { id: '3', sender: 'agent', text: 'Your technician received your address and problem details. We sent a text to confirm.', time: 'Just now' },
    ],
  },
  {
    id: 'answers',
    label: 'Custom Answers',
    icon: Sparkles,
    messages: [
      { id: '1', sender: 'caller', text: 'Do your plumbers carry tankless water heater parts on night runs?', time: 'Just now' },
      { id: '2', sender: 'agent', text: 'Yes. We carry certified replacement valves, sensors, and fittings for all major heater brands.', time: 'Just now' },
      { id: '3', sender: 'caller', text: 'Perfect. You saved us a massive headache.', time: 'Just now' },
    ],
  },
];

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [visibleMessagesCount, setVisibleMessagesCount] = useState(1);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const activeTab = setupTabs[activeTabIdx];

  // Auto-switch tabs if user hasn't clicked one
  useEffect(() => {
    if (userInteracted || shouldReduceMotion) return;

    autoAdvanceRef.current = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % setupTabs.length);
      setVisibleMessagesCount(1);
    }, 6500);

    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [userInteracted, shouldReduceMotion]);

  // Progressive message reveal in chat
  useEffect(() => {
    setVisibleMessagesCount(1);
    if (shouldReduceMotion) {
      setVisibleMessagesCount(activeTab.messages.length);
      return;
    }

    const t1 = setTimeout(() => setVisibleMessagesCount(2), 700);
    const t2 = setTimeout(() => setVisibleMessagesCount(3), 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeTabIdx, shouldReduceMotion, activeTab.messages.length]);

  const handleTabClick = (idx: number) => {
    setUserInteracted(true);
    setActiveTabIdx(idx);
    setVisibleMessagesCount(1);
  };

  const headlineWords = "Stop losing night calls when your plumbing office closes".split(" ");

  return (
    <section className="relative overflow-hidden bg-[#18181B] text-white pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Drifting highlight glow */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            x: ['-10%', '15%', '-5%'],
            y: ['0%', '15%', '0%'],
            opacity: [0.18, 0.28, 0.18],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#FFB020] blur-[140px] pointer-events-none"
        />
      )}
      <div className="absolute top-1/2 right-0 w-[420px] h-[420px] rounded-full bg-[#FFB020]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Audience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-white/90 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFB020] animate-pulse" />
              <span>For {WHO_I_HELP} in {CITY}</span>
            </div>

            {/* Rising Headline word by word */}
            <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-6">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : i * 0.05,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* One plain sentence under it */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mb-8 font-normal">
              We set up an AI voice agent that picks up every call after your office closes, says your service area and call out fee, and books the job into your calendar.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98, y: 0 }}
                className="inline-flex items-center justify-center gap-2.5 bg-[#FFB020] text-[#18181B] font-semibold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg shadow-[#FFB020]/25 hover:brightness-105 transition-all text-center"
              >
                <span>Book a free audit call</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </motion.a>
            </div>

            {/* Small reassurance line */}
            <p className="text-xs sm:text-sm text-white/60 mt-4 leading-normal">
              Free 1:1 call. You leave with a plan to grow your plumbing business with AI.
            </p>
          </div>

          {/* Right Column: Phone Mockup showing WhatsApp chat */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full max-w-[325px] sm:max-w-[390px] rounded-[36px] p-3 sm:p-4 bg-[#27272A] border border-white/20 shadow-2xl shadow-black/60 relative">
              {/* Phone speaker & camera notch */}
              <div className="flex justify-center mb-2">
                <div className="w-20 h-4 bg-[#18181B] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/10 mr-2" />
                  <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>
              </div>

              {/* WhatsApp App Mockup Container */}
              <div className="bg-[#0b141a] rounded-[26px] overflow-hidden border border-white/10 flex flex-col h-[460px] sm:h-[490px]">
                {/* WhatsApp Header */}
                <div className="bg-[#1f2c34] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FFB020] flex items-center justify-center text-[#18181B] font-bold text-sm">
                      P
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white tracking-tight">Rapid Rooter Dispatch</div>
                      <div className="text-[11px] text-[#25D366] flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                        Online Voice Agent
                      </div>
                    </div>
                  </div>
                </div>

                {/* Setup Tabs selector inside phone */}
                <div className="bg-[#111b21] p-2 border-b border-white/10 grid grid-cols-2 gap-1.5">
                  {setupTabs.map((tab, idx) => {
                    const isActive = idx === activeTabIdx;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabClick(idx)}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-[#FFB020] text-[#18181B] font-semibold'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <tab.icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#18181B]' : 'text-[#FFB020]'}`} />
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* WhatsApp Chat Body */}
                <div className="flex-1 p-3.5 flex flex-col justify-end space-y-2.5 overflow-hidden bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                  <AnimatePresence mode="popLayout">
                    {activeTab.messages.slice(0, visibleMessagesCount).map((msg) => {
                      const isCaller = msg.sender === 'caller';
                      return (
                        <motion.div
                          key={`${activeTab.id}-${msg.id}`}
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col max-w-[85%] ${
                            isCaller
                              ? 'self-start items-start'
                              : 'self-end items-end'
                          }`}
                        >
                          <div
                            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                              isCaller
                                ? 'bg-[#202c33] text-white rounded-tl-sm'
                                : 'bg-[#005c4b] text-white rounded-tr-sm'
                            }`}
                          >
                            <p className="text-white/95">{msg.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/50">
                              <span>{msg.time}</span>
                              {!isCaller && <Check className="w-3 h-3 text-[#53bdeb]" />}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Chat Footer Mock */}
                <div className="bg-[#1f2c34] px-3 py-2.5 flex items-center justify-between text-xs text-white/40">
                  <span className="truncate">Automated booking recorded in calendar</span>
                  <div className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                </div>
              </div>
            </div>

            {/* Small caption under phone */}
            <p className="text-xs text-white/50 mt-3 font-medium tracking-wide">
              Example chat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
