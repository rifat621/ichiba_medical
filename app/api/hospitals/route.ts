import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/hospitals - Get all hospitals
export async function GET() {
  try {
    const hospitals = await prisma.hospital.findMany({
      include: {
        instruments: {
          select: {
            id: true,
            name: true,
            serialNumber: true,
            type: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ ok: true, hospitals });
  } catch (error) {
    console.error("Get hospitals error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/hospitals - Create new hospital
export async function POST(req: Request) {
  try {
    const { name, address } = await req.json();

    if (!name) {
      return NextResponse.json(
        { ok: false, message: "Hospital name is required" },
        { status: 400 }
      );
    }

    // Check if hospital already exists
    const existingHospital = await prisma.hospital.findUnique({
      where: { name },
    });

    if (existingHospital) {
      return NextResponse.json(
        { ok: false, message: "Hospital already exists" },
        { status: 400 }
      );
    }

    const hospital = await prisma.hospital.create({
      data: {
        name,
        address: address || null,
      },
      include: {
        instruments: true,
      },
    });

    return NextResponse.json({ ok: true, hospital }, { status: 201 });
  } catch (error) {
    console.error("Create hospital error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
