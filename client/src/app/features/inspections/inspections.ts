import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InspectionService } from '../../core/services/inspection.service';
import { Inspection } from '../../core/models/inspection.model';
import { InspectionFormComponent } from './inspection-form';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal';

@Component({
  selector: 'app-inspections',
  imports: [CommonModule, RouterLink, InspectionFormComponent, ConfirmModalComponent],
  templateUrl: './inspections.html',
  styleUrl: './inspections.scss'
})
export class InspectionsComponent implements OnInit {
  private inspectionService = inject(InspectionService);
  private cdr = inject(ChangeDetectorRef);

  inspections: Inspection[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedInspection: Inspection | null = null;
  showConfirm = false;
  inspectionToDelete: Inspection | null = null;

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

  openAddForm(): void {
    this.error = '';
    this.selectedInspection = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(inspection: Inspection, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.selectedInspection = inspection;
    this.showForm = true;
    this.cdr.detectChanges();
  }

    openDeleteConfirm(inspection: Inspection, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.inspectionToDelete = inspection;
    this.showConfirm = true;
    this.cdr.detectChanges();
  }

  onDeleteConfirmed(): void {
    if (!this.inspectionToDelete) return;
    this.inspectionService.delete(this.inspectionToDelete.inspectionId).subscribe({
      next: () => {
        this.showConfirm = false;
        this.inspectionToDelete = null;
        this.error = '';
        this.loadInspections();
      },
      error: () => {
        this.showConfirm = false;
        this.inspectionToDelete = null;
        this.error = 'Failed to delete incident.';
        this.cdr.detectChanges();
      }
    });
  }

  onDeleteCancelled(): void {
    this.showConfirm = false;
    this.inspectionToDelete = null;
    this.error = '';
    this.cdr.detectChanges();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadInspections();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
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