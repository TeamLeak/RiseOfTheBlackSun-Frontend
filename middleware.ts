import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const verifyToken = (token: string | null): boolean => {
  return token !== null && token !== "";
};

export function middleware(req: NextRequest) {

  return NextResponse.next();
}

export const config = {
  matcher: [],
};
