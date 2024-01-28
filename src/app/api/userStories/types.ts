type StatusProps = {
  id: number;
  name: string;
}

export type UserStoriesProps = {
  almId: string;
  userStoryId: number;
  hasWorkflow: boolean;
  workflowId: number;
  projectId: number;
  project?: string;
  featureId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
  step: number;
  name: string;
  title: string;
  status: StatusProps;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string;
  plannedDate?: Date;
}