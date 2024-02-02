"use server";

import { jwtDecode } from "jwt-decode";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { storageKeys } from "./actions/clients/config";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(storageKeys.accessToken)?.value;

  if (token) {
    const decoded = jwtDecode(token);
    const expMilis = Number(decoded.exp) * 1000;
    const currentMillis = new Date().getTime();
    const isUnhautorized = currentMillis > expMilis;
    console.log(1, expMilis, currentMillis, (expMilis - currentMillis)/1000/60);

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