import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// List of paths that require authentication
const protectedPaths = ["/profile-tracker", "/question-tracker", "/event-tracker", "/sheets", "/platforms", "/projects"]

// List of paths that should redirect to dashboard if already authenticated
const authPaths = ["/sign-in", "/sign-up"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is protected or an auth path
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAuthPath = authPaths.some((path) => pathname === path)

  // If neither protected nor auth path, allow the request
  if (!isProtectedPath && !isAuthPath) {
    return NextResponse.next()
  }

  // Get the token from the request
  const token = await getToken({ req: request })

  // If the path is protected and there's no token, redirect to sign-in
  if (isProtectedPath && !token) {
    const url = new URL("/sign-in", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // If the path is an auth path and there's a token, redirect to dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/profile-tracker", request.url))
  }

  // Allow the request
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
