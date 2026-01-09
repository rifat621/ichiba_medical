"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import HospitalCard from "@/components/HospitalCard";
import AddHospitalCard from "@/components/AddHospitalCard";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Data rumah sakit (nama/alamat boleh tetap Indonesia)
  const hospitals = [
    {
      id: "1",
      name: "Rumah Sakit Universitas Hasanuddin",
      address: "Jl. Perintis Kemerdekaan KM.10, Makassar, Sulawesi Selatan",
    },
  ];

  const filtered = hospitals.filter((h) =>
    (h.name + " " + h.address).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="mx-auto max-w-6xl px-6 py-6">
        <TopBar
          onMenu={() => setSidebarOpen(true)}
          search={search}
          onSearchChange={setSearch}
        />

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Add Hospital (first) */}
          <AddHospitalCard />

          {filtered.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
        </div>
      </div>
    </main>
  );
}
