import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies?.get('isAuthenticated');
  // if (auth?.value !== 'true') {
  //   // Redirect to the login page
  //   return NextResponse.rewrite(new URL('/login', request.url))
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/profile",
};
