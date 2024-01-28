import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { onGenerateAccesTokenByCode } from "./app/api/auth";
import { storageKeys } from "./app/api/clients/config";

export async function middleware(request: NextRequest) {
  const [baseURL, code] = request.url.split('code=');
  console.log('middleware', baseURL, code);

  const accessToken = await onGenerateAccesTokenByCode(code, baseURL);
  const response = NextResponse.next()
  response.cookies.set(storageKeys.accessToken, accessToken);

  return NextResponse.redirect(new URL(`/home`, request.url));
}

export const config = {
  matcher: '/',
}