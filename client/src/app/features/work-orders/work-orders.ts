import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkOrderService } from '../../core/services/work-order.service';
import { WorkOrder } from '../../core/models/work-order.model';
import { WorkOrderFormComponent } from './work-order-form';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal';

@Component({
  selector: 'app-work-orders',
  imports: [CommonModule, RouterLink, WorkOrderFormComponent, ConfirmModalComponent],
  templateUrl: './work-orders.html',
  styleUrl: './work-orders.scss'
})
export class WorkOrdersComponent implements OnInit {
  private workOrderService = inject(WorkOrderService);
  private cdr = inject(ChangeDetectorRef);

  workOrders: WorkOrder[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedWorkOrder: WorkOrder | null = null;
  showConfirm = false;
  workOrderToDelete: WorkOrder | null = null;

  ngOnInit(): void {
    this.loadWorkOrders();
  }

  loadWorkOrders(): void {
    this.loading = true;
    this.workOrderService.getAll().subscribe({
      next: (data) => {
        this.workOrders = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load work orders.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openAddForm(): void {
    this.error = '';
    this.selectedWorkOrder = null;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openEditForm(workOrder: WorkOrder, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.selectedWorkOrder = workOrder;
    this.showForm = true;
    this.cdr.detectChanges();
  }

  openDeleteConfirm(workOrder: WorkOrder, event: Event): void {
    event.stopPropagation();
    this.error = '';
    this.workOrderToDelete = workOrder;
    this.showConfirm = true;
    this.cdr.detectChanges();
  }

  onDeleteConfirmed(): void {
    if (!this.workOrderToDelete) return;
    this.workOrderService.delete(this.workOrderToDelete.workOrderId).subscribe({
      next: () => {
        this.showConfirm = false;
        this.workOrderToDelete = null;
        this.error = '';
        this.loadWorkOrders();
      },
      error: () => {
        this.showConfirm = false;
        this.workOrderToDelete = null;
        this.error = 'Failed to delete incident.';
        this.cdr.detectChanges();
      }
    });
  }

  onDeleteCancelled(): void {
    this.showConfirm = false;
    this.workOrderToDelete = null;
    this.error = '';
    this.cdr.detectChanges();
  }


  onFormSaved(): void {
    this.showForm = false;
    this.loadWorkOrders();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.cdr.detectChanges();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-warning';
      case 'Medium': return 'badge-info';
      case 'Low': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge-success';
      case 'InProgress': return 'badge-warning';
      case 'Open': return 'badge-info';
      case 'Cancelled': return 'badge-neutral';
      default: return 'badge-neutral';
    }
  }
}