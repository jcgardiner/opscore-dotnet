import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonnelService } from '../../core/services/personnel.service';
import { Personnel } from '../../core/models/personnel.model';
import { PersonnelFormComponent } from './personnel-form';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal';

@Component({
  selector: 'app-personnel',
  imports: [CommonModule, RouterLink, PersonnelFormComponent, ConfirmModalComponent],
  templateUrl: './personnel.html',
  styleUrl: './personnel.scss'
})
export class PersonnelComponent implements OnInit {
  private personnelService = inject(PersonnelService);
  private cdr = inject(ChangeDetectorRef);

  personnel: Personnel[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedPerson: Personnel | null = null;
  showConfirm = false;
  personToDelete: Personnel | null = null;

  ngOnInit(): void {
    this.loadPersonnel();
  }

  loadPersonnel(): void {
    this.loading = true;
    this.personnelService.getAll().subscribe({
      next: (data) => {
        this.personnel = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load personnel.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.error = '';
    this.selectedPerson = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(person: Personnel, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.selectedPerson = person;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openDeleteConfirm(person: Personnel, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.personToDelete = person;
    this.showConfirm = true;
    this.cdr.detectChanges();
  }

  onDeleteConfirmed(): void {
    if (!this.personToDelete) return;
    this.personnelService.delete(this.personToDelete.personnelId).subscribe({
      next: () => {
        this.showConfirm = false;
        this.personToDelete = null;
        this.error = '';
        this.loadPersonnel();
      },
      error: () => {
        this.showConfirm = false;
        this.personToDelete = null;
        this.error = 'Failed to delete personnel. They may have related records.';
        this.cdr.detectChanges();
      }
    });
  }

  onDeleteCancelled(): void {
    this.showConfirm = false;
    this.personToDelete = null;
    this.error = '';
    this.cdr.detectChanges();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadPersonnel();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
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
}