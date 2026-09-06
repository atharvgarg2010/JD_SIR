"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "Is this based on astrology or mysticism?",
    a: "No. This tool is built entirely on deterministic psychometric frameworks, focusing on cognitive patterns, decision-making traits, and behavioral preferences. There are no predictive or supernatural elements."
  },
  {
    q: "How long does the assessment take?",
    a: "The assessment consists of situational prompts and typically takes about 3 to 4 minutes to complete. We encourage you to answer instinctively."
  },
  {
    q: "Is my data private?",
    a: "Absolutely. We do not sell your personal data. Your responses are strictly confidential and are only used to generate your personalized archetype report."
  },
  {
    q: "Do I have to pay to see my results?",
    a: "You receive your primary archetype, dimensional polarity gauges, and a foundational diagnostic report completely free. An optional in-depth interactive synthesis is available for purchase."
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => (
        <motion.div 
          key={i} 
          className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden"
          style={{ width: "100%", margin: 0, border: openIndex === i ? "1px solid var(--primary)" : "1px solid #d4cfca", transition: "border-color 0.2s ease" }}
        >
          <button
            onClick={() => toggleOpen(i)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          >
            <h3 className={`font-sans font-semibold text-lg transition-colors ${
              openIndex === i ? "text-primary" : "text-on-surface"
            }`}>
              {faq.q}
            </h3>
            <motion.span 
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="material-symbols-outlined text-secondary ml-4 flex-shrink-0"
            >
              keyboard_arrow_down
            </motion.span>
          </button>
          
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-6 pb-6 pt-0 font-sans text-sm text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
