type StatusProps = {
  id: number;
  name: string;
}

export type FeatureProps = {
  featureId: number;
  almId: string;
  epicId: number;
  pbiStatusId: number;
  completeWork: number;
  totalWork: number;
  percentComplete: number;
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