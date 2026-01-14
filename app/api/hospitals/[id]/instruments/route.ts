import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  try {
    const { id: hospitalId } = await ctx.params;

    const instruments = await prisma.instrument.findMany({
      where: { hospitalId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        serialNumber: true,
        type: true,
        // kalau kamu belum punya field installDate/status di schema, hapus 2 baris ini
        installDate: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: instruments });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch instruments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, ctx: Ctx) {
  try {
    const { id: hospitalId } = await ctx.params;
    const body = await req.json();

    // FE kamu biasanya ngirim: instrument, serialNumber, installDate, status
    // Schema prisma: name, serialNumber, type (+optional installDate/status kalau ada)
    const name: string = (body.name ?? body.instrument ?? "").toString();
    const serialNumber: string = (body.serialNumber ?? "").toString();
    const type: string = (body.type ?? "Instrument").toString(); // default
    const status: string | null =
      body.status !== undefined ? String(body.status) : null;

    const installDate: Date | null =
      body.installDate ? new Date(String(body.installDate)) : null;

    if (!name.trim() || !serialNumber.trim()) {
      return NextResponse.json(
        { error: "name/instrument and serialNumber are required" },
        { status: 400 }
      );
    }

    const created = await prisma.instrument.create({
      data: {
        hospitalId,
        name,
        serialNumber,
        type,
        // kalau schema kamu belum punya installDate/status, hapus 2 baris ini
        installDate,
        status,
      },
      select: {
        id: true,
        name: true,
        serialNumber: true,
        type: true,
        // kalau schema kamu belum punya installDate/status, hapus 2 baris ini
        installDate: true,
        status: true,
      },
    });

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create instrument" },
      { status: 500 }
    );
  }
}
