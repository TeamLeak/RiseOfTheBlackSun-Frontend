import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const verifyToken = (token: string | null): boolean => {
  return token !== null && token !== "";
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt-token")?.value; // Получите JWT из cookies

  if (!token && req.nextUrl.pathname === "/profile") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  if (token && !verifyToken(token)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login"],
};
