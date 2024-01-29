import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";
import { UserStoriesProps } from "./types";

export const fetchUserStoriesData = async (featureId: number, projectUuid: string): Promise<UserStoriesProps[] | [] | undefined> => {
  try {
    if (!featureId) {
      throw new Error('Field FeatureId is missing.');
    }

    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/user-stories/${featureId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching User Stories data:", error);
  }
};
