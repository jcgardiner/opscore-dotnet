import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InspectionService } from '../../core/services/inspection.service';
import { InspectionDetails } from '../../core/models/inspection-details.model';

@Component({
  selector: 'app-inspection-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './inspection-detail.html',
  styleUrl: './inspection-detail.scss'
})
export class InspectionDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private inspectionService = inject(InspectionService);
  private cdr = inject(ChangeDetectorRef);

  details: InspectionDetails | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    this.inspectionService.getDetails(id).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load inspection details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed': return 'badge-success';
      case 'Failed': return 'badge-danger';
      case 'InProgress': return 'badge-warning';
      case 'Scheduled': return 'badge-info';
      default: return 'badge-neutral';
    }
  }

  isOverdue(): boolean {
    if (!this.details?.inspection) return false;
    if (this.details.inspection.status === 'Passed' ||
        this.details.inspection.status === 'Failed') return false;
    return new Date(this.details.inspection.scheduledDate) < new Date();
  }
}