"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProcessingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Simulate processing steps
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => {
      router.push("/report");
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center py-24 px-5">
      <div className="max-w-[560px] w-full bg-white rounded-3xl p-12 shadow-sm text-center flex flex-col items-center border border-[#eae8e3]">
        
        {/* Architectural Concentric Telemetry Pulse SVG */}
        <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#ece7e5" strokeWidth="2"></circle>
            <circle 
              cx="50" cy="50" r="44" fill="none" stroke="#b82e25" 
              strokeWidth="2.5" strokeLinecap="round" 
              strokeDasharray="276" strokeDashoffset="65" 
              className="animate-spin" style={{ animationDuration: "3s" }}
            ></circle>
            <circle cx="50" cy="50" r="32" fill="none" stroke="#e6e2df" strokeWidth="1.5" strokeDasharray="8 6"></circle>
            <circle cx="50" cy="50" r="18" fill="none" stroke="#961310" strokeWidth="1.5" opacity="0.4"></circle>
            <circle cx="50" cy="50" r="5" fill="#1A1918"></circle>
          </svg>
          <span className="material-symbols-outlined text-primary text-[24px] absolute">tune</span>
        </div>

        <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-2 block">
          Telemetry Analysis
        </span>
        <h2 className="font-heading text-3xl text-on-surface font-semibold tracking-tight mb-3">
          Your profile is coming together.
        </h2>
        <p className="font-sans text-[15px] text-on-surface-variant max-w-[440px] mb-12">
          We’re cross-referencing your patterns across 12 responses against established behavioural spectra to construct something uniquely yours.
        </p>

        {/* Live Pipeline Indicators */}
        <div className="w-full bg-[#fdfdfc] border border-[#eae8e3] rounded-2xl p-6 flex flex-col gap-4 text-left">
          
          <div className="flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-3">
              {step >= 0 ? (
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              ) : (
                <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin ml-0.5"></span>
              )}
              <span className="font-sans text-[14px] font-medium">Synthesizing cognitive style...</span>
            </div>
            {step >= 0 ? (
              <span className="font-sans text-[11px] text-primary uppercase font-bold tracking-wide">Done</span>
            ) : (
              <span className="font-sans text-[11px] text-secondary uppercase font-bold tracking-wide">In Progress</span>
            )}
          </div>

          <div className="flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-3">
              {step >= 1 ? (
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              ) : step === 0 ? (
                <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin ml-0.5"></span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-surface-container ml-0.5"></span>
              )}
              <span className={`font-sans text-[14px] font-medium ${step < 1 ? 'text-on-surface-variant' : ''}`}>Mapping dimensional polarities...</span>
            </div>
            {step >= 1 ? (
              <span className="font-sans text-[11px] text-primary uppercase font-bold tracking-wide">Done</span>
            ) : step === 0 ? (
              <span className="font-sans text-[11px] text-secondary uppercase font-bold tracking-wide">In Progress</span>
            ) : null}
          </div>

          <div className="flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-3">
              {step >= 2 ? (
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
              ) : step === 1 ? (
                <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin ml-0.5"></span>
              ) : (
                <span className="w-4 h-4 rounded-full bg-surface-container ml-0.5"></span>
              )}
              <span className={`font-sans text-[14px] font-medium ${step < 2 ? 'text-on-surface-variant' : ''}`}>Constructing archetype balance...</span>
            </div>
            {step >= 2 ? (
              <span className="font-sans text-[11px] text-primary uppercase font-bold tracking-wide">Done</span>
            ) : step === 1 ? (
              <span className="font-sans text-[11px] text-secondary uppercase font-bold tracking-wide">In Progress</span>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
}
