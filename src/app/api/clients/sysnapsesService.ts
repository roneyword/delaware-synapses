import { storageKeys } from "./config";
import { HttpMethodsProps } from "./types";

export const fetchAPISysnapses = async (method: Omit<HttpMethodsProps, "GET">, path: string, options?: any) => {
  const token = localStorage.getItem(storageKeys.accessToken);
  const baseURL = process.env.BASE_URL || '';
  const url = new URL(path, baseURL);

  Object.entries(options).forEach(([key, value]) => {
    url.searchParams.append(key, value as string);
  });

  const response = await fetch(url, {
    method: method as HttpMethodsProps,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}