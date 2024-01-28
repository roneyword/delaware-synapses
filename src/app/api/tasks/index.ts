import { httpMethods } from "../clients/config.js";
import { fetchAPISysnapses } from "../clients/sysnapsesService.js";
import { HttpMethodsProps } from "../clients/types.js";
import { fetchAPIWorflow } from "../clients/workflowService.js";
import { TaskProps } from "./types.js";

export const findTasksByStoryIdAndProjectId = async (storyId: number, projectUuid: string): Promise<TaskProps[] | [] | undefined> => {
  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    if (!storyId) {
      throw new Error('Field StoryId is missing.');
    }

    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/tasks/${storyId}`,
      { projectUuid: projectUuid }
    );

    if (!response) {
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error fetching Tasks data:", error);
  }
};

export const runWorkflow = async (payload: any) => {
  try {
    await fetchAPIWorflow(
      httpMethods.POST as HttpMethodsProps,
      `/api/v1/workflow/run`,
      payload
    );

  } catch (error) {
    console.error("Error on run workflow:", error);
  }
};