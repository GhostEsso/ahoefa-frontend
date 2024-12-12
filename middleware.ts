import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Routes qui nécessitent une authentification
  const protectedRoutes = [
    '/properties/create',
    '/agents',
    '/profile',
    '/profile/edit'
  ]

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!token && protectedRoutes.some(route => path.startsWith(route))) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/properties/create',
    '/agents/:path*',
    '/profile/:path*'
  ]
} 