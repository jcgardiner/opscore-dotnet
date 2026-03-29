import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { WorkOrder, CreateWorkOrder, UpdateWorkOrder } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  getAll(): Observable<WorkOrder[]> {
    return this.http.get<WorkOrder[]>(`${this.api.baseUrl}/workorders`);
  }

  getById(id: number): Observable<WorkOrder> {
    return this.http.get<WorkOrder>(`${this.api.baseUrl}/workorders/${id}`);
  }

  create(dto: CreateWorkOrder): Observable<WorkOrder> {
    return this.http.post<WorkOrder>(`${this.api.baseUrl}/workorders`, dto);
  }

  update(id: number, dto: UpdateWorkOrder): Observable<WorkOrder> {
    return this.http.put<WorkOrder>(`${this.api.baseUrl}/workorders/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/workorders/${id}`);
  }
}