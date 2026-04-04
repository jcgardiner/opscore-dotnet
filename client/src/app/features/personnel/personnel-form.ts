import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { PersonnelService } from '../../core/services/personnel.service';
import { SiteService } from '../../core/services/site.service';
import { Personnel, CreatePersonnel, UpdatePersonnel } from '../../core/models/personnel.model';
import { Site } from '../../core/models/site.model';

@Component({
  selector: 'app-personnel-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './personnel-form.html',
  styleUrl: './personnel-form.scss'
})
export class PersonnelFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() person: Personnel | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private personnelService: PersonnelService;
  private siteService: SiteService;

  saving = false;
  sites: Site[] = [];

  formData: CreatePersonnel = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    clearance: 'None',
    status: 'Active',
    siteId: 0
  };

  constructor(personnelService: PersonnelService, siteService: SiteService) {
    this.personnelService = personnelService;
    this.siteService = siteService;
  }

  ngOnInit(): void {
    this.loadSites();
    this.populateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.populateForm();
    }
  }

  loadSites(): void {
    this.siteService.getAll().subscribe({
      next: (data) => this.sites = data
    });
  }

  populateForm(): void {
    if (this.person) {
      this.formData = {
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        email: this.person.email,
        role: this.person.role,
        clearance: this.person.clearance,
        status: this.person.status,
        siteId: this.person.siteId
      };
    } else {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        clearance: 'None',
        status: 'Active',
        siteId: 0
      };
    }
  }

  onSubmit(): void {
    if (!this.formData.firstName || !this.formData.lastName ||
        !this.formData.email || !this.formData.role || !this.formData.siteId) return;

    this.saving = true;

    if (this.person) {
      this.personnelService.update(this.person.personnelId, this.formData as UpdatePersonnel).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.personnelService.create(this.formData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}