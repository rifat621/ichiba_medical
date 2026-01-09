"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  LayoutDashboard,
  Box,
  FileText,
  LogOut,
  UserCircle,
} from "lucide-react";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-teal-700 text-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <UserCircle size={34} />
            <div>
              <div className="text-xs opacity-80">ADMIN</div>
              <div className="text-sm font-semibold">ADMIN123</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/10"
            aria-label="Close sidebar"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 px-3">
          <SidebarItem
            href="/"
            icon={<Home size={18} />}
            label="Home"
            active={pathname === "/"}
            onClick={onClose}
          />

          <SidebarItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={pathname.startsWith("/dashboard")}
            onClick={onClose}
          />

          <SidebarItem
            href="/manage-product"
            icon={<Box size={18} />}
            label="Manage Hospital"
            active={pathname.startsWith("/manage-product")}
            onClick={onClose}
          />

          {/* ✅ NEW: SERVICE REPORT */}
          <SidebarItem
            href="/service-report"
            icon={<FileText size={18} />}
            label="Service Report"
            active={pathname.startsWith("/service-report")}
            onClick={onClose}
          />

          <div className="mt-6 border-t border-white/20 pt-4">
            <button
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-semibold hover:bg-white/10"
              onClick={() => {
                onClose();
                window.location.href = "/login";
              }}
              type="button"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  onClick,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active ? "bg-yellow-400 text-black" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
