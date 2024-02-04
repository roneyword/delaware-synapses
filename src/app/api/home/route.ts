
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  const token = req.headers.get("Authorization");
  try {
    const response = await fetch(process.env.BASE_URL+'/api/v1/projects', {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `${token}`
      },
    });

    return Response.json(await response.json());
  } catch (error: any) {
    return Response.json(`Error fetching Projects data: ${error}`);
  }
};
