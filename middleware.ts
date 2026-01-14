import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Jangan ganggu endpoint API
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const auth = req.cookies.get("auth")?.value;
  const role = req.cookies.get("role")?.value;

  const isLoggedIn = auth === "1";

  // halaman yang bebas akses
  const publicPaths = ["/login"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // admin route hanya boleh role admin
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // ✅ exclude api juga
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
