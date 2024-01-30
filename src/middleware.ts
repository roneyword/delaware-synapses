import { cookies } from "next/headers";
import { storageKeys } from "./app/api/clients/config";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = cookies().get(storageKeys.accessToken)?.value;

  // if (!token && !req.url.endsWith("/login")) {
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }

  // if (token && req.url.endsWith("/login")) {
  //   return NextResponse.redirect(new URL('/home', req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)'],
}