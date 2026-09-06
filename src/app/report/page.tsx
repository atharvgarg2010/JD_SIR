"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAssessment } from "@/context/AssessmentContext";
import { calculatePersonality, PersonalityProfile } from "@/lib/engine";
import UnlockModal from "@/components/UnlockModal";
import { motion } from "framer-motion";

export default function ReportPage() {
  const { answers } = useAssessment();
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

  useEffect(() => {
    // Calculate the personality using the deterministic engine based on answers
    const calculatedProfile = calculatePersonality(answers);
    setProfile(calculatedProfile);
  }, [answers]);

  if (!profile) return null; // or a loading skeleton

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans">
      <header className="w-full h-20 flex items-center px-5 lg:px-10 max-w-[1200px] mx-auto justify-between">
        <Link href="/" className="flex items-center gap-2 text-on-surface group">
          <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">fingerprint</span>
          </span>
          <span className="font-heading text-2xl tracking-tight font-medium">YOUR BRAND</span>
        </Link>
        <button 
          onClick={() => setIsUnlockModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary rounded-xl font-sans font-semibold text-sm hover:bg-primary-container hover:text-primary transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">lock_open</span>
          <span className="hidden sm:inline">Unlock Insights</span>
        </button>
      </header>

      <main className="flex-1 w-full pb-24">
        {/* STAGE 4: PERSONALITY REVEAL - HERO MOMENT */}
        <section className="w-full py-16 px-5 lg:px-10 max-w-[960px] mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-2 inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              Assessment Complete
            </span>
            <h1 className="font-heading text-4xl md:text-5xl text-on-surface font-semibold tracking-tight">
              Your Profile Is Ready.
            </h1>
            <p className="font-sans text-[15px] text-on-surface-variant mt-3">
              Based on your situational telemetry, here is your primary psychometric classification.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col gap-12 border border-[#eae8e3]"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="flex-1">
                <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest block mb-2">
                  Primary Archetype • {profile.archetypeId}
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-on-surface font-semibold tracking-tight leading-none mb-4">
                  {profile.primaryArchetype.split(" ")[0]} <span className="text-primary-container">{profile.primaryArchetype.split(" ")[1] || ""} {profile.primaryArchetype.split(" ")[2] || ""}</span>
                </h2>
                <p className="font-sans text-[16px] text-on-surface-variant leading-relaxed max-w-[560px]">
                  {profile.subtitle}
                </p>

                {/* Trait Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  {profile.traits.map((trait, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-full bg-surface-container-low border border-[#eae8e3] text-on-surface font-sans text-[13px] font-medium">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Visual Monogram */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-container-low flex flex-col items-center justify-center text-center p-4 shadow-sm self-center md:self-start"
              >
                <span className="material-symbols-outlined text-primary text-[48px] mb-1">explore</span>
                <span className="font-sans text-[11px] font-bold text-on-surface uppercase tracking-widest">Type IV</span>
                <span className="font-sans text-[11px] text-secondary mt-1">SE-Index: 88.4</span>
              </motion.div>
            </div>

            {/* Narrative Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#fdfdfc] border border-[#eae8e3] rounded-2xl p-6"
            >
              <h4 className="font-sans font-semibold text-lg text-on-surface mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                <span>Diagnostic Summary</span>
              </h4>
              <p className="font-sans text-[15px] text-on-surface-variant leading-relaxed">
                {profile.description}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* STAGE 5: DIMENSIONS & PAYWALL */}
        <section className="w-full py-12 px-5 lg:px-10 max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Dimensional Gauges */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#eae8e3]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans font-semibold text-xl text-on-surface">Dimensional Telemetry</h3>
                  <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest">Normalized</span>
                </div>
                
                {profile.dimensions.map((dim, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 mb-6 last:mb-0">
                    <div className="flex items-center justify-between text-on-surface font-sans text-[13px]">
                      <span className="font-semibold">{dim.name}</span>
                      <span className="font-sans font-bold text-[15px] text-on-surface">
                        {dim.score}% <span className="font-sans text-[11px] font-normal text-secondary">{dim.label}</span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${dim.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.2 }}
                        className={`h-full ${dim.colorClass} rounded-full`} 
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-sans font-medium text-secondary mt-1">
                      <span>{dim.leftLabel}</span>
                      <span>{dim.rightLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Paywall Overlay */}
            <div className="lg:col-span-7 flex flex-col relative">
              
              {/* Blurred content behind paywall */}
              <div className="flex flex-col gap-6 filter blur-[6px] select-none opacity-40 pointer-events-none">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#eae8e3]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-sans text-[13px] font-bold text-primary">01</span>
                    <h3 className="font-heading text-2xl text-on-surface font-medium">How You Think</h3>
                  </div>
                  <div className="h-4 bg-surface-container rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-surface-container rounded-md w-11/12 mb-2"></div>
                  <div className="h-4 bg-surface-container rounded-md w-4/5"></div>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#eae8e3]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-sans text-[13px] font-bold text-primary">02</span>
                    <h3 className="font-heading text-2xl text-on-surface font-medium">How You Connect</h3>
                  </div>
                  <div className="h-4 bg-surface-container rounded-md w-full mb-2"></div>
                  <div className="h-4 bg-surface-container rounded-md w-10/12"></div>
                </div>
              </div>

              {/* Paywall Action Box */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-[480px] text-center border border-[#eae8e3]">
                  <span className="material-symbols-outlined text-primary text-[40px] mb-4">lock</span>
                  <h3 className="font-heading text-2xl text-on-surface font-semibold mb-3">Unlock Your Full Blueprint</h3>
                  <p className="font-sans text-[14px] text-on-surface-variant mb-8">
                    Discover how you make decisions, your relational tendencies, cognitive blindspots, and gain access to your personalized interactive AI Q&A.
                  </p>
                  <button 
                    onClick={() => setIsUnlockModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-container hover:bg-primary text-on-primary font-sans font-semibold text-[15px] rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Unlock Full Profile</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <UnlockModal isOpen={isUnlockModalOpen} onClose={() => setIsUnlockModalOpen(false)} />
    </div>
  );
}
