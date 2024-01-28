type StatusProps = {
  id: number;
  name: string;
}

export type TaskProps = {
  taskId: number;
  userStoryId: number;
  almId: string;
  automationId: number;
  documentationUrl?: string;
  evidenceUrl?: string;
  executionDate?: Date;
  isAutomated: boolean;
  responsibleName: string;
  pbiStatusId: number;
  step: number;
  name: string
  title: string;
  status: StatusProps;
  createAt: Date;
  createdBy?: string;
  updateAt?: Date;
  updatedBy?: string
  plannedDate?: Date;
}