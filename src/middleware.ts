import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || request.headers.get('authorization')?.replace('Bearer ', '') || ''

  const isAuthenticated = !!token

  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/payrolls', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/payrolls/:path*', '/login'],
}