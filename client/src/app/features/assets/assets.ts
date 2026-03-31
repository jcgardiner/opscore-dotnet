import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetService } from '../../core/services/asset.service';
import { Asset } from '../../core/models/asset.model';

@Component({
  selector: 'app-assets',
  imports: [CommonModule],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})
export class Assets implements OnInit {
  private assetService = inject(AssetService);
  private cdr = inject(ChangeDetectorRef);

  assets: Asset[] = [];
  loading = true;
  error = '';

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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Operational': return 'badge-success';
      case 'Maintenance': return 'badge-warning';
      case 'Decommissioned': return 'badge-danger';
      default: return '';
    }
  }
}
