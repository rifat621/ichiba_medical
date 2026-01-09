"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, ArrowLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function InstrumentDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string; instrumentId: string }>();

  const hospitalId = params?.id ?? "1";
  const instrumentId = params?.instrumentId ?? "r1";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // sample data
  const hospitalName = "Rumah Sakit Universitas Hasanuddin";
  const hospitalAddress =
    "Jl. Perintis Kemerdekaan KM.10, Tamalanrea, Makassar, Sulawesi Selatan 90245";

  // contoh: instrument name bisa kamu mapping dari instrumentId
  const instrumentName = instrumentId === "r1" ? "PC200" : "INSTRUMENT";

  // ✅ default kosong (biar awalnya tidak muncul box image)
  const [images, setImages] = useState<string[]>([]);

  function addPhoto(file: File | null) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, url]);
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
          type="button"
        >
          <Menu size={24} />
        </button>

        <section className="relative min-h-[650px] overflow-hidden rounded-3xl bg-teal-700 px-10 py-8 shadow-2xl">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            INSTRUMENT DESCRIPTION
          </h1>

          <div className="mt-1 text-xs font-extrabold text-yellow-300">
            {hospitalName.toUpperCase()}
          </div>

          <div className="text-[10px] font-medium text-white/80">
            {hospitalAddress}
          </div>

          <div className="mt-8 text-2xl font-black text-white">{instrumentName}</div>

          {/* ✅ Kalau ada foto -> tampilkan list, kalau tidak -> tidak ada box kosong */}
          {images.length > 0 ? (
            <div className="mt-5 flex gap-4 overflow-x-auto pb-4 pr-2">
              {images.map((src, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={src}
                  alt={`img-${idx}`}
                  className="h-36 w-48 flex-none rounded-2xl object-cover shadow-xl"
                />
              ))}

              {/* Add Photo selalu ada */}
              <AddPhotoTile onPick={addPhoto} />
            </div>
          ) : (
            <div className="mt-5">
              <AddPhotoTile onPick={addPhoto} />
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-6 text-white">
            <Info label="Serial Number" value="201-C4-N590KNTL0" />
            <Info label="Installation Date" value="01/January/2026" />
            <Info label="Status" value="Active" />
            <Info label="Instrument Status" value="KSO" />
            <Info label="Sales Via" value="PT. Ichiba Makassar" />
            <Info
              label="Accessories"
              value={"UPS\nPrint Spidol\nKeyboard\nMouse\nCooling Unit"}
              multiline
            />
          </div>

          <button
            onClick={() => router.push(`/hospital/${hospitalId}`)}
            className="absolute bottom-10 left-10 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-teal-700 shadow-xl hover:bg-slate-50"
            type="button"
          >
            <ArrowLeft size={18} />
            BACK
          </button>
        </section>
      </div>
    </main>
  );
}

function AddPhotoTile({ onPick }: { onPick: (file: File | null) => void }) {
  return (
    <label className="grid h-36 w-48 cursor-pointer place-items-center rounded-2xl bg-pink-50 text-sm font-bold text-slate-700 shadow-xl">
      Add Photo
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function Info({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="text-sm font-extrabold">{label}</div>
      <div className="mt-1 text-xs font-semibold whitespace-pre-line">
        {multiline ? value : value}
      </div>
    </div>
  );
}
