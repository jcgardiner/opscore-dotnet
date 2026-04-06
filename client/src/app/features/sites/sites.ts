import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SiteService } from '../../core/services/site.service';
import { Site } from '../../core/models/site.model';
import { SiteFormComponent } from './site-form';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal';

@Component({
  selector: 'app-sites',
  imports: [CommonModule, RouterLink, SiteFormComponent, ConfirmModalComponent],
  templateUrl: './sites.html',
  styleUrl: './sites.scss'
})
export class SitesComponent implements OnInit {
  private siteService = inject(SiteService);
  private cdr = inject(ChangeDetectorRef);

  sites: Site[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedSite: Site | null = null;
  showConfirm = false;
  siteToDelete: Site | null = null;

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites(): void {
    this.loading = true;
    this.siteService.getAll().subscribe({
      next: (data) => {
        this.sites = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load sites.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.error = '';
    this.selectedSite = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(site: Site, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.selectedSite = site;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openDeleteConfirm(site: Site, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.siteToDelete = site;
    this.showConfirm = true;
    this.cdr.detectChanges();
  }

  onDeleteConfirmed(): void {
    if (!this.siteToDelete) return;
    this.siteService.delete(this.siteToDelete.siteId).subscribe({
      next: () => {
        this.showConfirm = false;
        this.siteToDelete = null;
        this.loadSites();
      },
      error: () => {
        this.showConfirm = false;
        this.siteToDelete = null;
        this.error = 'Failed to delete site. It may have related records.';
        this.cdr.detectChanges();
      }
    });
  }

  onDeleteCancelled(): void {
    this.showConfirm = false;
    this.siteToDelete = null;
    this.cdr.detectChanges();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadSites();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
  }

  getSectorClass(sectorType: string): string {
    switch (sectorType) {
      case 'DoD': return 'badge-danger';
      case 'Government': return 'badge-info';
      case 'OilGas': return 'badge-warning';
      default: return 'badge-neutral';
    }
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'badge-success' : 'badge-neutral';
  }
}