"use client";

import { useMemo, useState } from "react";
import { Menu, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

type Hospital = {
  id: string;
  name: string;
};

export default function ServiceReportPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 Sample hospital data
  const hospitals: Hospital[] = [
    { id: "1", name: "RUMAH SAKIT UNIVERSITAS HASANUDDIN" },
    { id: "2", name: "RUMAH SAKIT STELLA MARIS" },
    { id: "3", name: "RUMAH SAKIT DR. WAHIDIN SUDIROHUSODO" },
  ];

  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);

  // 🔹 Filter hospitals
  const filteredHospitals = useMemo(() => {
    if (!showList && !query.trim()) return [];

    if (!query.trim()) return hospitals;

    return hospitals.filter((h) =>
      h.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, hospitals, showList]);

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* ☰ Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-slate-700 hover:bg-slate-100"
          type="button"
        >
          <Menu size={24} />
        </button>

        {/* Main Section */}
        <section className="relative min-h-[650px] overflow-hidden rounded-3xl bg-white px-6 py-6">
          {/* Background bubbles */}
          <div className="pointer-events-none absolute -left-28 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-teal-200/70" />
          <div className="pointer-events-none absolute right-16 bottom-10 h-[360px] w-[360px] rounded-full bg-teal-200/70" />

          <div className="relative">
            <h1 className="text-[44px] font-black tracking-wide text-slate-800">
              SERVICE REPORT
            </h1>

            <div className="mt-6 max-w-4xl">
              <div className="text-xs font-extrabold tracking-wide text-teal-700">
                SELECT HOSPITAL
              </div>

              {/* 🟡 Search Bar */}
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-yellow-300 px-4 py-3 shadow">
                <Search className="text-white" size={22} />

                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowList(true);
                  }}
                  placeholder="Searching..."
                  className="w-full bg-transparent text-sm font-extrabold text-teal-900 placeholder-teal-900/60 outline-none"
                />

                {/* 🔽🔼 Toggle Arrow */}
                <button
                  type="button"
                  onClick={() => setShowList((prev) => !prev)}
                  className="grid h-10 w-10 place-items-center rounded-lg hover:bg-white/20"
                >
                  {showList ? (
                    <ChevronUp className="text-white" size={22} />
                  ) : (
                    <ChevronDown className="text-white" size={22} />
                  )}
                </button>
              </div>

              {/* 🟢 Hospital List */}
              {showList && (
                <div className="mt-6 rounded-2xl bg-teal-600 shadow-xl">
                  <div className="px-6 py-5 text-xs font-extrabold text-white">
                    HOSPITAL LIST
                  </div>

                  <div className="px-6 pb-8 space-y-3">
                    {filteredHospitals.length === 0 ? (
                      <div className="rounded-xl bg-teal-700/40 px-4 py-4 text-sm font-semibold text-white">
                        No hospital found.
                      </div>
                    ) : (
                      filteredHospitals.map((h) => (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() =>
                            router.push(
                              `/service-report/form?hospital=${encodeURIComponent(
                                h.name
                              )}`
                            )
                          }
                          className="w-full rounded-xl bg-teal-700/40 px-4 py-4 text-left text-sm font-extrabold tracking-wide text-white shadow hover:bg-teal-700/60"
                        >
                          {h.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
