import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkOrderService } from '../../core/services/work-order.service';
import { WorkOrderDetails } from '../../core/models/work-order-details.model';

@Component({
  selector: 'app-work-order-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './work-order-detail.html',
  styleUrl: './work-order-detail.scss'
})
export class WorkOrderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private workOrderService = inject(WorkOrderService);
  private cdr = inject(ChangeDetectorRef);

  details: WorkOrderDetails | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetails(id);
  }

  loadDetails(id: number): void {
    this.workOrderService.getDetails(id).subscribe({
      next: (data) => {
        this.details = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load work order details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Critical': return 'badge-danger';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-warning';
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

  isDueSoon(): boolean {
    if (!this.details?.workOrder.dueDate) return false;
    const due = new Date(this.details.workOrder.dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }

  isOverdue(): boolean {
    if (!this.details?.workOrder.dueDate) return false;
    return new Date(this.details.workOrder.dueDate) < new Date();
  }
}