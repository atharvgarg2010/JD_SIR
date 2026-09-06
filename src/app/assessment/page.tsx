"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAssessment } from "@/context/AssessmentContext";
import { motion } from "framer-motion";

export default function AssessmentPage() {
  const { answers, setAnswer } = useAssessment();
  const [selectedOption, setSelectedOption] = useState<string | null>(answers["q4"] || "exploring");
  const router = useRouter();

  // Sync state if context loads late
  useEffect(() => {
    if (answers["q4"]) {
      setSelectedOption(answers["q4"]);
    }
  }, [answers]);

  const handleContinue = () => {
    if (selectedOption) {
      setAnswer("q4", selectedOption);
    }
    router.push("/processing");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <header className="w-full h-20 flex items-center px-5 lg:px-10 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center gap-2 text-on-surface group">
          <span className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">fingerprint</span>
          </span>
          <span className="font-heading text-2xl tracking-tight font-medium">YOUR BRAND</span>
        </Link>
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center py-12 px-5">
        <div className="max-w-[840px] w-full mx-auto">
          {/* Assessment Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest">
                Discover Your Profile • Assessment
              </span>
              <span className="font-sans text-[11px] font-medium text-on-surface-variant">Question 04 of 12</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container transition-all duration-500 rounded-full" style={{ width: "33.3%" }}></div>
            </div>
          </div>

          {/* Main Question Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8 border border-[#eae8e3]"
          >
            <div className="mb-10">
              <span className="font-sans text-[11px] font-bold text-secondary uppercase tracking-wider block mb-2">Contextual Choice</span>
              <h2 className="font-heading text-[30px] md:text-[40px] text-on-surface font-semibold tracking-tight leading-tight">
                You have a completely free afternoon. What sounds most appealing?
              </h2>
              <p className="font-sans text-[13px] text-on-surface-variant mt-2">
                Select the option that matches your spontaneous impulse, not an obligation.
              </p>
            </div>

            {/* Options Cluster */}
            <motion.div 
              className="flex flex-col gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {[
                {
                  id: "exploring",
                  title: "Exploring something new",
                  desc: "Venturing into an unfamiliar bookstore, starting a conceptual rabbit-hole, or visiting a neighborhood you haven't mapped."
                },
                {
                  id: "social",
                  title: "Spending time with people",
                  desc: "Hosting an unhurried conversation over espresso, catching up with an old colleague, or participating in a shared gathering."
                },
                {
                  id: "project",
                  title: "Working on something I care about",
                  desc: "Dedicating focused hours to personal craftsmanship, writing, architectural tinkering, or an independent side endeavor."
                },
                {
                  id: "recharge",
                  title: "Taking time to recharge",
                  desc: "Unstructured quietude, restorative solitary reading, meditation, or resting without performance or schedule expectations."
                }
              ].map((opt) => (
                <motion.label 
                  key={opt.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex items-start gap-4 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-sm border ${
                    selectedOption === opt.id 
                      ? "bg-[#fdf8f7] border-primary" 
                      : "bg-white border-[#eae8e3] hover:bg-surface-container-low/30"
                  }`}
                  onClick={() => setSelectedOption(opt.id)}
                >
                  <input
                    type="radio"
                    name="assessment-q4"
                    value={opt.id}
                    checked={selectedOption === opt.id}
                    onChange={() => setSelectedOption(opt.id)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
                    selectedOption === opt.id ? "bg-primary-container" : "bg-surface-container-highest"
                  }`}>
                    <motion.div 
                      initial={false}
                      animate={{ scale: selectedOption === opt.id ? 1 : 0 }}
                      className="w-2 h-2 rounded-full bg-on-primary"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-sans font-semibold text-lg transition-colors ${
                      selectedOption === opt.id ? "text-primary" : "text-on-surface group-hover:text-primary"
                    }`}>
                      {opt.title}
                    </span>
                    <span className="font-sans text-[13px] text-on-surface-variant mt-1 leading-relaxed">
                      {opt.desc}
                    </span>
                  </div>
                </motion.label>
              ))}
            </motion.div>

            {/* Navigation Bar */}
            <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-3 text-secondary hover:text-on-surface font-sans font-semibold text-[13px] transition-colors">
                <span className="material-symbols-outlined text-[18px]">west</span>
                <span>Previous Question</span>
              </Link>
              <button 
                onClick={handleContinue}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-lg rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>
          
          <p className="text-center font-sans text-[11px] font-medium text-secondary mt-6">
            • There are no right or wrong answers — all responses are strictly private.
          </p>
        </div>
      </main>
    </div>
  );
}
