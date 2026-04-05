import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { IncidentService } from '../../core/services/incident.service';
import { SiteService } from '../../core/services/site.service';
import { PersonnelService } from '../../core/services/personnel.service';
import { Incident, CreateIncident, UpdateIncident } from '../../core/models/incident.model';
import { Site } from '../../core/models/site.model';
import { Personnel } from '../../core/models/personnel.model';

@Component({
  selector: 'app-incident-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './incident-form.html',
  styleUrl: './incident-form.scss'
})
export class IncidentFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() incident: Incident | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private incidentService: IncidentService;
  private siteService: SiteService;
  private personnelService: PersonnelService;

  saving = false;
  sites: Site[] = [];
  personnel: Personnel[] = [];

  formData: CreateIncident = {
    title: '',
    description: '',
    severity: 'Low',
    status: 'Open',
    occurredDate: new Date().toISOString().slice(0, 16),
    siteId: 0,
    reportedById: 0
  };

  constructor(
    incidentService: IncidentService,
    siteService: SiteService,
    personnelService: PersonnelService
  ) {
    this.incidentService = incidentService;
    this.siteService = siteService;
    this.personnelService = personnelService;
  }

  ngOnInit(): void {
    this.loadDropdowns();
    this.populateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.populateForm();
    }
  }

  loadDropdowns(): void {
    this.siteService.getAll().subscribe({ next: (data) => this.sites = data });
    this.personnelService.getAll().subscribe({ next: (data) => this.personnel = data });
  }

  populateForm(): void {
    if (this.incident) {
      this.formData = {
        title: this.incident.title,
        description: this.incident.description,
        severity: this.incident.severity,
        status: this.incident.status,
        occurredDate: this.toLocalDateTimeString(this.incident.occurredDate),
        siteId: this.incident.siteId,
        reportedById: this.incident.reportedById
      };
    } else {
      this.formData = {
        title: '',
        description: '',
        severity: 'Low',
        status: 'Open',
        occurredDate: this.toLocalDateTimeString(new Date().toISOString()),
        siteId: 0,
        reportedById: 0
      };
    }
  }

  toLocalDateTimeString(dateStr: string): string {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (!this.formData.title || !this.formData.siteId || !this.formData.reportedById) return;

    this.saving = true;

    if (this.incident) {
        const updateData: UpdateIncident = {
        ...this.formData,
        resolvedDate: this.formData.status === 'Resolved'
            ? (this.incident.resolvedDate ?? new Date().toISOString())
            : null
        };
        this.incidentService.update(this.incident.incidentId, updateData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
        });
    } else {
        this.incidentService.create(this.formData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
        });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}