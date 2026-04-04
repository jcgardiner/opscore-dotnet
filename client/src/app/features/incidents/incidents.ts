import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IncidentService } from '../../core/services/incident.service';
import { Incident } from '../../core/models/incident.model';
import { IncidentFormComponent } from './incident-form';

@Component({
  selector: 'app-incidents',
  imports: [CommonModule, RouterLink, IncidentFormComponent],
  templateUrl: './incidents.html',
  styleUrl: './incidents.scss'
})
export class IncidentsComponent implements OnInit {
  private incidentService = inject(IncidentService);
  private cdr = inject(ChangeDetectorRef);

  incidents: Incident[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedIncident: Incident | null = null;

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.loading = true;
    this.incidentService.getAll().subscribe({
      next: (data) => {
        this.incidents = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load incidents.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.selectedIncident = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(incident: Incident, event: Event): void {
    event.stopPropagation();
    this.selectedIncident = incident;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadIncidents();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-warning';
      case 'Low': return 'badge-success';
      default: return 'badge-neutral';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Resolved': return 'badge-success';
      case 'UnderReview': return 'badge-warning';
      case 'Open': return 'badge-info';
      case 'Closed': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
}