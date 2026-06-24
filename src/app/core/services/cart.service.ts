import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../environments/environment.local';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  getLoggedUserCart() {
    throw new Error('Method not implemented.');
  }
  readonly _HttpClient = inject(HttpClient);
  readonly AuthService = inject(AuthService);
  cartCount = new BehaviorSubject<number>(0);
  constructor() {}

  // Method to get the auth token
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  // Add headers with authorization
  private getHttpOptions() {
    const token = this.getAuthToken();
    return {
      headers: new HttpHeaders({
        'token': `${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  // Add to cart - Fixed
  AddToCart(id: string): Observable<any> {
    const options = this.getHttpOptions();
    const token = this.getAuthToken();
    // console.log('AddToCart - Token:', token);
    // console.log('AddToCart - Product ID:', id);
    
    return this._HttpClient.post(baseUrl + `api/v1/cart`, {
      productId: id
    }, options);
  }
  
  // Get cart items
  getCartItems(): Observable<any> {
    const options = this.getHttpOptions();
    // console.log('getCartItems - Cart ID:');
    return this._HttpClient.get(baseUrl + `api/v1/cart`, options);
  }
  
  // Update cart item quantity
updateCartItem(productId: string, count: number): Observable<any> {
  return this._HttpClient.put(
    `${baseUrl}api/v1/cart/${productId}`,
    {
      count: count
    },
    this.getHttpOptions()
  );
}
  
  // Remove cart item - Fixed (no more error)
  removeCartItem(productId: string): Observable<any> {
    const options = this.getHttpOptions();
    console.log('removeCartItem - Product ID:', productId);
    return this._HttpClient.delete(baseUrl + `api/v1/cart/${productId}`, options);
  }
  
  // Clear entire cart
  clearCart(): Observable<any> {
    const options = this.getHttpOptions();
    return this._HttpClient.delete(baseUrl + `api/v1/cart`, options);
  }
  
  // Get cart count
  getCartCount(): Observable<any> {
    const options = this.getHttpOptions();
    return this._HttpClient.get(baseUrl + `api/v1/cart/count`, options);
  }
}