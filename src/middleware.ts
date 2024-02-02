"use server";

import { jwtDecode } from "jwt-decode";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { storageKeys } from "./actions/clients/config";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = cookies().get(storageKeys.accessToken)?.value;
  console.log('token', token?.substring(0, 10));
  console.log('res', res);

  if (token) {
    const decoded = jwtDecode(token);
    const expMilis = Number(decoded.exp) * 1000;
    const currentMillis = new Date().getTime();
    const isUnhautorized = currentMillis > expMilis;
    console.log(1);

    if (isUnhautorized) {
      console.log(2);
      req.cookies.delete(storageKeys.accessToken);
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (req.url.endsWith("/login")) {
      console.log(4);
      return NextResponse.redirect(new URL('/home', req.url));
    }
  } else {
    if (!req.url.endsWith("/login")) {
      console.log(3);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|images|$).*)'],
}