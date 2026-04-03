import { Personnel } from './personnel.model';
import { Asset } from './asset.model';
import { Inspection } from './inspection.model';
import { WorkOrder } from './work-order.model';

export interface PersonnelDetails {
  person: Personnel;
  assignedAssets: Asset[];
  inspections: Inspection[];
  workOrders: WorkOrder[];
}