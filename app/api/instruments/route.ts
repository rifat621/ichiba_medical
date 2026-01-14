import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hospitalId = String(body.hospitalId || "");
    const name = String(body.name || "");
    const serialNumber = String(body.serialNumber || "");
    const type = String(body.type || "");
    const status = body.status ? String(body.status) : "";

    // kalau kamu belum punya field installDate di schema Instrument,
    // kamu bisa simpan dulu di frontend saja (hapus bagian ini).
    const installDateRaw = body.installDate;
    const installDate = installDateRaw ? new Date(installDateRaw) : null;

    if (!hospitalId || !name || !serialNumber || !type) {
      return NextResponse.json(
        { message: "Missing required fields: hospitalId, name, serialNumber, type" },
        { status: 400 }
      );
    }

    // ✅ cek apakah hospitalId valid
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
      select: { id: true },
    });

    if (!hospital) {
      return NextResponse.json(
        { message: `Hospital not found. hospitalId="${hospitalId}" does not exist in DB.` },
        { status: 400 }
      );
    }

    const created = await prisma.instrument.create({
      data: {
        hospitalId,
        name,
        serialNumber,
        type,
        // NOTE: kalau schema Instrument kamu BELUM punya status/installDate, hapus 2 baris ini
        // status,
        // installDate: installDate ?? new Date(),
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/instruments error:", err);
    return NextResponse.json(
      { message: err?.message || "Failed to create instrument" },
      { status: 500 }
    );
  }
}
