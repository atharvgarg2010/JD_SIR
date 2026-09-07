import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/"); // Not logged in, send them home
  }

  // Fetch the user's profile from the database
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-white rounded-3xl p-8 shadow-xl flex flex-col gap-8">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-primary text-2xl font-bold uppercase">
              {user.email?.[0] || "U"}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-semibold text-on-surface">Account Hub</h1>
              <p className="font-sans text-sm text-on-surface-variant">{user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>

        <div className="h-px bg-surface-variant/30 w-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#fdf8f7] border border-[#f5d9d7] flex flex-col gap-2">
            <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest">Current Tier</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
              <span className="font-heading text-lg font-medium text-on-surface capitalize">
                {profile?.tier || 'Free'} Plan
              </span>
            </div>
            {profile?.tier === 'free' && (
              <button className="mt-2 text-sm font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all text-left">
                Upgrade to Premium
              </button>
            )}
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant flex flex-col gap-2">
            <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest">Assessments</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface text-[20px]">history</span>
              <span className="font-heading text-lg font-medium text-on-surface">
                View History
              </span>
            </div>
            <Link href="/assessment" className="mt-2 text-sm font-semibold text-secondary hover:text-primary transition-colors text-left">
              Take New Assessment
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="font-sans text-sm font-semibold text-secondary hover:text-on-surface transition-colors">
            &larr; Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
