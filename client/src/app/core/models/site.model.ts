export interface Site {
  siteId: number;
  siteName: string;
  sectorType: string;
  location: string;
  status: string;
  createdDate: string;
}

export interface CreateSite {
  siteName: string;
  sectorType: string;
  location: string;
  status: string;
}

export interface UpdateSite {
  siteName: string;
  sectorType: string;
  location: string;
  status: string;
}