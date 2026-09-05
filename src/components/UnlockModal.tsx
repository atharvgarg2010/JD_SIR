"use client";

import { useEffect } from "react";

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UnlockModal({ isOpen, onClose }: UnlockModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-[480px] bg-white rounded-3xl p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
          </span>
          <div>
            <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-widest block">Premium Insights</span>
            <h3 className="font-heading text-xl font-semibold text-on-surface">Unlock Full Profile</h3>
          </div>
        </div>

        <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
          You are currently viewing the foundational diagnostic. To access your deep-dive traits, relationship dynamics, and interactive AI Q&A, you need to unlock the full report.
        </p>

        <div className="bg-[#fdf8f7] border border-[#f5d9d7] rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span className="font-sans text-[13px] text-on-surface font-medium">In-depth cognitive & social analysis</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span className="font-sans text-[13px] text-on-surface font-medium">Personalized growth trajectories</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span className="font-sans text-[13px] text-on-surface font-medium">Interactive AI Q&A trained on your archetype</span>
          </div>
        </div>

        <div className="pt-2">
          <button 
            className="w-full flex items-center justify-between px-6 py-4 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-base rounded-xl shadow-md hover:shadow-xl transition-all"
            onClick={() => alert("Stripe / Razorpay Checkout Simulator: This will redirect to the payment gateway.")}
          >
            <span>Proceed to Checkout</span>
            <span>₹199</span>
          </button>
          <p className="text-center font-sans text-[11px] font-medium text-secondary mt-3">
            Secure payment powered by Stripe / Razorpay.
          </p>
        </div>
      </div>
    </div>
  );
}
