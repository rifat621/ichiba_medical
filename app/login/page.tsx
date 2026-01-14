"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const u = username.trim();
    const p = password.trim();

    if (!u || !p) {
      alert("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // penting untuk memastikan cookie dari server tersimpan
        credentials: "include",
        body: JSON.stringify({ username: u, password: p }),
      });

      // Jangan langsung res.json() karena kalau server balas HTML akan crash
      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response bukan JSON. Status:", res.status);
        console.error("Awal response:", text.slice(0, 300));
        alert(
          `Server tidak mengembalikan JSON (kemungkinan URL salah/redirect/error).\nStatus: ${res.status}\nCek console untuk detail.`
        );
        return;
      }

      if (!res.ok || !data.ok) {
        alert(data.message || "Username or password is wrong");
        return;
      }

      // Simpan untuk UI
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("role", data.user.role === "ADMIN" ? "admin" : "user");
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect sesuai role
      router.push(data.user.role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-3xl bg-teal-700 p-8 shadow-2xl">
        <h1 className="text-center text-2xl font-black tracking-wide text-white">
          LOGIN
        </h1>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-extrabold text-white/90">
              USERNAME
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-black placeholder-black/50 outline-none focus:ring-2 focus:ring-white/50"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-extrabold text-white/90">
              PASSWORD
            </label>
            <div className="relative mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-full bg-white px-5 py-3 pr-12 text-sm text-black placeholder-black/50 outline-none focus:ring-2 focus:ring-white/50"
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50 hover:text-black/80"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Info akun */}
          <div className="rounded-2xl bg-white/10 px-4 py-3 text-[12px] font-semibold text-white">
            <div className="opacity-90">
              Please use your registered credentials to login.
            </div>
            <div className="mt-2 opacity-70">
              Contact administrator if you need an account.
            </div>
            <div className="mt-2 opacity-70">
              Seed admin kamu sekarang: <b>superadminichiba</b> / <b>admin123</b>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-full bg-white px-6 py-3 text-sm font-extrabold tracking-wide text-teal-700 shadow-xl hover:bg-slate-100 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
      </section>
    </main>
  );
}
