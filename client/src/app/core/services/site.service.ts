import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Site, CreateSite, UpdateSite } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.api.baseUrl}/sites`);
  }

  getById(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.api.baseUrl}/sites/${id}`);
  }

  create(dto: CreateSite): Observable<Site> {
    return this.http.post<Site>(`${this.api.baseUrl}/sites`, dto);
  }

  update(id: number, dto: UpdateSite): Observable<Site> {
    return this.http.put<Site>(`${this.api.baseUrl}/sites/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/sites/${id}`);
  }
}