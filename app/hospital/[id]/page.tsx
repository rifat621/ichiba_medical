"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Menu,
  Pencil,
  Trash2,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

type InstrumentRow = {
  id: string;
  instrument: string;
  serial: string;
  installDate: string;
};

export default function HospitalDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const hospitalId = params?.id ?? "1";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const hospitalName = "RUMAH SAKIT UNIVERSITAS HASANUDDIN";
  const hospitalAddress =
    "Jl. Perintis Kemerdekaan KM.10, Makassar, Sulawesi Selatan";

  const [rows, setRows] = useState<InstrumentRow[]>([
    {
      id: "r1",
      instrument: "PC200",
      serial: "SN5691T",
      installDate: "06/01/26",
    },
    {
      id: "r2",
      instrument: "Yumizen H500",
      serial: "SN2456N",
      installDate: "02/10/25",
    },
  ]);

  function handleDelete(id: string) {
    if (!confirm("Delete this instrument?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function handleEdit(row: InstrumentRow) {
    router.push(
      `/add-instrument?hospitalId=${hospitalId}&instrument=${row.instrument}`
    );
  }

  function handleUpload(file: File | null) {
    if (!file) return;
    alert(`Uploaded: ${file.name}`);
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* TOP BAR */}
        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="grid h-12 w-12 place-items-center rounded-xl hover:bg-slate-100"
          >
            <Menu size={26} className="text-black" />
          </button>

          <div className="text-sm font-extrabold text-black">
            PT. ICHIBA MEDICAL INDONESIA
          </div>
        </div>

        <section className="rounded-3xl bg-teal-700 px-10 py-8 shadow-2xl">
          {/* TITLE */}
          <h1 className="text-2xl font-extrabold text-black">
            {hospitalName}
          </h1>
          <p className="mt-1 text-xs text-black">{hospitalAddress}</p>

          {/* TABLE */}
          <div className="mt-6 rounded-2xl bg-white p-4 shadow">
            <div className="grid grid-cols-[2fr_1.4fr_1.4fr_1fr_.8fr] rounded-xl border">
              <HeaderCell>INSTRUMENT</HeaderCell>
              <HeaderCell>SERIAL NUMBER</HeaderCell>
              <HeaderCell>INSTALL DATE</HeaderCell>
              <HeaderCell>CONTRACT FILE</HeaderCell>
              <HeaderCell>ACTION</HeaderCell>
            </div>

            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[2fr_1.4fr_1.4fr_1fr_.8fr] border-b"
              >
                {/* Instrument */}
                <BodyCell>
                  <button
                    onClick={() =>
                      router.push(
                        `/hospital/${hospitalId}/instrument/${r.id}`
                      )
                    }
                    className="font-semibold text-black hover:underline"
                  >
                    {r.instrument}
                  </button>
                </BodyCell>

                {/* Serial */}
                <BodyCell>
                  <div>
                    <div className="text-[10px] font-bold text-black">
                      SERIAL NUMBER
                    </div>
                    {r.serial}
                  </div>
                </BodyCell>

                <BodyCell>{r.installDate}</BodyCell>

                {/* CONTRACT FILE BOX */}
                <BodyCell className="justify-center">
                  <label className="cursor-pointer">
                    <Plus size={20} className="text-black" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        handleUpload(e.target.files?.[0] ?? null)
                      }
                    />
                  </label>
                </BodyCell>

                {/* ACTION BOX */}
                <BodyCell className="justify-center gap-4">
                  <button onClick={() => handleDelete(r.id)}>
                    <Trash2 size={20} className="text-red-600" />
                  </button>

                  <button onClick={() => handleEdit(r)}>
                    <Pencil size={20} className="text-green-600" />
                  </button>
                </BodyCell>
              </div>
            ))}
          </div>

          {/* ADD INSTRUMENT */}
          <button
            onClick={() =>
              router.push(`/add-instrument?hospitalId=${hospitalId}`)
            }
            className="mt-8 mx-auto block rounded-2xl bg-white px-16 py-4 text-sm font-extrabold text-black shadow-xl hover:bg-slate-100"
          >
            ADD INSTRUMENT
          </button>

          {/* BACK */}
          <button
            onClick={() => router.push("/")}
            className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black shadow"
          >
            <ArrowLeft size={18} />
            BACK
          </button>
        </section>
      </div>
    </main>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-r px-4 py-4 text-center text-xs font-extrabold text-black last:border-r-0">
      {children}
    </div>
  );
}

function BodyCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center border-r px-4 py-4 text-sm text-black last:border-r-0 ${className}`}
    >
      {children}
    </div>
  );
}
