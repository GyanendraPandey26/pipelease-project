import React from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { WhatChanges } from './components/WhatChanges';
import { SampleBuilds } from './components/SampleBuilds';
import { MissedCallsCalculator } from './components/MissedCallsCalculator';
import { HowItWorks } from './components/HowItWorks';
import { Founder } from './components/Founder';
import { FreeAuditCallPanel } from './components/FreeAuditCallPanel';
import { Questions } from './components/Questions';
import { Closing } from './components/Closing';
import { StickyMobileBar } from './components/StickyMobileBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#18181B] selection:bg-[#FFB020] selection:text-[#18181B] flex flex-col font-body pb-16 md:pb-0">
      {/* 1. Top bar */}
      <TopBar />

      <main className="flex-1">
        {/* 2. Hero on the dark colour */}
        <Hero />

        {/* 3. Marquee: two full-width rows */}
        <Marquee />

        {/* 4. What changes for you */}
        <WhatChanges />

        {/* 5. Sample builds */}
        <SampleBuilds />

        {/* 6. Proof: What missed appointments cost you */}
        <MissedCallsCalculator />

        {/* 7. How it works */}
        <HowItWorks />

        {/* 8. Founder */}
        <Founder />

        {/* 9. Free audit call, on the dark colour */}
        <FreeAuditCallPanel />

        {/* 10. Questions */}
        <Questions />

        {/* 11. Closing & Footer */}
        <Closing />
      </main>

      {/* Sticky mobile bar on phone */}
      <StickyMobileBar />
    </div>
  );
}
