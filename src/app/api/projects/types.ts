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