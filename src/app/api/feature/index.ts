import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";
import { FeatureProps } from "./types";

export const findFeaturesByFaseIdAndProjectId = async (epicId: number, projectUuid: string): Promise<FeatureProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    if (!epicId) {
      throw new Error('Field EpicId is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/features/${epicId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching Features data:", error);
  }
};
