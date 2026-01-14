"use client";

import { useEffect, useState } from "react";
import { Menu, ArrowLeft, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AddInstrumentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ query params
  const hospitalId = searchParams.get("hospitalId") || "";
  const instrumentId = searchParams.get("instrumentId") || ""; // ✅ kalau ada = edit mode
  const isEdit = !!instrumentId;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // form state
  const [instrument, setInstrument] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [installDate, setInstallDate] = useState("");
  const [status, setStatus] = useState("");

  // ✅ prefill kalau edit (datanya dioper dari query string)
  useEffect(() => {
    const qInstrument = searchParams.get("instrument") || "";
    const qSerial = searchParams.get("serialNumber") || "";
    const qInstall = searchParams.get("installDate") || "";
    const qStatus = searchParams.get("status") || "";

    setInstrument(qInstrument);
    setSerialNumber(qSerial);
    setInstallDate(qInstall);
    setStatus(qStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instrumentId]);

  function goBack() {
    if (hospitalId) {
      router.push(`/hospital/${hospitalId}`);
      return;
    }
    router.push("/");
  }

  async function handleSave() {
    if (!instrument.trim() || !serialNumber.trim() || !installDate.trim()) {
      alert("Instrument, Serial Number, and Install Date are required.");
      return;
    }

    if (!hospitalId) {
      alert("hospitalId is missing. Please open from Hospital page.");
      return;
    }

    const payload = {
      hospitalId,
      name: instrument,
      serialNumber,
      installDate,
      status,
    };

    try {
      const url = isEdit ? `/api/instruments/${instrumentId}` : `/api/instruments`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) {
        console.error("API ERROR:", res.status, text);
        alert(`API Error ${res.status}: ${text}`);
        return;
      }

      alert(isEdit ? "Instrument updated successfully." : "Instrument created successfully.");
      goBack();
    } catch (e: any) {
      console.error("FETCH FAILED:", e?.message || e);
      alert(`Fetch failed: ${e?.message || e}`);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="flex items-start gap-4">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mt-3 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
            aria-label="Menu"
            type="button"
          >
            <Menu size={24} />
          </button>

          {/* Panel */}
          <section className="relative w-full min-h-[650px] rounded-3xl bg-teal-700 px-10 py-8 shadow-2xl">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              {isEdit ? "EDIT INSTRUMENT" : "ADD INSTRUMENT"}
            </h1>

            {/* FORM */}
            <div className="mt-8 space-y-6 pb-28">
              <Field
                label="INSTRUMENT"
                placeholder="*Instrument"
                value={instrument}
                onChange={setInstrument}
              />

              <Field
                label="SERIAL NUMBER"
                placeholder="*Serial Number"
                value={serialNumber}
                onChange={setSerialNumber}
              />

              <Field
                label="INSTALL DATE"
                placeholder="*Install Date"
                value={installDate}
                onChange={setInstallDate}
                type="date"
              />

              <Field
                label="STATUS (OPTIONAL)"
                placeholder="Status"
                value={status}
                onChange={setStatus}
              />
            </div>

            {/* BACK BUTTON */}
            <button
              onClick={goBack}
              className="absolute bottom-6 left-8 flex items-center gap-3 rounded-full bg-white px-5 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              aria-label="Back"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <ArrowLeft size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">BACK</span>
            </button>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              className="absolute bottom-6 right-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 text-teal-700 shadow-xl hover:bg-slate-100"
              aria-label="Save"
              type="button"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
                <Save size={18} />
              </span>
              <span className="text-sm font-extrabold tracking-wide">SAVE</span>
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
