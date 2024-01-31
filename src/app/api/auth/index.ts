"use server";

import { cookies } from 'next/headers'
import { storageKeys } from "../clients/config";

// AUTH LOGIN
export const onMicrosoftSignIn = async () => {
  const clientId = process.env.CLIENT_ID;
  const tenantId = process.env.TENANT_ID;
  const response_type = process.env.RESPONSE_TYPE;
  const response_mode = process.env.RESPONSE_MODE;
  const scope = process.env.SCOPE;
  const state = process.env.STATE;
  const code_challenge_method = process.env.CODE_CHALLENGE_METHOD;
  const code_challenge = process.env.CODE_CHALLENGE;
  const baseURL = process.env.NEXT_BASE_URL;

  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${response_type}&redirect_uri=${baseURL}&response_mode=${response_mode}&scope=${scope}&state=${state}&code_challenge_method=${code_challenge_method}&code_challenge=${code_challenge}`;
};

// AUTH LOGOUT
export const onMicrosoftLogout = async () => {
  const clientId = process.env.CLIENT_ID;
  const tenantId = process.env.TENANT_ID;
  const baseURL = process.env.NEXT_BASE_URL!;

  cookies().delete(storageKeys.accessToken);
  cookies().delete(storageKeys.microsoftCode);

  return `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?client_id=${clientId}&post_logout_redirect_uri=${baseURL}`;
};

// AUTH GET TOKEN
export const onGenerateAccessTokenByCode = async (code: string): Promise<boolean | undefined> => {
  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const scope = process.env.SCOPE;
  const codeVerifier = process.env.CODE_CHALLENGE;
  const redirect_uri = process.env.NEXT_BASE_URL!;

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
    } else {
      throw new Error(response.statusText);
    }
    return !!accessToken;
  } catch (error: any) {
    console.error('Error exchanging code for token:', error);
  }
};
