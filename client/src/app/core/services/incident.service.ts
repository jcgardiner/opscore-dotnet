import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Incident, CreateIncident, UpdateIncident } from '../models/incident.model';
import { IncidentDetails } from '../models/incident-details.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  getAll(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.api.baseUrl}/incidents`);
  }

  getById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.api.baseUrl}/incidents/${id}`);
  }

  getDetails(id: number): Observable<IncidentDetails> {
    return this.http.get<IncidentDetails>(`${this.api.baseUrl}/incidents/${id}/details`);
  }

  create(dto: CreateIncident): Observable<Incident> {
    return this.http.post<Incident>(`${this.api.baseUrl}/incidents`, dto);
  }

  update(id: number, dto: UpdateIncident): Observable<Incident> {
    return this.http.put<Incident>(`${this.api.baseUrl}/incidents/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/incidents/${id}`);
  }
}