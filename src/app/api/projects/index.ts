import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";
import { ClientProps } from "./types";

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
