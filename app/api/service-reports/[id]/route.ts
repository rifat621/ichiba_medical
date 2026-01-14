import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET /api/service-reports/[id] - Get service report by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const serviceReport = await prisma.serviceReport.findUnique({
      where: { id },
      include: {
        hospital: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        instrument: {
          select: {
            id: true,
            name: true,
            serialNumber: true,
            type: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    if (!serviceReport) {
      return NextResponse.json(
        { ok: false, message: "Service report not found" },
        { status: 404 }
      );
    }

    // ✅ Format response
    const formattedReport = {
      id: serviceReport.id,
      hospitalName: serviceReport.hospital.name,
      instrumentType: `${serviceReport.instrument.name} | ${serviceReport.instrument.serialNumber} | ${serviceReport.instrument.type}`,
      activityDate: serviceReport.activityDate.toISOString().split("T")[0],
      faultProblem: serviceReport.fault,
      repairAction: serviceReport.analysis,
      status: serviceReport.status,
      createdAt: serviceReport.createdAt.toISOString(),
      user: serviceReport.user,
    };

    return NextResponse.json({ ok: true, report: formattedReport });
  } catch (error) {
    console.error("Get service report error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/service-reports/[id] - Delete service report by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ✅ cek dulu apakah datanya ada
    const exists = await prisma.serviceReport.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!exists) {
      return NextResponse.json(
        { ok: false, message: "Service report not found" },
        { status: 404 }
      );
    }

    await prisma.serviceReport.delete({
      where: { id },
    });

    return NextResponse.json({
      ok: true,
      message: "Service report deleted successfully",
    });
  } catch (error) {
    console.error("Delete service report error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
