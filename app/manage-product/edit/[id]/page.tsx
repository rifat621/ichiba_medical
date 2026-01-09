"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState(""); // nama rumah sakit / nama project
  const [address, setAddress] = useState("");

  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  function handleSave() {
    if (!name.trim() || !address.trim()) {
      alert("Nama dan alamat wajib diisi.");
      return;
    }

    alert(`Data tersimpan (contoh). ID project: ${id}`);
    router.push("/manage-product");
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Hamburger (biar mirip halaman lain) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-6 grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        {/* Judul */}
        <h1 className="text-4xl font-black tracking-wide text-slate-800">
          EDIT HOSIPTAL
        </h1>

        {/* Panel putih besar */}
        <section className="mt-4 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/10">
          {/* Box preview gambar */}
          <div className="overflow-hidden rounded-2xl bg-teal-600">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="h-44 w-full" />
            )}
          </div>

          {/* Form */}
          <div className="mt-6 space-y-5">
            {/* Choose file */}
            <div>
              <label className="block text-xs font-bold text-slate-700">
                FOTO / IMAGE
              </label>

              <label className="mt-2 inline-flex cursor-pointer items-center rounded-full bg-teal-600 px-6 py-3 text-xs font-extrabold text-black shadow hover:opacity-95">
                CHOOSE FILE
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            {/* Nama RS */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700">
                HOSPITAL NAWE
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hospital Name"
                className="mt-2 w-full rounded-full bg-teal-600 px-6 py-3 text-sm text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            {/* Alamat RS */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700">
                HOSPITAL ADDRESS
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Hospital Address"
                className="mt-2 w-full rounded-full bg-teal-600 px-6 py-3 text-sm text-white placeholder-white/80 outline-none focus:ring-2 focus:ring-teal-300"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => router.back()}
                className="rounded-full bg-slate-200 px-6 py-3 text-sm font-extrabold text-slate-800 hover:bg-slate-300"
              >
                BACK
              </button>

              <button
                onClick={handleSave}
                className="rounded-full bg-teal-700 px-6 py-3 text-sm font-extrabold text-white hover:opacity-95"
              >
                SAVE
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
