"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Username dan password wajib diisi");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Username atau password salah");
      return;
    }

    router.push("/"); // masuk HOME
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        {/* Bubble background */}
        <div className="pointer-events-none absolute -left-24 bottom-[-90px] h-80 w-80 rounded-full bg-teal-200/70" />
        <div className="pointer-events-none absolute left-48 bottom-24 h-24 w-24 rounded-full bg-teal-300/60" />
        <div className="pointer-events-none absolute right-16 bottom-10 h-72 w-72 rounded-full bg-teal-200/70" />
        <div className="pointer-events-none absolute right-72 top-24 h-20 w-20 rounded-full bg-amber-200/70" />

        {/* Login Card */}
        <div className="relative w-full max-w-md rounded-3xl bg-teal-700 p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-sm font-extrabold tracking-wide text-white/90">
              ICHIBA MEDICAL INDONESIA
            </div>
            <h1 className="mt-2 text-2xl font-black text-white">
              LOGIN
            </h1>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {/* USERNAME */}
            <div>
              <label className="block text-xs font-bold text-white/90">
                USERNAME
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-white/90">
                PASSWORD
              </label>

              <div className="mt-2 flex items-center rounded-full bg-white pr-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-full bg-transparent px-5 py-3 text-sm text-black outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="grid h-10 w-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
                  aria-label="Show password"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-extrabold text-teal-700 shadow-lg hover:bg-slate-50 disabled:opacity-70"
            >
              <LogIn size={18} />
              {loading ? "MEMPROSES..." : "LOGIN"}
            </button>

            {/* INFO AKUN */}
            <div className="rounded-xl bg-white/90 p-3 text-center text-xs text-slate-800">
              <div className="font-bold">Akun Demo</div>
              <div className="mt-1">
                Username: <b>admin</b>
              </div>
              <div>
                Password: <b>admin123</b>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
