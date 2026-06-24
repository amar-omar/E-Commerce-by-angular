import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service'; 
import { product } from '../../core/interfaces/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  product!: product;
  isLoading: boolean = false; // For loading state
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService); 

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        const id = response.get('id');
        if (id) {
          this.getProductDetails(id);
        }
      },
    });
  }

  // Separate method to get product details
  getProductDetails(id: string): void {
    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
  }

  // Add to Cart method
  addToCart(): void {
    if (!this.product || !this.product._id) {
      console.error('Product ID not found');
      return;
    }

    this.isLoading = true;
    this._CartService.AddToCart(this.product._id).subscribe({
      next: (response) => {
        console.log('Product added to cart successfully', response);
        this.isLoading = false;
         
        // Optional: Show success toast/notification
        // Optional: Update cart count in header
      },
      error: (error) => {
        console.error('Failed to add product to cart:', error);
        this.isLoading = false;
        // Optional: Show error toast/notification
      },
    });
  }
}