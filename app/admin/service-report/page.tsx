"use client";

import { useMemo, useState, useEffect } from "react";
import { Menu, Search, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

type Report = {
  id: string;
  hospitalName: string;
  instrumentType: string;
  activityDate: string; // YYYY-MM-DD
  status: string;
  createdAt: string; // ISO / text
};

type ApiReport = {
  id: string;
  hospitalName: string;
  instrumentType: string;
  activityDate: string;
  status: string;
  createdAt: string;
};

export default function AdminServiceReportPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [q, setQ] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/service-reports");
        const data = await res.json() as { ok: boolean; reports?: ApiReport[] };
        if (data.ok && data.reports) {
          setReports(
            data.reports.map((r: ApiReport): Report => ({
              id: r.id,
              hospitalName: r.hospitalName,
              instrumentType: r.instrumentType,
              activityDate: r.activityDate,
              status: r.status,
              createdAt: new Date(r.createdAt).toLocaleString("id-ID", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
            }))
          );
        }
      } catch (error) {
        console.error("Fetch reports error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key) return reports;
    return reports.filter((r) => {
      return (
        r.hospitalName.toLowerCase().includes(key) ||
        r.instrumentType.toLowerCase().includes(key) ||
        r.status.toLowerCase().includes(key) ||
        r.id.toLowerCase().includes(key)
      );
    });
  }, [q, reports]);

  return (
    <main className="min-h-screen bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-black hover:bg-slate-100"
          type="button"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-4xl font-black tracking-wide text-slate-900">
          SERVICE REPORT
        </h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Admin can only view submitted reports (read-only).
        </p>

        {/* search */}
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <Search className="text-slate-500" size={20} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by hospital, instrument, status, or ID..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* table */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid grid-cols-[1.1fr_2.2fr_1.6fr_1.2fr_1.2fr_.6fr] bg-slate-100 px-6 py-4 text-xs font-extrabold text-slate-900">
            <div>REPORT ID</div>
            <div>HOSPITAL</div>
            <div>INSTRUMENT</div>
            <div>ACTIVITY DATE</div>
            <div>STATUS</div>
            <div className="text-center">VIEW</div>
          </div>

          <div className="divide-y divide-slate-200">
            {loading ? (
              <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                Loading...
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm font-semibold text-slate-500">
                No reports found.
              </div>
            ) : (
              filtered.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[1.1fr_2.2fr_1.6fr_1.2fr_1.2fr_.6fr] items-center px-6 py-4"
                >
                  <div className="text-sm font-extrabold text-slate-900">
                    {r.id}
                    <div className="mt-1 text-[11px] font-semibold text-slate-500">
                      {r.createdAt}
                    </div>
                  </div>

                  <div className="text-sm font-extrabold text-slate-900">
                    {r.hospitalName}
                  </div>

                  <div className="text-sm font-semibold text-slate-900">
                    {r.instrumentType}
                  </div>

                  <div className="text-sm font-semibold text-slate-900">
                    {r.activityDate}
                  </div>

                  <div className="text-sm font-extrabold text-slate-900">
                    {r.status}
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => router.push(`/admin/service-report/${r.id}`)}
                      className="grid h-10 w-10 place-items-center rounded-xl hover:bg-slate-100"
                      title="View detail"
                      aria-label="View"
                    >
                      <Eye className="text-teal-700" size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
