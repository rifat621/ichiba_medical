"use client";

import { Menu, Search } from "lucide-react";

export default function TopBar({
  onMenu,
  search,
  onSearchChange,
}: {
  onMenu: () => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Hamburger */}
      <button
        onClick={onMenu}
        className="grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
        aria-label="Menu"
        type="button"
      >
        <Menu size={24} />
      </button>

      {/* Title (OUTSIDE BOX) */}
      <div className="text-sm font-extrabold tracking-wide text-slate-800 sm:text-base">
        Ichiba Medical Indonesia
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search box ONLY */}
      <div className="flex h-12 w-full max-w-sm items-center rounded-2xl bg-teal-600 px-4 shadow-sm">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Searching..."
          className="h-full w-full bg-transparent text-white placeholder-white/70 outline-none"
        />

        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-xl text-white hover:bg-white/10"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}
