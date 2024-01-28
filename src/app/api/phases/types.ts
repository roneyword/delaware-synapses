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