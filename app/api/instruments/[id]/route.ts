import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, serialNumber } = body;

    if (!name || !serialNumber) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updated = await prisma.instrument.update({
      where: { id: params.id },
      data: {
        name,
        serialNumber,
      },
    });

    return NextResponse.json(updated);
  } catch (e: any) {
    console.error(e);
    return new NextResponse("Server error", { status: 500 });
  }
}
