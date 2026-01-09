"use client";

import { useMemo, useState } from "react";
import { Menu, Image as ImageIcon, Play, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AddHospitalPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mt-3 grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Menu"
            type="button"
          >
            <Menu size={24} />
          </button>

          <section className="relative w-full min-h-[650px] rounded-3xl bg-teal-700 px-10 py-8 shadow-2xl">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              ADD HOSPITAL
            </h1>

            <div className="mt-8 space-y-6 pb-28">
              <div>
                <label className="block text-xs font-bold text-white/90">
                  HOSPITAL PHOTO
                </label>

                <div className="mt-2 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-lg bg-white shadow">
                    {previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="text-teal-700" />
                    )}
                  </div>

                  <label className="cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-extrabold text-teal-700 shadow hover:bg-slate-100">
                    CHOOSE FILE
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">
                  HOSPITAL NAME
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Hospital name"
                  className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">
                  HOSPITAL ADDRESS
                </label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Hospital address"
                  className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            {/* Back */}
            <button
              onClick={() => router.push("/")}
              className="absolute bottom-6 left-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <ArrowLeft size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">BACK</span>
            </button>

            {/* Next */}
            <button
              onClick={() => {
                if (!name.trim() || !address.trim()) {
                  alert("Name and address are required.");
                  return;
                }
                router.push("/add-instrument");
              }}
              className="absolute bottom-6 right-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <Play size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">NEXT</span>
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
