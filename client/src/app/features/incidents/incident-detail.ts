import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IncidentService } from '../../core/services/incident.service';
import { IncidentDetails } from '../../core/models/incident-details.model';

@Component({
  selector: 'app-incident-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './incident-detail.html',
  styleUrl: './incident-detail.scss'
})
export class IncidentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private incidentService = inject(IncidentService);
  private cdr = inject(ChangeDetectorRef);

  details: IncidentDetails | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    this.incidentService.getDetails(id).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load incident details.';
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
