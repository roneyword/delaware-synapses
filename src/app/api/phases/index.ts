import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";
import { PhaseProps } from "./types";

export const findPhasesByProjectId = async (projectUuid: string ) : Promise<PhaseProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/phases`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error('Error fetching Phases data:', error);
  }
};
