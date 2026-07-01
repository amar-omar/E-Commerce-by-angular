import { baseUrl } from './../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private readonly _HttpClient = inject(HttpClient);

  checkout(cartId: string, data: object): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}/${cartId}?url=http://localhost:4200`,
      data
    );
  }
}