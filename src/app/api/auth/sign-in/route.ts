import { cookies } from "next/headers";
import { storageKeys } from "../../clients/config";
import { type NextRequest, NextResponse } from "next/server";

// AUTH LOGIN
export async function GET(): Promise<Response> {
  const clientId = process.env.CLIENT_ID;
  const tenantId = process.env.TENANT_ID;
  const response_type = process.env.RESPONSE_TYPE;
  const response_mode = process.env.RESPONSE_MODE;
  const scope = process.env.SCOPE;
  const state = process.env.STATE;
  const code_challenge_method = process.env.CODE_CHALLENGE_METHOD;
  const code_challenge = process.env.CODE_CHALLENGE;
  const baseURL = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

  return Response.json({
    data: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${response_type}&redirect_uri=${baseURL}&response_mode=${response_mode}&scope=${scope}&state=${state}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}`
  })
};

// AUTH GET TOKEN
export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const scope = process.env.SCOPE;
  const codeVerifier = process.env.CODE_CHALLENGE;
  const redirect_uri = process.env.NEXT_PUBLIC_NEXT_BASE_URL!;

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  try {
    const headerParams = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': redirect_uri
    });

    const bodyParams = new URLSearchParams({
      'client_id': clientId || '',
      'scope': scope || '',
      'code': code,
      'redirect_uri': redirect_uri,
      'grant_type': 'authorization_code',
      'code_verifier': codeVerifier || '',
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: headerParams,
      body: bodyParams,
    });

    let accessToken: string | undefined;
    if (response.ok) {
      const data = await response.json();
      accessToken = data.access_token;

      cookies().set(storageKeys.accessToken, accessToken!);
      return NextResponse.json({ data: {accessToken} });
    }

    return NextResponse.json({ statusCode: 401, message: 'Unauthorized' });
  } catch (error: any) {
    console.error('Error exchanging code for token:', error);
  }
};
