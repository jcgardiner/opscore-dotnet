import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SiteService } from '../../core/services/site.service';
import { SiteDetails } from '../../core/models/site-details.model';

@Component({
  selector: 'app-site-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './site-detail.html',
  styleUrl: './site-detail.scss'
})
export class SiteDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private siteService = inject(SiteService);
  private cdr = inject(ChangeDetectorRef);

  details: SiteDetails | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    this.siteService.getDetails(id).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load site details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getSectorClass(sectorType: string): string {
    switch (sectorType) {
      case 'DoD': return 'badge-danger';
      case 'Government': return 'badge-info';
      case 'OilGas': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'badge-success' : 'badge-neutral';
  }

  getAssetStatusClass(status: string): string {
    switch (status) {
      case 'Operational': return 'badge-success';
      case 'Maintenance': return 'badge-warning';
      case 'Decommissioned': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  getClearanceClass(clearance: string): string {
    switch (clearance) {
      case 'TopSecret': return 'badge-danger';
      case 'Secret': return 'badge-warning';
      case 'Confidential': return 'badge-info';
      default: return 'badge-neutral';
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-success';
      default: return 'badge-neutral';
    }
  }

  getIncidentStatusClass(status: string): string {
    switch (status) {
      case 'Resolved': return 'badge-success';
      case 'UnderReview': return 'badge-warning';
      case 'Open': return 'badge-info';
      case 'Closed': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
}