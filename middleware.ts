import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est authentifié (JWT ou session)
  const token = await getToken({ req: request })
  const sessionToken = request.cookies.get('token')?.value

  const isAuthenticated = token || sessionToken
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register')
  
  // Routes protégées
  const protectedPaths = ['/properties', '/agents']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!isAuthenticated && isProtectedPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si l'utilisateur est authentifié et essaie d'accéder aux pages de login/register
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/properties', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/properties/:path*', '/agents/:path*', '/login', '/register']
} 