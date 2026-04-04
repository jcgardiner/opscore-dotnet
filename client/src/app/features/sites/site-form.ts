import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { SiteService } from '../../core/services/site.service';
import { Site, CreateSite, UpdateSite } from '../../core/models/site.model';

@Component({
  selector: 'app-site-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './site-form.html',
  styleUrl: './site-form.scss'
})
export class SiteFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() site: Site | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private siteService: SiteService;
  saving = false;

  formData: CreateSite = {
    siteName: '',
    sectorType: '',
    location: '',
    status: 'Active'
  };

  constructor(siteService: SiteService) {
    this.siteService = siteService;
  }

  ngOnInit(): void {
    this.populateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.populateForm();
    }
  }

  populateForm(): void {
    if (this.site) {
      this.formData = {
        siteName: this.site.siteName,
        sectorType: this.site.sectorType,
        location: this.site.location,
        status: this.site.status
      };
    } else {
      this.formData = {
        siteName: '',
        sectorType: '',
        location: '',
        status: 'Active'
      };
    }
  }

  onSubmit(): void {
    if (!this.formData.siteName || !this.formData.sectorType || !this.formData.location) return;

    this.saving = true;

    if (this.site) {
      this.siteService.update(this.site.siteId, this.formData as UpdateSite).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.siteService.create(this.formData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}