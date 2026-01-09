import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const ok = username === "admin" && password === "admin123";
  if (!ok) {
    return NextResponse.json({ ok: false, message: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  res.cookies.set("auth", "1", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  return res;
}
