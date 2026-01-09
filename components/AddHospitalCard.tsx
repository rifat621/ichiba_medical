import Link from "next/link";
import { Plus } from "lucide-react";

export default function AddHospitalCard() {
  return (
    <Link
      href="/add-hospital"
      className="grid h-44 place-items-center rounded-2xl bg-teal-600 text-white shadow-lg ring-1 ring-black/5 hover:bg-teal-700"
      aria-label="Tambahkan Rumah Sakit"
    >
      <div className="flex flex-col items-center">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
          <Plus size={26} />
        </div>
        <div className="mt-3 text-xs font-semibold tracking-wide">
          ADD NEW HOSPITAL
        </div>
      </div>
    </Link>
  );
}
