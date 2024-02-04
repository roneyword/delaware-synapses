// import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { storageKeys } from "./actions/clients/config";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = cookies().get('access_token')?.value;
  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }

  // if (token) {
  //   const decoded = jwtDecode(token);
  //   const expMilis = Number(decoded.exp) * 1000;
  //   const currentMillis = new Date().getTime();
  //   const isUnhautorized = currentMillis > expMilis;
  //   console.log(1);

  //   if (isUnhautorized) {
  //     console.log(2);
  //     localStorage.removeItem(storageKeys.accessToken);
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }

  //   if (req.url.endsWith("/login")) {
  //     console.log(4);
  //     return NextResponse.redirect(new URL('/home', req.url));
  //   }
  // } else {
  //   if (!req.url.endsWith("/login")) {
  //     console.log(3);
  //     return NextResponse.redirect(new URL('/login', req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|images|$).*)'],
}