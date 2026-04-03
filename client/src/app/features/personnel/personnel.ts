import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelService } from '../../core/services/personnel.service';
import { Personnel } from '../../core/models/personnel.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personnel',
  imports: [CommonModule, RouterLink],
  templateUrl: './personnel.html',
  styleUrl: './personnel.scss'
})
export class PersonnelComponent implements OnInit {
  private personnelService = inject(PersonnelService);
  private cdr = inject(ChangeDetectorRef);

  personnel: Personnel[] = [];
  loading = true;
  error = '';

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
