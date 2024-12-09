import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Protéger la route de création d'annonce
  if (path === '/properties/create') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Vérifier si l'utilisateur est un agent
    const isAgent = token.role === 'AGENT' || token.role === 'AGENT_PREMIUM'
    if (!isAgent) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/properties/create']
} 