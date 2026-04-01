import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionService } from '../../core/services/inspection.service';
import { Inspection } from '../../core/models/inspection.model';

@Component({
  selector: 'app-inspections',
  imports: [CommonModule],
  templateUrl: './inspections.html',
  styleUrl: './inspections.scss'
})
export class InspectionsComponent implements OnInit {
  private inspectionService = inject(InspectionService);
  private cdr = inject(ChangeDetectorRef);

  inspections: Inspection[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadInspections();
  }

  loadInspections(): void {
    this.loading = true;
    this.inspectionService.getAll().subscribe({
      next: (data) => {
        this.inspections = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load inspections.';
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
}
