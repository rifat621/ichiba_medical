"use client";

import { useRouter } from "next/navigation";

export type Hospital = {
  id: string;
  name: string;
  address: string;
};

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/hospital/${hospital.id}`)}
      className="relative h-44 w-full overflow-hidden rounded-2xl bg-teal-700 p-4 text-left text-white shadow-lg ring-1 ring-black/5"
      aria-label={`Buka detail ${hospital.name}`}
      type="button"
    >
      <div className="absolute inset-0 opacity-30" />

      <div className="relative flex h-full flex-col justify-end">
        <div className="text-sm font-semibold leading-snug">{hospital.name}</div>

        <div className="mt-1 text-[11px] leading-snug text-white/90 line-clamp-3">
          {hospital.address}
        </div>
      </div>
    </button>
  );
}
