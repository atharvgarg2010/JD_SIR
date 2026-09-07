"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Trigger report generation
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const supabase = createClient();

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onSuccess();
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          throw new Error("Email already registered. Please sign in.");
        }
        
        setSuccessMsg("Check your email for the confirmation link!");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/report`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during authentication.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-[420px] bg-white rounded-3xl p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <span className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary mb-4">
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </span>
          <h3 className="font-heading text-2xl font-semibold text-on-surface mb-1">
            {isLogin ? "Welcome Back" : "Save Your Profile"}
          </h3>
          <p className="font-sans text-sm text-on-surface-variant">
            {isLogin ? "Sign in to access your assessment telemetry." : "Create a free account or sign in to securely generate and save your interactive report."}
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
          <div>
            <label className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-[#eae8e3] rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-[#eae8e3] rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="font-sans text-[11px] font-bold text-secondary uppercase tracking-widest block mb-1">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-[#eae8e3] rounded-xl px-4 py-3 font-sans text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="Confirm your password"
              />
            </div>
          )}

          {errorMsg && (
            <div className="bg-[#fdf8f7] border border-error text-error text-xs p-3 rounded-lg font-sans font-medium text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-[#f2fae6] border border-[#a3c965] text-[#4b6a1c] text-xs p-3 rounded-lg font-sans font-medium text-center">
              {successMsg}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-6 py-4 mt-2 bg-[#31302f] hover:bg-primary text-on-primary font-sans font-semibold text-base rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-[#eae8e3] flex-1"></div>
          <span className="font-sans text-xs font-semibold text-secondary uppercase">Or</span>
          <div className="h-px bg-[#eae8e3] flex-1"></div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-[#eae8e3] hover:bg-surface-container text-on-surface font-sans font-semibold text-base rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </div>
        
        <div className="text-center mt-2">
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="font-sans text-sm font-semibold text-secondary hover:text-primary transition-colors"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
