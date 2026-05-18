import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment.local';
import { Brand } from '../../core/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) {}
  getBrands = (): Observable<{ data: Brand[] }> => {
    return this._HttpClient.get<{ data: Brand[] }>(baseUrl + 'api/v1/brands');
  };}
