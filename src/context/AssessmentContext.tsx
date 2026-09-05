"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AssessmentContextType {
  answers: Record<string, string>;
  setAnswer: (questionId: string, answerId: string) => void;
  clearAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("personality_assessment");
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved assessment", e);
      }
    }
  }, []);

  const setAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: answerId };
      localStorage.setItem("personality_assessment", JSON.stringify(updated));
      return updated;
    });
  };

  const clearAssessment = () => {
    setAnswers({});
    localStorage.removeItem("personality_assessment");
  };

  return (
    <AssessmentContext.Provider value={{ answers, setAnswer, clearAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
}
