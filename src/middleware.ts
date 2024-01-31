import { jwtDecode } from "jwt-decode";
import { storageKeys } from "./app/api/clients/config";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get(storageKeys.accessToken)?.value;

  if (token) {
    const decoded = jwtDecode(token);
    console.log(decoded);
  }

  if (!token && !req.url.endsWith("/login")) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && req.url.endsWith("/login")) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|images|$).*)'],
}