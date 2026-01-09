"use client";

import { useMemo, useState } from "react";
import { Menu, Pencil, Trash2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

type CardItem = {
  id: string;
  title: string;
  desc: string;
};

export default function ManageProductPage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState<CardItem[]>([
    {
      id: "p1",
      title: "LOREM IPSUM",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "p2",
      title: "ALAT KESEHATAN",
      desc:
        "Contoh deskripsi produk: alat monitoring, pengukuran, dan perangkat pendukung rumah sakit.",
    },
    {
      id: "p3",
      title: "INSTRUMEN MEDIS",
      desc:
        "Contoh deskripsi produk: instrument medis untuk tindakan, perawatan, dan pemeriksaan.",
    },
  ]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (x) =>
        x.title.toLowerCase().includes(q) || x.desc.toLowerCase().includes(q)
    );
  }, [items, search]);

  function handleDelete(id: string) {
    const ok = confirm("Yakin mau delete item ini?");
    if (!ok) return;
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function handleEdit(id: string) {
    router.push(`/manage-product/edit/${id}`);
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* TOP AREA (Ichiba + Search) */}
        <div className="flex items-center gap-4">
          {/* Hamburger + Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>

            <div className="text-base font-extrabold tracking-wide text-teal-700">
              Ichiba Medical Indonesia
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex h-14 flex-1 items-center rounded-2xl bg-teal-600 px-5 shadow-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Searching..."
              className="h-full w-full bg-transparent text-white placeholder-white/70 outline-none"
            />

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-white hover:bg-white/10"
              aria-label="Search"
            >
              <Search size={22} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <section className="relative mt-8 overflow-hidden rounded-3xl px-6 py-8">
          {/* Bubble background */}
          <div className="pointer-events-none absolute -left-24 bottom-[-90px] h-80 w-80 rounded-full bg-teal-200/70" />
          <div className="pointer-events-none absolute left-48 bottom-24 h-24 w-24 rounded-full bg-teal-300/60" />
          <div className="pointer-events-none absolute right-16 bottom-10 h-72 w-72 rounded-full bg-teal-200/70" />
          <div className="pointer-events-none absolute right-72 top-24 h-20 w-20 rounded-full bg-amber-200/70" />
          <div className="pointer-events-none absolute left-[55%] top-44 h-16 w-16 rounded-full bg-teal-200/60" />
          <div className="pointer-events-none absolute left-[40%] bottom-24 h-10 w-10 rounded-full bg-amber-200/60" />

          <div className="relative">
            <h1 className="text-4xl font-black tracking-wide text-slate-800">
              MANAGE HOSPITAL
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {filteredItems.map((it) => (
                <ProjectCard
                  key={it.id}
                  title={it.title}
                  desc={it.desc}
                  onEdit={() => handleEdit(it.id)}
                  onDelete={() => handleDelete(it.id)}
                />
              ))}

              {filteredItems.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 md:col-span-3">
                  Data tidak ditemukan.
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectCard({
  title,
  desc,
  onEdit,
  onDelete,
}: {
  title: string;
  desc: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
      {/* Image placeholder */}
      <div className="h-40 bg-black" />

      <div className="p-4">
        <div className="text-sm font-extrabold text-slate-900">{title}</div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-700">
          {desc}
        </p>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-3 py-2 text-xs font-bold text-white hover:opacity-95"
          >
            <Pencil size={16} />
            EDIT
          </button>

          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:opacity-95"
          >
            <Trash2 size={16} />
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
