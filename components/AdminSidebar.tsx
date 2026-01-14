"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  LayoutDashboard,
  FileText,
  LogOut,
  UserCircle,
  Users,
  Plus,
} from "lucide-react";

export default function AdminSidebar({
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
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 px-3">
          <Item
            href="/admin"
            label="Home"
            icon={<Home size={18} />}
            active={pathname === "/admin"}
            onClick={onClose}
          />

          <Item
            href="/admin/manage-account"
            label="Manage Account"
            icon={<Users size={18} />}
            active={pathname?.startsWith("/admin/manage-account") ?? false}
            onClick={onClose}
          />

          <Item
            href="/admin/service-report"
            label="Service Report"
            icon={<FileText size={18} />}
            active={pathname?.startsWith("/admin/service-report") ?? false}
            onClick={onClose}
          />
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto px-3 pb-6">
          <Link
            href="/admin/create-account"
            onClick={onClose}
            className="mt-6 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-white/10"
          >
            <Plus size={18} />
            CREATE ACCOUNT
          </Link>

          <button
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-white/10"
            onClick={() => {
              onClose();
              // TODO: clear cookie/session
              window.location.href = "/login";
            }}
            type="button"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">LOG OUT</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Item({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
        active ? "bg-yellow-300 text-slate-900" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}