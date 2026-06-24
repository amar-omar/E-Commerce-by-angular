import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from './../../core/services/cart.service';
import { CartProduct } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  count = 0;
  isLoading = true;
  allCarts: CartProduct[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}
  calculateTotalPrice(): void {
    this.totalPrice = this.allCarts.reduce((total, item) => {
      return total + item.price * item.product.quantity;
    }, 0);
  }
  getCartProducts(id: string): void {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.allCarts = response.data.products;
        // console.log(this.allCarts);
        this.calculateTotalPrice();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastr.error('Failed to load cart items', 'Error');
      },
    });
  }
  getCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.allCarts = response.data.products;
        this.totalPrice = response.data.totalCartPrice;
  console.log(response.data.products);
  console.log(response.data.products[0]);
      },
    });
  }
  addToCart(productId: string): void {
    this.cartService.AddToCart(productId).subscribe({
      next: (response) => {
        this.toastr.success('Item added to cart', 'Success');
        this.getCartProducts(response.data.cartId);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to add item to cart', 'Error');
      },
    });
  }
  removeFromCart(product: CartProduct): void {
    this.cartService.removeCartItem(product.product._id).subscribe({
      next: (response) => {
        this.allCarts = response.data.products;
        this.calculateTotalPrice();
        this.toastr.success('Item removed successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Failed to remove item');
      },
    });
  }

increaseQuantity(item: CartProduct): void {
  this.cartService.updateCartItem(
    item.product._id,
    item.count + 1
  ).subscribe({
    next: (response) => {
      this.allCarts = response.data.products;
      this.totalPrice = response.data.totalCartPrice;
    }
  });
}

decreaseQuantity(item: CartProduct): void {
  this.cartService.updateCartItem(
    item.product._id,
    item.count - 1
  ).subscribe({
    next: (response) => {
      this.allCarts = response.data.products;
      this.totalPrice = response.data.totalCartPrice;
    }
  });
}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.allCarts = response.data.products;
        this.totalPrice = response.data.totalCartPrice;
      },
    });
  }
}
