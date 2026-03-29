import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Personnel, CreatePersonnel, UpdatePersonnel } from '../models/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private http = inject(HttpClient);
  private api = inject(ApiService);

  getAll(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(`${this.api.baseUrl}/personnel`);
  }

  getById(id: number): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.api.baseUrl}/personnel/${id}`);
  }

  create(dto: CreatePersonnel): Observable<Personnel> {
    return this.http.post<Personnel>(`${this.api.baseUrl}/personnel`, dto);
  }

  update(id: number, dto: UpdatePersonnel): Observable<Personnel> {
    return this.http.put<Personnel>(`${this.api.baseUrl}/personnel/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/personnel/${id}`);
  }
}