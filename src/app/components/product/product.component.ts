import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  allProducts: product[] = [];

  constructor(
    private toastr: ToastrService,
    private _Products: ProductsService,
    private _CartService: CartService, // Inject CartService
  ) {}

  getProducts = () => {
    this._Products.getProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  // Add this method to handle adding to cart
  addToCart(productId: string) {
    this._CartService.AddToCart(productId).subscribe({
      next: () => {
        // console.log('Product added to cart:', response);
        // Update cart count
        this._CartService.cartCount.next(this._CartService.cartCount.value + 1);
this.toastr.success('Product added to cart', 'Success');
      },
      error: () => {
        // console.error('Error adding to cart:', error);
        // alert('Failed to add product to cart. Please try again.');
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
    
  }
}
