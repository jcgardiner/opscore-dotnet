import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { AssetService } from '../../core/services/asset.service';
import { SiteService } from '../../core/services/site.service';
import { PersonnelService } from '../../core/services/personnel.service';
import { Asset, CreateAsset, UpdateAsset } from '../../core/models/asset.model';
import { Site } from '../../core/models/site.model';
import { Personnel } from '../../core/models/personnel.model';

@Component({
  selector: 'app-asset-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.scss'
})
export class AssetFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() asset: Asset | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private assetService: AssetService;
  private siteService: SiteService;
  private personnelService: PersonnelService;

  saving = false;
  sites: Site[] = [];
  personnel: Personnel[] = [];

  formData: CreateAsset = {
    assetName: '',
    assetType: '',
    serialNumber: '',
    status: 'Operational',
    siteId: 0,
    assignedPersonnelId: null
  };

  constructor(
    assetService: AssetService,
    siteService: SiteService,
    personnelService: PersonnelService
  ) {
    this.assetService = assetService;
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
    if (this.asset) {
      this.formData = {
        assetName: this.asset.assetName,
        assetType: this.asset.assetType,
        serialNumber: this.asset.serialNumber,
        status: this.asset.status,
        siteId: this.asset.siteId,
        assignedPersonnelId: this.asset.assignedPersonnelId
      };
    } else {
      this.formData = {
        assetName: '',
        assetType: '',
        serialNumber: '',
        status: 'Operational',
        siteId: 0,
        assignedPersonnelId: null
      };
    }
  }

  onSubmit(): void {
    if (!this.formData.assetName || !this.formData.assetType ||
        !this.formData.serialNumber || !this.formData.siteId) return;

    this.saving = true;

    if (this.asset) {
      this.assetService.update(this.asset.assetId, this.formData as UpdateAsset).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.assetService.create(this.formData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}