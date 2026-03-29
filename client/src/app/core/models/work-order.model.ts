export interface WorkOrder {
  workOrderId: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdDate: string;
  dueDate: string | null;
  assetId: number;
  assetName: string;
  assignedToId: number;
  assignedToName: string;
}

export interface CreateWorkOrder {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string | null;
  assetId: number;
  assignedToId: number;
}

export interface UpdateWorkOrder {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string | null;
  assetId: number;
  assignedToId: number;
}