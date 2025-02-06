import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public routes that don't require authentication
  const isPublicRoute = ['/login', '/signup', '/', '/verify-email', '/forgot-password'].includes(path)

  // Get token from cookies instead of headers
  const token = request.cookies.get('access_token')?.value

  // Function to validate token
  const isValidToken = (token: string) => {
    try {
      const [header, payload, signature] = token.split('.')
      if (!header || !payload || !signature) {
        return false
      }

      // Decode payload
      const decodedPayload = JSON.parse(atob(payload))
      
      // Check token expiration
      if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
        return false
      }

      // Check required claims
      if (!decodedPayload.sub || !decodedPayload.roles) {
        return false
      }

      return true
    } catch {
      return false
    }
  }

  // If token exists, validate it
  if (token && !isValidToken(token)) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('access_token')
    return response
  }

  // If the user is not authenticated and trying to access a protected route
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', path)
    return NextResponse.redirect(loginUrl)
  }

  // If the user is authenticated and trying to access login/signup
  if (token && ['/login', '/signup'].includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
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
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|$).*)',
  ],
} 