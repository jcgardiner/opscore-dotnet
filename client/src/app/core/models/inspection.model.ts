export interface Inspection {
  inspectionId: number;
  scheduledDate: string;
  completedDate: string | null;
  status: string;
  notes: string;
  complianceStandard: string;
  createdDate: string;
  assetId: number;
  assetName: string;
  inspectorId: number;
  inspectorName: string;
}

export interface CreateInspection {
  scheduledDate: string;
  status: string;
  notes: string;
  complianceStandard: string;
  assetId: number;
  inspectorId: number;
}

export interface UpdateInspection {
  scheduledDate: string;
  completedDate: string | null;
  status: string;
  notes: string;
  complianceStandard: string;
  assetId: number;
  inspectorId: number;
}