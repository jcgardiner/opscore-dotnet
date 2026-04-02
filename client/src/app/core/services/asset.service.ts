import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Asset, CreateAsset, UpdateAsset } from '../models/asset.model';
import { AssetDetails } from '../models/asset-details.model';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private http = inject(HttpClient);
  private api = inject(ApiService);


  getAll(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.api.baseUrl}/assets`);
  }


  getById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.api.baseUrl}/assets/${id}`);
  }

  getDetails(id: number): Observable<AssetDetails> {
    return this.http.get<AssetDetails>(`${this.api.baseUrl}/assets/${id}/details`);
  }

  create(dto: CreateAsset): Observable<Asset> {
    return this.http.post<Asset>(`${this.api.baseUrl}/assets`, dto);
  }


  update(id: number, dto: UpdateAsset): Observable<Asset> {
    return this.http.put<Asset>(`${this.api.baseUrl}/assets/${id}`, dto);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.baseUrl}/assets/${id}`);
  }
}