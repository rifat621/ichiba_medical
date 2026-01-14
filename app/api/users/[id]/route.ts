import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { username, name, role, password } = await req.json();

    if (!username && !name && !role && !password) {
      return NextResponse.json(
        { ok: false, message: "No fields provided to update" },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = {};

    if (username) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser && existingUser.id !== id) {
        return NextResponse.json(
          { ok: false, message: "Username already exists" },
          { status: 400 }
        );
      }
      data.username = username;
    }

    if (name) data.name = name;
    if (role) data.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, user: updated });
  } catch (error: any) {
    console.error("Update user error:", error);
    if (error?.code === "P2025") {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        serviceReports: {
          select: { id: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deletion of ADMIN users
    if (user.role === "ADMIN") {
      return NextResponse.json(
        { 
          ok: false, 
          message: "Cannot delete admin user. Admin accounts are protected." 
        },
        { status: 403 }
      );
    }

    // Check if user has service reports
    if (user.serviceReports.length > 0) {
      return NextResponse.json(
        { 
          ok: false, 
          message: `Cannot delete user. User has ${user.serviceReports.length} service report(s). Please delete the service reports first.` 
        },
        { status: 400 }
      );
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Delete user error:", error);
    
    // Handle Prisma errors
    if (error?.code === "P2025") {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 }
      );
    }
    
    // Handle foreign key constraint errors
    if (error?.code === "P2003" || error?.message?.includes("foreign key")) {
      return NextResponse.json(
        { 
          ok: false, 
          message: "Cannot delete user. User is referenced by service reports. Please delete the service reports first." 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { ok: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
