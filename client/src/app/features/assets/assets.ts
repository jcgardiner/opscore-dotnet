import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AssetService } from '../../core/services/asset.service';
import { Asset } from '../../core/models/asset.model';
import { AssetFormComponent } from './asset-form';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal';

@Component({
  selector: 'app-assets',
  imports: [CommonModule, RouterLink, AssetFormComponent, ConfirmModalComponent],
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
  showConfirm = false;
  assetToDelete: Asset | null = null;

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
    this.error = '';
    this.selectedAsset = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(asset: Asset, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.selectedAsset = asset;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openDeleteConfirm(asset: Asset, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.assetToDelete = asset;
    this.showConfirm = true;
    this.cdr.detectChanges();
  }

  onDeleteConfirmed(): void {
    if (!this.assetToDelete) return;
    this.assetService.delete(this.assetToDelete.assetId).subscribe({
      next: () => {
        this.showConfirm = false;
        this.assetToDelete = null;
        this.error = '';
        this.loadAssets();
      },
      error: () => {
        this.showConfirm = false;
        this.assetToDelete = null;
        this.error = 'Failed to delete asset. It may have related records.';
        this.cdr.detectChanges();
      }
    });
  }

  onDeleteCancelled(): void {
    this.showConfirm = false;
    this.assetToDelete = null;
    this.error = '';
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