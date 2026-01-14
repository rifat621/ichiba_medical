"use client";

import { useState } from "react";
import { Menu, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function CreateAccountPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STAFF">("STAFF");

  async function handleCreate() {
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name: username,
          role: role,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert(data.message || "Failed to create account");
        return;
      }

      alert("User account created successfully!");
      router.push("/admin/manage-account");
    } catch (error) {
      console.error("Create account error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-4xl px-6 py-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        <section className="rounded-3xl border bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-black text-black">
            CREATE USER ACCOUNT
          </h1>

          <div className="mt-6 space-y-5">
            <Field
              label="USERNAME"
              value={username}
              onChange={setUsername}
            />

            <Field
              label="PASSWORD"
              value={password}
              onChange={setPassword}
              type="password"
            />

            <div>
              <label className="text-xs font-extrabold text-black">
                ROLE
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as "ADMIN" | "STAFF")}
                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold"
              >
                <option value="STAFF">STAFF</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/manage-account")}
              className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-3 text-sm font-extrabold text-black"
            >
              <ArrowLeft size={18} />
              BACK
            </button>

            <button
              onClick={handleCreate}
              className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-extrabold text-white shadow hover:bg-teal-800"
            >
              CREATE
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-extrabold text-black">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border px-4 py-3 text-sm font-semibold"
      />
    </div>
  );
}
