"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProcessingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // 4-Stage Cinematic Anticipation Sequence
    const timer1 = setTimeout(() => setStage(1), 2000); // Cross-Referencing
    const timer2 = setTimeout(() => setStage(2), 4000); // Synthesizing Archetype
    const timer3 = setTimeout(() => setStage(3), 6000); // Profile Locked
    const timer4 = setTimeout(() => {
      router.push("/report");
    }, 7000); // Redirect

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [router]);

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center py-24 px-5 overflow-hidden">
      
      {/* Background ambient glow that intensifies */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
        animate={{ 
          opacity: stage === 3 ? 0.8 : (stage * 0.15) 
        }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-[640px] w-full min-h-[400px] bg-white rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center border border-[#eae8e3]">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: Acquiring Baseline Telemetry */}
          {stage === 0 && (
            <motion.div 
              key="stage0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center w-full"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="w-24 h-24 rounded-full border-t-2 border-r-2 border-primary border-opacity-30 flex items-center justify-center mb-8 relative"
              >
                <div className="w-16 h-16 rounded-full border-b-2 border-l-2 border-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[28px] animate-pulse">radar</span>
                </div>
              </motion.div>
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-3 block">
                Stage 1 / 3
              </span>
              <h2 className="font-heading text-3xl text-on-surface font-semibold tracking-tight mb-3">
                Acquiring Baseline Telemetry
              </h2>
              <p className="font-sans text-[15px] text-on-surface-variant max-w-[400px]">
                Scanning 12 situational responses and establishing primary cognitive anchors.
              </p>
            </motion.div>
          )}

          {/* STAGE 1: Cross-Referencing Dimensions */}
          {stage === 1 && (
            <motion.div 
              key="stage1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                {/* Node matrix animation */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-secondary rounded-full"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: Math.cos((i * 72) * Math.PI / 180) * 40,
                      y: Math.sin((i * 72) * Math.PI / 180) * 40,
                      backgroundColor: ['#D9D1C7', '#B82E25', '#D9D1C7']
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                  />
                ))}
                <div className="absolute w-12 h-12 bg-surface-container rounded-full flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-on-surface text-[20px]">account_tree</span>
                </div>
              </div>
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-3 block">
                Stage 2 / 3
              </span>
              <h2 className="font-heading text-3xl text-on-surface font-semibold tracking-tight mb-3">
                Cross-Referencing Dimensions
              </h2>
              <p className="font-sans text-[15px] text-on-surface-variant max-w-[400px]">
                Mapping risk appetite against sociability and structural operational preferences.
              </p>
            </motion.div>
          )}

          {/* STAGE 2: Synthesizing Archetype */}
          {stage === 2 && (
            <motion.div 
              key="stage2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className="relative w-36 h-36 mb-10 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#ece7e5" strokeWidth="2"></circle>
                  <motion.circle 
                    cx="50" cy="50" r="44" fill="none" stroke="#b82e25" 
                    strokeWidth="3" strokeLinecap="round" 
                    strokeDasharray="276" strokeDashoffset="65" 
                    animate={{ rotate: 360, strokeDashoffset: [276, 65, 0] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  ></motion.circle>
                  <circle cx="50" cy="50" r="32" fill="none" stroke="#e6e2df" strokeWidth="1.5" strokeDasharray="8 6"></circle>
                  <circle cx="50" cy="50" r="18" fill="none" stroke="#961310" strokeWidth="1.5" opacity="0.4"></circle>
                </svg>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="material-symbols-outlined text-primary text-[28px] absolute"
                >
                  tune
                </motion.span>
              </div>
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest mb-3 block">
                Stage 3 / 3
              </span>
              <h2 className="font-heading text-3xl text-on-surface font-semibold tracking-tight mb-3">
                Synthesizing Archetype
              </h2>
              <p className="font-sans text-[15px] text-on-surface-variant max-w-[400px]">
                Calculating precise polarities and generating your diagnostic blueprint.
              </p>
            </motion.div>
          )}

          {/* STAGE 3: Profile Locked (The Flash) */}
          {stage === 3 && (
            <motion.div 
              key="stage3"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center text-center w-full h-full absolute inset-0 bg-primary rounded-3xl z-50"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"
              >
                <span className="material-symbols-outlined text-primary text-[32px]">done_all</span>
              </motion.div>
              <h2 className="font-heading text-4xl text-on-primary font-semibold tracking-tight">
                Profile Locked.
              </h2>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
