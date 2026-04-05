import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { InspectionService } from '../../core/services/inspection.service';
import { AssetService } from '../../core/services/asset.service';
import { PersonnelService } from '../../core/services/personnel.service';
import { Inspection, CreateInspection, UpdateInspection } from '../../core/models/inspection.model';
import { Asset } from '../../core/models/asset.model';
import { Personnel } from '../../core/models/personnel.model';

@Component({
  selector: 'app-inspection-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.scss'
})
export class InspectionFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() inspection: Inspection | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private inspectionService: InspectionService;
  private assetService: AssetService;
  private personnelService: PersonnelService;

  saving = false;
  assets: Asset[] = [];
  personnel: Personnel[] = [];
  scheduledDateDate: string = '';
  scheduledDateTime: string = '08:00';

  formData: CreateInspection = {
    assetId: 0,
    inspectorId: 0,
    complianceStandard: '',
    status: 'Scheduled',
    scheduledDate: '',
    notes: ''
  };

  constructor(
    inspectionService: InspectionService,
    assetService: AssetService,
    personnelService: PersonnelService
  ) {
    this.inspectionService = inspectionService;
    this.assetService = assetService;
    this.personnelService = personnelService;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadDropdowns();
      this.populateForm();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen && changes['isOpen'].firstChange === false) {
      this.populateForm();
    }
  }

  loadDropdowns(): void {
    this.assetService.getAll().subscribe({ next: (data) => this.assets = data });
    this.personnelService.getAll().subscribe({ next: (data) => this.personnel = data });
  }

  populateForm(): void {
    if (this.inspection) {
      const local = this.toLocalDateTimeString(this.inspection.scheduledDate);
      this.scheduledDateDate = local.slice(0, 10);
      this.scheduledDateTime = local.slice(11, 16);
      this.formData = {
        assetId: this.inspection.assetId,
        inspectorId: this.inspection.inspectorId,
        complianceStandard: this.inspection.complianceStandard,
        status: this.inspection.status,
        scheduledDate: this.inspection.scheduledDate,
        notes: this.inspection.notes
      };
    } else {
      this.scheduledDateDate = '';
      this.scheduledDateTime = '08:00';
      this.formData = {
        assetId: 0,
        inspectorId: 0,
        complianceStandard: '',
        status: 'Scheduled',
        scheduledDate: '',
        notes: ''
      };
    }
  }

  toLocalDateTimeString(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (!this.formData.assetId || !this.formData.inspectorId ||
        !this.formData.complianceStandard || !this.scheduledDateDate) return;

    this.saving = true;

    const scheduledDate = `${this.scheduledDateDate}T${this.scheduledDateTime}:00`;

    const submitData: CreateInspection = {
      ...this.formData,
      scheduledDate
    };

    if (this.inspection) {
      const updateData: UpdateInspection = {
        ...submitData,
        completedDate: this.inspection.completedDate
      };
      this.inspectionService.update(this.inspection.inspectionId, updateData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.inspectionService.create(submitData).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}