"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAssessment } from "@/context/AssessmentContext";
import { calculatePersonality, PersonalityProfile } from "@/lib/engine";
import { useRouter } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

import TeaserDashboard from "@/components/TeaserDashboard";

export default function ReportPage() {
  const { answers } = useAssessment();
  const [profile, setProfile] = useState<PersonalityProfile | null>(null);
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const [userTier, setUserTier] = useState<"free" | "premium" | null>(null);
  const [session, setSession] = useState<any>(null);
  const supabase = createClient();

  const handleAuthSuccess = async () => {
    setIsAuthModalOpen(false);
    setIsGenerating(true);
    
    try {
      // Fetch user to ensure auth session is active
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          assessment_id: Object.values(answers).join("-"), // Safely stringify the answers object values
          custom_rules: "Focus on psychological depth, career vectors, and high-performance behavioral habits."
        })
      });

      if (res.ok) {
        alert("Gemini Report Generated successfully! Redirecting...");
      } else {
        alert("Failed to generate report.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        // Fetch user tier
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("tier")
          .eq("id", session.user.id)
          .single();
          
        setUserTier(userProfile?.tier || "free");
      }
      setHasCheckedSession(true);
    };
    
    checkSession();
  }, []);

  const handleUnlockClick = () => {
    if (!session) {
      setIsAuthModalOpen(true);
    } else {
      // If they are logged in but free, they would normally hit a paywall here.
      // For MVP, we will simulate upgrading and generating.
      alert("Simulating Paywall Upgrade...");
      handleAuthSuccess(); // Triggers the generation
    }
  };

  useEffect(() => {
    // Calculate the personality using the deterministic engine based on answers
    const calculatedProfile = calculatePersonality(answers);
    setProfile(calculatedProfile);
  }, [answers]);

  if (!hasCheckedSession) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      
      <main className="pt-24 pb-20 px-4">
        <section className="max-w-[800px] mx-auto w-full">
          {(!session || userTier === 'free') ? (
            <TeaserDashboard />
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col gap-12"
            >
              {/* Premium Dashboard Rendering (Existing Basic Report Code) */}
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-container flex items-center justify-center shadow-inner">
                  <span className="text-6xl md:text-7xl">{profile.crest}</span>
                </div>
                <div>
                  <span className="font-sans text-xs md:text-sm font-bold text-primary uppercase tracking-widest block mb-2">
                    Primary Archetype Discovered
                  </span>
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface">
                    The {profile.title}
                  </h1>
                </div>
              </div>

              <div className="bg-[#fdf8f7] border border-[#f5d9d7] rounded-3xl p-8 md:p-12 text-center flex flex-col items-center">
                <span className="material-symbols-outlined text-[48px] text-primary mb-4">diamond</span>
                <h2 className="font-heading text-2xl font-semibold mb-4">Premium Dashboard Unlocked</h2>
                <p className="font-sans text-on-surface-variant max-w-lg mb-6">
                  Your full Gemini AI generated markdown report is ready. (Check your Supabase database 'reports' table for the markdown output). 
                </p>
                <div className="w-full h-px bg-surface-variant/30 my-6"></div>
                <button 
                  className="px-6 py-3 bg-[#31302f] text-on-primary rounded-xl font-sans font-semibold"
                  onClick={() => alert("Navigate to Interactive Q&A Chat!")}
                >
                  Enter Interactive Q&A
                </button>
              </div>

            </motion.div>
          )}
        </section>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
