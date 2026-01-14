"use client";

import { useState } from "react";
import { Menu, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function CreateAccountPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreate() {
    if (!name.trim() || !username.trim() || !password.trim()) {
      alert("Name, Username, and Password must be filled.");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          // ✅ role tidak dikirim karena default STAFF di schema prisma
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Failed to create account");
        return;
      }

      alert("Account created successfully ✅");
      router.push("/admin/manage-account");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
          type="button"
        >
          <Menu size={24} />
        </button>

        {/* Panel */}
        <section className="relative min-h-[650px] overflow-hidden rounded-3xl bg-teal-700 px-10 py-8 shadow-2xl">
          <h1 className="text-3xl font-black tracking-wide text-white">
            CREATE ACCOUNT
          </h1>

          <p className="mt-2 text-sm font-semibold text-white/80">
            This account will be created as <span className="text-yellow-300">STAFF</span>.
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-6 pb-28">
            <Field
              label="NAME"
              placeholder="Enter full name"
              value={name}
              onChange={setName}
            />

            <Field
              label="USERNAME"
              placeholder="Enter username"
              value={username}
              onChange={setUsername}
            />

            <Field
              label="PASSWORD"
              placeholder="Enter password"
              value={password}
              onChange={setPassword}
              type="password"
            />
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => router.push("/admin/manage-account")}
            className="absolute bottom-6 left-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
            type="button"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
              <ArrowLeft size={18} />
            </span>
            <span className="text-sm font-extrabold tracking-wide">BACK</span>
          </button>

          {/* SAVE BUTTON */}
          <button
            onClick={handleCreate}
            className="absolute bottom-6 right-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
            type="button"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
              <Save size={18} />
            </span>
            <span className="text-sm font-extrabold tracking-wide">CREATE</span>
          </button>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-white/90">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-white/50"
      />
    </div>
  );
}
