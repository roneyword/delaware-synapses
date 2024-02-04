import { NextRequest } from "next/server";
import { httpMethods } from "../clients/config";
import { fetchAPISysnapses } from "../clients/sysnapsesService";
import { HttpMethodsProps } from "../clients/types";

export type PhaseProps = {
  almId: string;
  phaseId: number;
  projectId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
  step: number;
  name: string
  title: string;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string
  plannedDate?: Date;
}

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization");
  const { searchParams } = new URL(req.url);
  const projectUuid = searchParams.get('id');

  try {
    if (!projectUuid) {
      throw new Error('Field Project UUID is missing.');
    }

    const responsePhases = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/phases`,
      token || undefined,
      {projectUuid}
    );

    const responseEpics = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/epics`,
      token || undefined,
      {projectUuid}
    );

    if (!responsePhases && !responseEpics) {
      return [];
    }

    return {
      phases: responsePhases,
      epics: responseEpics
    };
  } catch (error) {
    console.error('Error fetching Phases data:', error);
  }
};
