import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security Headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Content-Security-Policy intentionally NOT set here.
  // It is defined once, centrally, in next.config.js's headers() function.
  // Setting it in both places causes the browser to enforce BOTH policies
  // simultaneously, which silently blocks anything the stricter one excludes
  // (this was why the ad scripts were getting blocked).

  return response
}

export const config = {
  matcher: '/:path*',
}
