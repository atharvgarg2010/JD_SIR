"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FreeQuestionHook({ onUnlock }: { onUnlock?: () => void }) {
  const [question, setQuestion] = useState("");
  const [state, setState] = useState<"idle" | "analyzing" | "result">("idle");
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setState("analyzing");
    
    // Simulate cinematic dramatic loading
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setState("result");
      }
    }, 40); // 4 seconds total
  };

  return (
    <div className="w-full bg-surface-container-low border border-surface-variant rounded-3xl p-8 relative overflow-hidden">
      
      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className="w-10 h-10 rounded-xl bg-[#31302f] flex items-center justify-center text-on-primary shadow-sm">
          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
        </span>
        <div>
          <h3 className="font-heading text-lg font-semibold text-on-surface">Ask JD SIR AI</h3>
          <p className="font-sans text-xs text-on-surface-variant">Your Personalized Strategic Advisor</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.form 
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="flex flex-col gap-4 relative z-10"
          >
            <p className="font-sans text-sm text-on-surface leading-relaxed">
              You get exactly <span className="font-bold text-primary">one free question</span>. Ask anything about your career, relationships, or blindspots based on your specific archetype.
            </p>
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., What is my biggest obstacle in a leadership role?"
                className="w-full bg-white border border-[#eae8e3] rounded-xl pl-4 pr-12 py-4 font-sans text-sm text-on-surface shadow-sm focus:outline-none focus:border-primary transition-all"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </motion.form>
        )}

        {state === "analyzing" && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-6 gap-6 relative z-10"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="animate-spin w-full h-full text-primary/20" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75 text-primary" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="absolute font-sans font-bold text-xs text-primary">{progress}%</span>
            </div>
            
            <div className="h-6 overflow-hidden">
              <motion.div
                animate={{ y: [0, -24, -48, -72] }}
                transition={{ duration: 4, times: [0, 0.33, 0.66, 1], ease: "easeInOut" }}
                className="flex flex-col text-center font-sans text-sm font-semibold text-secondary tracking-widest uppercase"
              >
                <span>Analyzing Cognitive Telemetry...</span>
                <span>Cross-referencing Archetype Data...</span>
                <span>Synthesizing Strategic Vectors...</span>
                <span>Generating Personalized Insight...</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {state === "result" && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col gap-4 relative z-10"
          >
            <div className="bg-[#fdf8f7] border border-[#f5d9d7] rounded-2xl p-5">
              <p className="font-sans text-sm text-on-surface leading-relaxed mb-2 font-medium">
                "Based on your extremely high risk-aversion telemetry and your dominant analytical traits, the answer to your question is highly consequential. You are uniquely positioned to..."
              </p>
              
              <div className="relative w-full h-12 bg-white/50 backdrop-blur-sm border border-dashed border-[#e6c3c0] rounded-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[shimmer_2s_infinite]"></div>
                <span className="font-sans font-bold text-[11px] text-primary tracking-widest uppercase relative z-10 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Premium Insight Blurred
                </span>
              </div>
            </div>

            <button 
              onClick={onUnlock}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-sm rounded-xl shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              Unlock Full Report to Read Answer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
