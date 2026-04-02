import { Asset } from './asset.model';
import { Inspection } from './inspection.model';
import { WorkOrder } from './work-order.model';

export interface AssetDetails {
  asset: Asset;
  inspections: Inspection[];
  workOrders: WorkOrder[];
}