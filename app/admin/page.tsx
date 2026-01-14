"use client";

import { useState } from "react";
import { Menu, Building2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminHomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* ADMIN SIDEBAR */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* HAMBURGER */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-6 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
          type="button"
        >
          <Menu size={24} />
        </button>

        {/* TITLE */}
        <h1 className="mb-6 text-3xl font-black tracking-wide text-slate-800">
          HOME
        </h1>

        {/* FULL WIDTH DASHBOARD CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-black/5">
          {/* ICON */}
          <div className="absolute right-10 top-10 text-teal-600/20">
            <Building2 size={120} />
          </div>

          <div className="relative">
            <div className="text-sm font-extrabold tracking-wide text-teal-700">
              TOTAL HOSPITAL
            </div>

            <div className="mt-2 text-5xl font-black text-slate-900">
              1
            </div>

            <div className="mt-1 text-xs font-medium text-slate-500">
              Updated: 07/01/2026
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}