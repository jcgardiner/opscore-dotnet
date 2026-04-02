import { Site } from './site.model';
import { Asset } from './asset.model';
import { Personnel } from './personnel.model';
import { Incident } from './incident.model';

export interface SiteDetails {
  site: Site;
  assets: Asset[];
  personnel: Personnel[];
  incidents: Incident[];
}