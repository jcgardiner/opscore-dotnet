import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal';
import { WorkOrderService } from '../../core/services/work-order.service';
import { AssetService } from '../../core/services/asset.service';
import { PersonnelService } from '../../core/services/personnel.service';
import { WorkOrder, CreateWorkOrder, UpdateWorkOrder } from '../../core/models/work-order.model';
import { Asset } from '../../core/models/asset.model';
import { Personnel } from '../../core/models/personnel.model';

@Component({
  selector: 'app-work-order-form',
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './work-order-form.html',
  styleUrl: './work-order-form.scss'
})
export class WorkOrderFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() workOrder: WorkOrder | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private workOrderService: WorkOrderService;
  private assetService: AssetService;
  private personnelService: PersonnelService;

  saving = false;
  assets: Asset[] = [];
  personnel: Personnel[] = [];
  dueDateDate: string = '';
  dueDateTime: string = '00:00';

  formData: CreateWorkOrder = {
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    dueDate: '',
    assetId: 0,
    assignedToId: 0
  };

  constructor(
    workOrderService: WorkOrderService,
    assetService: AssetService,
    personnelService: PersonnelService
  ) {
    this.workOrderService = workOrderService;
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
    if (this.workOrder) {
      if (this.workOrder.dueDate) {
        const local = this.toLocalDateTimeString(this.workOrder.dueDate);
        this.dueDateDate = local.slice(0, 10);
        this.dueDateTime = local.slice(11, 16);
      } else {
        this.dueDateDate = '';
        this.dueDateTime = '00:00';
      }
      this.formData = {
        title: this.workOrder.title,
        description: this.workOrder.description,
        priority: this.workOrder.priority,
        status: this.workOrder.status,
        dueDate: null,
        assetId: this.workOrder.assetId,
        assignedToId: this.workOrder.assignedToId
      };
    } else {
      this.dueDateDate = '';
      this.dueDateTime = '00:00';
      this.formData = {
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        dueDate: null,
        assetId: 0,
        assignedToId: 0
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
    if (!this.formData.title || !this.formData.assetId || !this.formData.assignedToId) return;

    this.saving = true;

    const dueDate = this.dueDateDate
    ? `${this.dueDateDate}T${this.dueDateTime}:00`
    : null;

    const submitData = {
      ...this.formData,
      dueDate
    };

    if (this.workOrder) {
      this.workOrderService.update(this.workOrder.workOrderId, submitData as UpdateWorkOrder).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    } else {
      this.workOrderService.create(submitData as CreateWorkOrder).subscribe({
        next: () => { this.saving = false; this.saved.emit(); },
        error: () => { this.saving = false; }
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}