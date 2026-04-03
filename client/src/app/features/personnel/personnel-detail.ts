import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PersonnelService } from '../../core/services/personnel.service';
import { PersonnelDetails } from '../../core/models/personnel-details.model';

@Component({
  selector: 'app-personnel-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './personnel-detail.html',
  styleUrl: './personnel-detail.scss'
})
export class PersonnelDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private personnelService = inject(PersonnelService);
  private cdr = inject(ChangeDetectorRef);

  details: PersonnelDetails | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    this.personnelService.getDetails(id).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load personnel details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getClearanceClass(clearance: string): string {
    switch (clearance) {
      case 'TopSecret': return 'badge-danger';
      case 'Secret': return 'badge-warning';
      case 'Confidential': return 'badge-info';
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

  getInspectionStatusClass(status: string): string {
    switch (status) {
      case 'Passed': return 'badge-success';
      case 'Failed': return 'badge-danger';
      case 'InProgress': return 'badge-warning';
      case 'Scheduled': return 'badge-info';
      default: return 'badge-neutral';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }

  getWorkOrderStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'InProgress': return 'badge-warning';
      case 'Open': return 'badge-info';
      case 'Cancelled': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
}
