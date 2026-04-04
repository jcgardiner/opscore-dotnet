import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Inspection, CreateInspection, UpdateInspection } from '../models/inspection.model';
import { InspectionDetails } from '../models/inspection-details.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  getAll(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.api.baseUrl}/inspections`);
  }

  getById(id: number): Observable<Inspection> {
    return this.http.get<Inspection>(`${this.api.baseUrl}/inspections/${id}`);
  }

  getDetails(id: number): Observable<InspectionDetails> {
    return this.http.get<InspectionDetails>(`${this.api.baseUrl}/inspections/${id}/details`);
  }

  create(dto: CreateInspection): Observable<Inspection> {
    return this.http.post<Inspection>(`${this.api.baseUrl}/inspections`, dto);
  }

  update(id: number, dto: UpdateInspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.api.baseUrl}/inspections/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/inspections/${id}`);
  }
}