"use client";

import { Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function Topbar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="flex items-center justify-between border-b border-line pb-5">
      <h1 className="font-display text-xl font-semibold tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifikasi"
          className="relative flex h-9 w-9 items-center justify-center border border-line"
        >
          <Bell size={16} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-redline" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink font-mono text-xs">
            {user?.name?.charAt(0) ?? "A"}
          </span>
          <span className="hidden text-sm font-medium sm:inline">
            {user?.name ?? "Admin"}
          </span>
          <button
            onClick={handleLogout}
            aria-label="Keluar"
            className="flex h-9 w-9 items-center justify-center border border-line text-ink-soft hover:border-redline hover:text-redline"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
