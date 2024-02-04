import { NextRequest } from "next/server";

// AUTH LOGOUT
export async function GET(req: NextRequest): Promise<Response> {
  const clientId = process.env.CLIENT_ID;
  const tenantId = process.env.TENANT_ID;
  const baseURL = process.env.NEXT_PUBLIC_NEXT_BASE_URL!;

  return Response.json({ data: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?client_id=${clientId}&post_logout_redirect_uri=${baseURL}`});
};