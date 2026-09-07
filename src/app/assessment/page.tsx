"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAssessment } from "@/context/AssessmentContext";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "@/lib/questions";

export default function AssessmentPage() {
  const { answers, setAnswer } = useAssessment();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id] || "";

  const handleContinue = () => {
    if (!currentAnswer) return; // Prevent advancing if no answer is provided
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      router.push("/processing");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
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

      <main className="flex-1 w-full flex flex-col items-center justify-center py-12 px-5 overflow-hidden">
        <div className="max-w-[840px] w-full mx-auto">
          
          {/* Assessment Header */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest">
                {currentQuestion.category} • Assessment
              </span>
              <span className="font-sans text-[11px] font-medium text-on-surface-variant">
                Question {String(currentStep + 1).padStart(2, '0')} of {questions.length}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-container transition-all duration-500 rounded-full" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Main Question Container */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8 border border-[#eae8e3]"
            >
              <div className="mb-10">
                <h2 className="font-heading text-[30px] md:text-[40px] text-on-surface font-semibold tracking-tight leading-tight">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="font-sans text-[13px] text-on-surface-variant mt-2">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Input Types */}
              <div className="flex flex-col gap-4">
                {currentQuestion.type === "text" && (
                  <input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-surface-container-low border border-[#eae8e3] rounded-xl px-6 py-5 font-sans text-lg text-on-surface focus:outline-none focus:border-primary transition-colors"
                    autoFocus
                  />
                )}

                {currentQuestion.type === "date" && (
                  <input
                    type="date"
                    value={currentAnswer}
                    onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                    className="w-full bg-surface-container-low border border-[#eae8e3] rounded-xl px-6 py-5 font-sans text-lg text-on-surface focus:outline-none focus:border-primary transition-colors"
                    autoFocus
                  />
                )}

                {currentQuestion.type === "choice" && currentQuestion.options?.map((opt) => (
                  <label 
                    key={opt.id}
                    className={`group relative flex items-start gap-4 p-6 rounded-2xl cursor-pointer transition-all duration-200 shadow-sm border ${
                      currentAnswer === opt.id 
                        ? "bg-[#fdf8f7] border-primary" 
                        : "bg-white border-[#eae8e3] hover:bg-surface-container-low/30"
                    }`}
                    onClick={() => setAnswer(currentQuestion.id, opt.id)}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
                      currentAnswer === opt.id ? "bg-primary-container" : "bg-surface-container-highest"
                    }`}>
                      {currentAnswer === opt.id && (
                        <div className="w-2 h-2 rounded-full bg-on-primary" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-sans font-semibold text-lg transition-colors ${
                        currentAnswer === opt.id ? "text-primary" : "text-on-surface group-hover:text-primary"
                      }`}>
                        {opt.title}
                      </span>
                      {opt.desc && (
                        <span className="font-sans text-[13px] text-on-surface-variant mt-1 leading-relaxed">
                          {opt.desc}
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Navigation Bar */}
              <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {currentStep > 0 ? (
                  <button 
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-3 text-secondary hover:text-on-surface font-sans font-semibold text-[13px] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">west</span>
                    <span>Previous</span>
                  </button>
                ) : (
                  <Link href="/" className="inline-flex items-center gap-1.5 px-4 py-3 text-secondary hover:text-on-surface font-sans font-semibold text-[13px] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">west</span>
                    <span>Home</span>
                  </Link>
                )}
                
                <button 
                  onClick={handleContinue}
                  disabled={!currentAnswer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-lg rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{currentStep === questions.length - 1 ? "Complete" : "Continue"}</span>
                  <span className="material-symbols-outlined text-[20px]">
                    {currentStep === questions.length - 1 ? "done" : "arrow_forward"}
                  </span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <p className="text-center font-sans text-[11px] font-medium text-secondary mt-6">
            • There are no right or wrong answers — all responses are strictly private.
          </p>
        </div>
      </main>
    </div>
  );
}
