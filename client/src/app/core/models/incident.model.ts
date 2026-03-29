export interface Incident {
  incidentId: number;
  title: string;
  description: string;
  severity: string;
  status: string;
  occurredDate: string;
  resolvedDate: string | null;
  createdDate: string;
  siteId: number;
  siteName: string;
  reportedById: number;
  reportedByName: string;
}

export interface CreateIncident {
  title: string;
  description: string;
  severity: string;
  status: string;
  occurredDate: string;
  siteId: number;
  reportedById: number;
}

export interface UpdateIncident {
  title: string;
  description: string;
  severity: string;
  status: string;
  occurredDate: string;
  resolvedDate: string | null;
  siteId: number;
  reportedById: number;
}