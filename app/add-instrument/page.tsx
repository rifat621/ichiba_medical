"use client";

import { useMemo, useState } from "react";
import { Menu, ArrowLeft, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AddInstrumentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hospitalId = searchParams.get("hospitalId") || "";

  const isEdit = useMemo(() => {
    return (
      !!searchParams.get("instrument") ||
      !!searchParams.get("serialNumber") ||
      !!searchParams.get("installDate") ||
      !!searchParams.get("status")
    );
  }, [searchParams]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [instrument, setInstrument] = useState(searchParams.get("instrument") || "");
  const [serialNumber, setSerialNumber] = useState(searchParams.get("serialNumber") || "");
  const [installDate, setInstallDate] = useState(searchParams.get("installDate") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  function goBack() {
    if (hospitalId) return router.push(`/hospital/${hospitalId}`);
    router.push("/");
  }

  function handleSave() {
    if (!instrument.trim() || !serialNumber.trim() || !installDate.trim() || !status.trim()) {
      alert("All fields are required.");
      return;
    }

    console.log("INSTRUMENT DATA:", {
      mode: isEdit ? "edit" : "add",
      hospitalId,
      instrument,
      serialNumber,
      installDate,
      status,
    });

    alert(isEdit ? "Instrument updated (demo)." : "Instrument saved (demo).");
    goBack();
  }

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
              {isEdit ? "EDIT HOSPITAL INSTRUMENT" : "ADD HOSPITAL INSTRUMENT"}
            </h1>

            <div className="mt-8 space-y-6 pb-28">
              <Field label="INSTRUMENT" placeholder="Instrument" value={instrument} onChange={setInstrument} />
              <Field label="SERIAL NUMBER" placeholder="Serial number" value={serialNumber} onChange={setSerialNumber} />
              <Field label="INSTALL DATE" placeholder="Install date" value={installDate} onChange={setInstallDate} type="date" />
              <Field label="STATUS" placeholder="Status" value={status} onChange={setStatus} />
            </div>

            <button
              onClick={goBack}
              className="absolute bottom-6 left-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <ArrowLeft size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">BACK</span>
            </button>

            <button
              onClick={handleSave}
              className="absolute bottom-6 right-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <Save size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">
                {isEdit ? "UPDATE" : "SAVE"}
              </span>
            </button>
          </section>
        </div>
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
        className="mt-2 w-full rounded-full bg-white px-5 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-white/50"
      />
    </div>
  );
}
