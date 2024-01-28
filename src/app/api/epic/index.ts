import { httpMethods } from "../clients/config.js";
import { fetchAPISysnapses } from "../clients/sysnapsesService.js";
import { HttpMethodsProps } from "../clients/types.js";
import { EpicProps, GroupedEpicsProps } from "./types.js";

export const findEpicsByFaseIdAndProjectId = async (phaseId: number, projectUuid: string): Promise<GroupedEpicsProps | [] | undefined> => {
  try {
    if (!phaseId) {
      throw new Error('Project UUID is missing.');
    }

    if (!projectUuid) {
      throw new Error('Project UUID is missing.');
    }

    const response: EpicProps[] = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/epics/${phaseId}`,
      {projectUuid: projectUuid}
    );

    if (!response) {
      return [];
    }

    return groupEpics(response);
  } catch (error) {
    console.error(`Error fetching Epics data: ${error}`);
  }
};

const groupEpics = (epicList: any[]): GroupedEpicsProps => {
  const groupedEpics = epicList.reduce((result, epic) => {
    const phaseId = epic.phaseId.toString();
    if (!result[phaseId]) {
      result[phaseId] = [];
    }
    result[phaseId].push(epic);
    return result;
  }, {});

  Object.keys(groupedEpics).forEach((phaseId) => {
    if (groupedEpics[phaseId].length === 0) {
      delete groupedEpics[phaseId];
    }
  });

  return groupedEpics;
};
