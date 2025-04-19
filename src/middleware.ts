import { NextRequest, NextResponse } from "next/server";

// Middleware function
export function middleware(request:NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/register", "/","/verificationOPT","/recovery-password"];
  const isPublicPath = publicPaths.includes(path);
  const authPaths = ["/dashboard", "/builder","/review"];
  const isAuthPath = authPaths.some(authPath => path.startsWith(authPath));

  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
  const token = cookies["refreshToken"] || "";

  
  // Redirection logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  } else if (isAuthPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

// Define protected and public routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/builder/:path*",
    "/review/:path*",
    "/login",
    "/register",
    "/",
    "/verificationOPT",
    "/recovery-password"
  ],
};
