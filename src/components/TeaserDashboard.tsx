"use client";

import { useAssessment } from "@/context/AssessmentContext";
import { calculatePersonality, PersonalityProfile } from "@/lib/engine";
import { useEffect, useState } from "react";
import Link from "next/link";
import FreeQuestionHook from "./FreeQuestionHook";

interface TeaserDashboardProps {
  onUnlock?: () => void;
}

export default function TeaserDashboard({ onUnlock }: TeaserDashboardProps) {
  const { answers } = useAssessment();
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);

  useEffect(() => {
    // We calculate it client-side just like the report page currently does.
    const calculatedProfile = calculatePersonality(answers);
    setProfile(calculatedProfile);
  }, [answers]);

  if (!profile) return null;

  return (
    <div className="w-full flex flex-col gap-12">
      
      {/* Header Profile Taste */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-surface-container-low flex flex-col items-center justify-center shrink-0 shadow-sm border border-[#eae8e3]">
          <span className="material-symbols-outlined text-primary text-[56px] mb-2">explore</span>
          <span className="font-sans text-[11px] font-bold text-on-surface uppercase tracking-widest">{profile.archetypeId}</span>
        </div>
        <div className="text-center md:text-left flex flex-col gap-3">
          <span className="font-sans text-xs font-bold text-primary uppercase tracking-widest block">Primary Archetype Discovered</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-on-surface leading-tight">
            {profile.primaryArchetype}
          </h2>
          <p className="font-sans text-[15px] text-on-surface-variant max-w-2xl leading-relaxed">
            {profile.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
            {profile.traits.map((trait, idx) => (
              <span key={idx} className="px-3.5 py-1.5 rounded-full bg-surface-container border border-[#eae8e3] text-on-surface font-sans text-[13px] font-medium">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-surface-variant/30 w-full"></div>

      {/* Free Diagnostic Content (Gauges) */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#eae8e3]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-heading text-2xl font-semibold text-on-surface">Foundational Telemetry</h3>
          <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full">Free Analysis</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.dimensions.slice(0, 4).map((dim, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-on-surface font-sans text-[14px]">
                <span className="font-semibold">{dim.name}</span>
                <span className="font-sans font-bold text-[15px] text-on-surface">
                  {dim.score}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden relative">
                <div 
                  className={`h-full ${dim.colorClass} rounded-full`} 
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-sans font-medium text-secondary mt-1">
                <span>{dim.leftLabel}</span>
                <span>{dim.rightLabel}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="font-sans text-[13px] text-on-surface-variant mt-8 leading-relaxed border-t border-surface-variant/30 pt-6">
          {profile.description}
        </p>
      </div>

      <div className="h-px bg-surface-variant/30 w-full"></div>

      {/* The Blurred Tease */}
      <div className="relative">
        
        {/* Fake content that gets blurred */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30 blur-[6px] select-none pointer-events-none">
          <div className="bg-white rounded-3xl p-8 border border-surface-variant">
            <h3 className="font-heading text-xl font-semibold mb-4">Cognitive Blindspots</h3>
            <div className="space-y-3">
              <div className="h-4 bg-surface-variant/50 rounded-full w-full"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-5/6"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-4/6"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-surface-variant">
            <h3 className="font-heading text-xl font-semibold mb-4">Career Vectors</h3>
            <div className="space-y-3">
              <div className="h-4 bg-surface-variant/50 rounded-full w-full"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-[90%]"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-[70%]"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-surface-variant md:col-span-2">
            <h3 className="font-heading text-xl font-semibold mb-4">JD SIR Strategic Analysis</h3>
            <div className="space-y-3">
              <div className="h-4 bg-surface-variant/50 rounded-full w-full"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-full"></div>
              <div className="h-4 bg-surface-variant/50 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-[32px]">lock</span>
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-on-surface mb-3">
            Unlock Your Deep-Dive Telemetry
          </h3>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-md mb-8">
            Access your cognitive blindspots, career positioning vectors, relationship dynamics, and the permanent interactive AI dashboard.
          </p>
          <button 
            onClick={onUnlock}
            className="flex items-center gap-3 px-8 py-4 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-base rounded-xl shadow-xl transition-all transform hover:-translate-y-1"
          >
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
            Unlock Premium Report
          </button>
        </div>
      </div>

      {/* The One-Question Hook */}
      <FreeQuestionHook onUnlock={onUnlock} />

      <div className="mt-8 text-center pb-8">
        <Link href="/" className="font-sans text-sm font-semibold text-secondary hover:text-on-surface transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Home
        </Link>
      </div>

    </div>
  );
}
