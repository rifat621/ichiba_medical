"use client";

import { useState } from "react";
import { Menu, ChevronDown, ChevronUp, ArrowLeft, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";

type Option = {
  id: string;
  label: string;
};

export default function ServiceReportFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hospitalName = searchParams.get("hospital") ?? "-";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ===== Instrument =====
  const [openInstrument, setOpenInstrument] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState("");

  const instruments: Option[] = [
    { id: "1", label: "Pentra 400 / C400 | SN3485T | KSO" },
    { id: "2", label: "Pentra C200 | SN 39480P | KSO" },
    { id: "3", label: "Micros 60 / ES 60 | SNIEJHU4RE | KSO" },
  ];

  // ===== Status =====
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statuses: Option[] = [
    { id: "s1", label: "Operational" },
    { id: "s2", label: "Not Operational / Pending (Need Part)" },
    { id: "s3", label: "To be Monitored" },
    { id: "s4", label: "For Refurbished" },
  ];

  // ===== Other fields =====
  const [activityDate, setActivityDate] = useState("");
  const [fault, setFault] = useState("");
  const [analysis, setAnalysis] = useState("");

  function handleSave() {
    if (
      !selectedInstrument ||
      !activityDate ||
      !fault.trim() ||
      !analysis.trim() ||
      !selectedStatus
    ) {
      alert("Please complete all fields.");
      return;
    }

    const payload = {
      hospital: hospitalName,
      instrument: selectedInstrument,
      activityDate,
      fault,
      analysis,
      status: selectedStatus,
    };

    console.log("SERVICE REPORT DATA:", payload);
    alert("Service report saved successfully (demo).");

    router.push("/service-report");
  }

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
          type="button"
        >
          <Menu size={24} />
        </button>

        {/* Panel */}
        <section className="relative overflow-hidden rounded-3xl bg-teal-700 px-8 py-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-extrabold tracking-wide text-white">
              SERVICE REPORT FORM
            </h1>
            <div className="text-xs font-extrabold text-yellow-300">
              CUSTOMER : {hospitalName.toUpperCase()}
            </div>
          </div>

          {/* White box */}
          <div className="mt-6 rounded-2xl bg-white px-8 py-8 pb-32 shadow-2xl">
            {/* Types of Instrument */}
            <div>
              <label className="text-sm font-extrabold text-teal-700">
                Types of Instrument
              </label>

              <button
                type="button"
                onClick={() => {
                  setOpenInstrument((p) => !p);
                  setOpenStatus(false);
                }}
                className="mt-2 flex w-full items-center justify-between rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-teal-900"
              >
                {selectedInstrument || "Select Instrument"}
                {openInstrument ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openInstrument && (
                <div className="mt-4 rounded-2xl bg-teal-600 p-6">
                  {instruments.map((i) => (
                    <button
                      key={i.id}
                      onClick={() => {
                        setSelectedInstrument(i.label);
                        setOpenInstrument(false);
                      }}
                      className="mb-3 block w-full rounded-xl bg-teal-700/50 px-4 py-3 text-left text-sm font-extrabold text-white hover:bg-teal-700"
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Date */}
            <div className="mt-6">
              <label className="text-sm font-extrabold text-teal-700">
                Activity Date
              </label>
              <input
                type="date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className="mt-2 w-full rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-teal-900"
              />
            </div>

            {/* Fault */}
            <div className="mt-6">
              <label className="text-sm font-extrabold text-teal-700">
                Fault / Problem Reported
              </label>
              <textarea
                value={fault}
                onChange={(e) => setFault(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-teal-900"
              />
            </div>

            {/* Analysis */}
            <div className="mt-6">
              <label className="text-sm font-extrabold text-teal-700">
                Repair Analysis & Action
              </label>
              <textarea
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-teal-900"
              />
            </div>

            {/* Status */}
            <div className="mt-6">
              <label className="text-sm font-extrabold text-teal-700">
                Status
              </label>

              <button
                type="button"
                onClick={() => {
                  setOpenStatus((p) => !p);
                  setOpenInstrument(false);
                }}
                className="mt-2 flex w-full items-center justify-between rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-teal-900"
              >
                {selectedStatus || "Select Status"}
                {openStatus ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openStatus && (
                <div className="mt-4 rounded-2xl bg-teal-600 p-6">
                  {statuses.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedStatus(s.label);
                        setOpenStatus(false);
                      }}
                      className="mb-3 block w-full rounded-xl bg-teal-700/50 px-4 py-3 text-left text-sm font-extrabold text-white hover:bg-teal-700"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BACK */}
          <button
            onClick={() => router.push("/service-report")}
            className="absolute bottom-8 left-10 flex items-center gap-3 rounded-full bg-white px-6 py-3 font-extrabold text-teal-700 shadow-xl hover:bg-slate-100"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
              <ArrowLeft size={18} />
            </span>
            BACK
          </button>

          {/* SAVE */}
          <button
            onClick={handleSave}
            className="absolute bottom-8 right-10 flex items-center gap-3 rounded-full bg-white px-6 py-3 font-extrabold text-teal-700 shadow-xl hover:bg-slate-100"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-700 text-white">
              <Save size={18} />
            </span>
            SAVE
          </button>
        </section>
      </div>
    </main>
  );
}
