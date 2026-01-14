import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// GET /api/service-reports - Get all service reports
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const where: any = {};
    if (userId) {
      where.userId = userId;
    }

    const serviceReports = await prisma.serviceReport.findMany({
      where,
      include: {
        hospital: {
          select: {
            id: true,
            name: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format response
    const formattedReports = serviceReports.map((report) => ({
      id: report.id,
      hospitalName: report.hospital.name,
      instrumentType: `${report.instrument.name} | ${report.instrument.serialNumber} | ${report.instrument.type}`,
      activityDate: report.activityDate.toISOString().split("T")[0],
      fault: report.fault,
      analysis: report.analysis,
      status: report.status,
      createdAt: report.createdAt.toISOString(),
      user: report.user,
    }));

    return NextResponse.json({ ok: true, reports: formattedReports });
  } catch (error) {
    console.error("Get service reports error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/service-reports - Create new service report
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth")?.value;

    if (!auth || auth !== "1") {
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { hospitalName, instrument, activityDate, fault, analysis, status } =
      await req.json();

    if (!hospitalName || !instrument || !activityDate || !fault || !analysis || !status) {
      return NextResponse.json(
        { ok: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Parse instrument string (format: "Name | SerialNumber | Type")
    const instrumentParts = instrument.split("|").map((s: string) => s.trim());
    if (instrumentParts.length < 3) {
      return NextResponse.json(
        { ok: false, message: "Invalid instrument format" },
        { status: 400 }
      );
    }

    const [instrumentName, serialNumber, instrumentType] = instrumentParts;

    // Find or create hospital
    let hospital = await prisma.hospital.findUnique({
      where: { name: hospitalName },
    });

    if (!hospital) {
      hospital = await prisma.hospital.create({
        data: { name: hospitalName },
      });
    }

    // Find or create instrument
    let instrumentRecord = await prisma.instrument.findFirst({
      where: {
        hospitalId: hospital.id,
        serialNumber: serialNumber,
      },
    });

    if (!instrumentRecord) {
      instrumentRecord = await prisma.instrument.create({
        data: {
          name: instrumentName,
          serialNumber: serialNumber,
          type: instrumentType,
          hospitalId: hospital.id,
        },
      });
    }

    // Get user from session
    const userId = cookieStore.get("userId")?.value;
    if (!userId) {
      return NextResponse.json(
        { ok: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create service report
    const serviceReport = await prisma.serviceReport.create({
      data: {
        hospitalId: hospital.id,
        instrumentId: instrumentRecord.id,
        userId: user.id,
        activityDate: new Date(activityDate),
        fault: fault,
        analysis: analysis,
        status: status,
      },
      include: {
        hospital: true,
        instrument: true,
        user: true,
      },
    });

    return NextResponse.json({ ok: true, report: serviceReport }, { status: 201 });
  } catch (error) {
    console.error("Create service report error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
