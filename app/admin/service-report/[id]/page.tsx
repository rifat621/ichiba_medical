"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

type FullReport = {
  id: string;
  hospitalName: string;
  instrumentType: string;
  activityDate: string;
  faultProblem: string;
  repairAction: string;
  status: string;
  createdAt: string;
};

export default function AdminServiceReportDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [report, setReport] = useState<FullReport | null>(null);
  const [loading, setLoading] = useState(true);

  const reportId = params?.id;

  useEffect(() => {
    async function fetchReport() {
      if (!reportId) return;
      try {
        const res = await fetch(`/api/service-reports/${reportId}`);
        const data = await res.json();
        if (data.ok) {
          setReport({
            id: data.report.id,
            hospitalName: data.report.hospitalName,
            instrumentType: data.report.instrumentType,
            activityDate: data.report.activityDate,
            faultProblem: data.report.faultProblem,
            repairAction: data.report.repairAction,
            status: data.report.status,
            createdAt: new Date(data.report.createdAt).toLocaleString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      } catch (error) {
        console.error("Fetch report error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [reportId]);

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

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          {loading ? (
            <div className="py-10 text-center text-sm font-semibold text-slate-500">
              Loading...
            </div>
          ) : !report ? (
            <div className="py-10 text-center text-sm font-semibold text-slate-500">
              Report not found.
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900">
                    SERVICE REPORT DETAIL
                  </h1>
                  <div className="mt-2 text-sm font-extrabold text-slate-900">
                    Report ID: {report.id}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">
                    Submitted: {report.createdAt}
                  </div>
                </div>

            {/* ✅ only back (read-only) */}
            <button
              type="button"
              onClick={() => router.push("/admin/service-report")}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-200"
            >
              <ArrowLeft size={18} />
              BACK
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Hospital" value={report.hospitalName} />
            <Field label="Activity Date" value={report.activityDate} />
            <Field label="Instrument Type" value={report.instrumentType} />
            <Field label="Status" value={report.status} />
            <Field
              label="Fault/Problem Reported"
              value={report.faultProblem}
              multiline
              full
            />
            <Field
              label="Repair Analysis & Action"
              value={report.repairAction}
              multiline
              full
            />
          </div>

              {/* ✅ No edit/save/delete buttons */}
              <div className="mt-8 text-xs font-semibold text-slate-500">
                This page is read-only. Admin cannot modify user submissions.
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  multiline,
  full,
}: {
  label: string;
  value: string;
  multiline?: boolean;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-xs font-extrabold text-slate-700">{label}</div>
      <div
        className={[
          "mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900",
          multiline ? "whitespace-pre-line" : "",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
}
