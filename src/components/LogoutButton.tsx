"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-secondary hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors"
    >
      <span className="material-symbols-outlined text-[18px]">logout</span>
      Sign Out
    </button>
  );
}
