import { HttpMethodsProps } from "./types";

export const fetchAPISysnapses = async (
  method: HttpMethodsProps,
  path: string,
  token?: string,
  options?: any
) => {
  try {
    const baseURL = process.env.BASE_URL || '';
    const url = new URL(path, baseURL);

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        url.searchParams.append(key, value as string);
      });
    }

    const response = await fetch(url, {
      method: method as HttpMethodsProps,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}