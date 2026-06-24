import { Injectable } from '@angular/core';
import { baseUrl } from '../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getProducts = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/products');
  };
  getProduct = (id: string): Observable<{data:product}> => {
    return this._HttpClient.get<{data:product}>(baseUrl + `api/v1/products/${id}`);
  };

}
