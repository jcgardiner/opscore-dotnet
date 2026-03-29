export interface Personnel {
  personnelId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  clearance: string;
  status: string;
  createdDate: string;
  siteId: number;
  siteName: string;
}

export interface CreatePersonnel {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  clearance: string;
  status: string;
  siteId: number;
}

export interface UpdatePersonnel {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  clearance: string;
  status: string;
  siteId: number;
}