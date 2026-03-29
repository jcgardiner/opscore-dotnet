import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SiteService } from '../../core/services/site.service';
import { AssetService } from '../../core/services/asset.service';
import { PersonnelService } from '../../core/services/personnel.service';
import { IncidentService } from '../../core/services/incident.service';
import { WorkOrderService } from '../../core/services/work-order.service';
import { InspectionService } from '../../core/services/inspection.service';
import { Site } from '../../core/models/site.model';
import { Asset } from '../../core/models/asset.model';
import { Personnel } from '../../core/models/personnel.model';
import { Incident } from '../../core/models/incident.model';
import { WorkOrder } from '../../core/models/work-order.model';
import { Inspection } from '../../core/models/inspection.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private siteService = inject(SiteService);
  private assetService = inject(AssetService);
  private personnelService = inject(PersonnelService);
  private incidentService = inject(IncidentService);
  private workOrderService = inject(WorkOrderService);
  private inspectionService = inject(InspectionService);
  private cdr = inject(ChangeDetectorRef);

  sites: Site[] = [];
  assets: Asset[] = [];
  personnel: Personnel[] = [];
  incidents: Incident[] = [];
  workOrders: WorkOrder[] = [];
  inspections: Inspection[] = [];

  loading = true;
  error = '';

  get activeAssets(): number {
    return this.assets.filter(a => a.status === 'Operational').length;
  }

  get openIncidents(): number {
    return this.incidents.filter(i => i.status === 'Open').length;
  }

  get openWorkOrders(): number {
    return this.workOrders.filter(w => w.status === 'Open').length;
  }

  get scheduledInspections(): number {
    return this.inspections.filter(i => i.status === 'Scheduled').length;
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      sites: this.siteService.getAll(),
      assets: this.assetService.getAll(),
      personnel: this.personnelService.getAll(),
      incidents: this.incidentService.getAll(),
      workOrders: this.workOrderService.getAll(),
      inspections: this.inspectionService.getAll()
    }).subscribe({
      next: (data) => {
        this.sites = data.sites;
        this.assets = data.assets;
        this.personnel = data.personnel;
        this.incidents = data.incidents;
        this.workOrders = data.workOrders;
        this.inspections = data.inspections;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data. Is the API running?';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}