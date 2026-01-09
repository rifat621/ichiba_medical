"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Dummy data (contoh)
  const lineData = useMemo(
    () => [
      { month: "Jul", reports: 12 },
      { month: "Aug", reports: 19 },
      { month: "Sep", reports: 15 },
      { month: "Oct", reports: 22 },
      { month: "Nov", reports: 28 },
      { month: "Dec", reports: 25 },
    ],
    []
  );

  const barData = useMemo(
    () => [
      { name: "RS Hasanuddin", instruments: 34 },
      { name: "RS Makassar", instruments: 22 },
      { name: "RS Kota", instruments: 18 },
      { name: "RS Sehat", instruments: 27 },
    ],
    []
  );

  const pieData = useMemo(
    () => [
      { name: "Aktif", value: 68 },
      { name: "Maintenance", value: 22 },
      { name: "Rusak", value: 10 },
    ],
    []
  );

  const cards = useMemo(
    () => [
      { title: "Total Rumah Sakit", value: "12" },
      { title: "Total Instrumen", value: "101" },
      { title: "Aktif Hari Ini", value: "68" },
      { title: "Maintenance", value: "22" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* TopBar reuse (search optional, boleh dikosongkan) */}
        <TopBar
          onMenu={() => setSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
        />

        <h1 className="mt-8 text-xl font-extrabold text-slate-800">
          DASHBOARD
        </h1>

        {/* Stat cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl bg-teal-700 p-5 text-white shadow-lg ring-1 ring-black/5"
            >
              <div className="text-xs font-bold opacity-90">{c.title}</div>
              <div className="mt-2 text-3xl font-extrabold">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Line chart */}
          <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
            <div className="mb-3 text-sm font-extrabold text-slate-800">
              Laporan per Bulan
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reports" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar chart */}
          <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
            <div className="mb-3 text-sm font-extrabold text-slate-800">
              Jumlah Instrumen per Rumah Sakit
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="instruments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              (Nama RS disembunyikan biar tidak kepanjangan. Bisa ditampilkan kalau
              mau.)
            </div>
          </div>

          {/* Pie chart */}
          <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 lg:col-span-2">
            <div className="mb-3 text-sm font-extrabold text-slate-800">
              Status Instrumen
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {/* Tidak set warna khusus; Recharts pakai default lalu kita aman */}
                      {pieData.map((_, idx) => (
                        <Cell key={idx} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm font-bold text-slate-700">
                  Ringkasan
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {pieData.map((p) => (
                    <li key={p.name} className="flex items-center justify-between">
                      <span>{p.name}</span>
                      <span className="font-bold">{p.value}%</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-4 w-full rounded-xl bg-teal-700 py-2 text-sm font-extrabold text-white hover:opacity-95"
                  onClick={() => alert("Contoh action: export / lihat detail")}
                >
                  LIHAT DETAIL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table (opsional) */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
          <div className="mb-3 text-sm font-extrabold text-slate-800">
            Aktivitas Terbaru
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2">Tanggal</th>
                  <th className="py-2">Rumah Sakit</th>
                  <th className="py-2">Instrumen</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {[
                  { d: "2026-01-07", rs: "RS Hasanuddin", ins: "ECG Monitor", st: "Aktif" },
                  { d: "2026-01-06", rs: "RS Makassar", ins: "X-Ray", st: "Maintenance" },
                  { d: "2026-01-05", rs: "RS Kota", ins: "Ventilator", st: "Aktif" },
                ].map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{r.d}</td>
                    <td className="py-2">{r.rs}</td>
                    <td className="py-2">{r.ins}</td>
                    <td className="py-2 font-semibold">{r.st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
