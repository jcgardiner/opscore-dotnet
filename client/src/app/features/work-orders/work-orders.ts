import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderService } from '../../core/services/work-order.service';
import { WorkOrder } from '../../core/models/work-order.model';

@Component({
  selector: 'app-work-orders',
  imports: [CommonModule],
  templateUrl: './work-orders.html',
  styleUrl: './work-orders.scss'
})
export class WorkOrdersComponent implements OnInit {
  private workOrderService = inject(WorkOrderService);
  private cdr = inject(ChangeDetectorRef);

  workOrders: WorkOrder[] = [];
  loading = true;
  error = '';

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
