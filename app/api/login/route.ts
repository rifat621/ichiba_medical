import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { ok: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Determine role for middleware
    const role = user.role === "ADMIN" ? "admin" : "user";

    const res = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });

    // Set auth cookie
    res.cookies.set("auth", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    // Set role cookie for middleware
    res.cookies.set("role", role, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    // Set user ID cookie for API usage
    res.cookies.set("userId", user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
