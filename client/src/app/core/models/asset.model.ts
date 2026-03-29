export interface Asset {
  assetId: number;
  assetName: string;
  assetType: string;
  serialNumber: string;
  status: string;
  lastInspectedDate: string | null;
  createdDate: string;
  siteId: number;
  siteName: string;
  assignedPersonnelId: number | null;
  assignedPersonnelName: string;
}

export interface CreateAsset {
  assetName: string;
  assetType: string;
  serialNumber: string;
  status: string;
  siteId: number;
  assignedPersonnelId: number | null;
}

export interface UpdateAsset {
  assetName: string;
  assetType: string;
  serialNumber: string;
  status: string;
  siteId: number;
  assignedPersonnelId: number | null;
}