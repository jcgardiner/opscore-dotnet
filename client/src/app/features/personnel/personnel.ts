import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonnelService } from '../../core/services/personnel.service';
import { Personnel } from '../../core/models/personnel.model';
import { PersonnelFormComponent } from './personnel-form';

@Component({
  selector: 'app-personnel',
  imports: [CommonModule, RouterLink, PersonnelFormComponent],
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
    this.selectedPerson = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(person: Personnel, event: Event): void {
    event.stopPropagation();
    this.selectedPerson = person;
    this.showForm = true;
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