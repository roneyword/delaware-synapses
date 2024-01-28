import { httpMethods } from "../clients/config.js";
import { fetchAPISysnapses } from "../clients/sysnapsesService.js";
import { HttpMethodsProps } from "../clients/types.js";
import { ClientProps } from "./types.js";

export const getProjects = async (): Promise<ClientProps | [] | undefined> => {
  try {
    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/projects`,
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error('Error fetching Projects data:', error);
  }
};
