"use server"
import { NextRequest, NextResponse } from "next/server";
import { httpMethods } from "./clients/config";
import { fetchAPISysnapses } from "./clients/sysnapsesService";
import { HttpMethodsProps } from "./clients/types";

type ProjectProps = {
  projectId: number;
  projectUuid: string;
  name: string
  isActive: boolean;
}

export type ClientProps = {
  clientId: number;
  clientUuid: string;
  isActive: boolean;
  name: string;
  projectList: ProjectProps[];
}

export const getProjects = async (): Promise<ClientProps[] | [] | undefined> => {
  try {
    const response = await fetchAPISysnapses(
      httpMethods.GET as HttpMethodsProps,
      `/api/v1/projects`,
    );

    if (!response) {
      return [];
    }

    if (response.status === 401) {
      NextResponse.redirect(new URL('/login',));
    }

    return response;
  } catch (error) {
    console.error('Error fetching Projects data:', error);
  }
};
