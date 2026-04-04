import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AssetService } from '../../core/services/asset.service';
import { Asset } from '../../core/models/asset.model';
import { AssetFormComponent } from './asset-form';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, RouterLink, AssetFormComponent],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})
export class Assets implements OnInit {
  private assetService = inject(AssetService);
  private cdr = inject(ChangeDetectorRef);

  assets: Asset[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedAsset: Asset | null = null;

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.loading = true;
    this.assetService.getAll().subscribe({
      next: (data) => {
        this.assets = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load assets.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.selectedAsset = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(asset: Asset, event: Event): void {
    event.stopPropagation();
    this.selectedAsset = asset;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  onFormSaved(): void {
    this.showForm = false;
    this.loadAssets();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Operational': return 'badge-success';
      case 'Maintenance': return 'badge-warning';
      case 'Decommissioned': return 'badge-danger';
      default: return '';
    }
  }
}
