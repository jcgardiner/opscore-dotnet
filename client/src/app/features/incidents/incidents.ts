import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentService } from '../../core/services/incident.service';
import { Incident } from '../../core/models/incident.model';

@Component({
  selector: 'app-incidents',
  imports: [CommonModule],
  templateUrl: './incidents.html',
  styleUrl: './incidents.scss'
})
export class IncidentsComponent implements OnInit {
  private incidentService = inject(IncidentService);
  private cdr = inject(ChangeDetectorRef);

  incidents: Incident[] = [];
  loading = true;
  error = '';

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
