export interface AnalyticsOverview {
  assetStatus: { status: string; count: number }[];
  incidentsBySeverity: { severity: string; count: number }[];
  incidentsByStatus: { status: string; count: number }[];
  workOrdersByPriority: { priority: string; count: number }[];
  workOrdersByStatus: { status: string; count: number }[];
  inspectionsByStatus: { status: string; count: number }[];
  inspectionsByStandard: { standard: string; count: number }[];
  assetsPerSite: { site: string; count: number }[];
  incidentsPerSite: { site: string; count: number }[];
}