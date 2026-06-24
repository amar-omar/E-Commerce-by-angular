import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { product } from '../../core/interfaces/product';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategorySliderComponent, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  allProducts: product[] = [];
  constructor(
    private cartService: CartService,
    private _Products: ProductsService,
    private token: AuthService,
    private toastr: ToastrService,
  ) {
    this.token.saveUserData();
  }
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
AddToCart(id: string) {
    this.cartService.AddToCart(id).subscribe({
      next: (response) => {
        this.toastr.success('Product added to cart', 'Success');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  ngOnInit(): void {
    this.getProducts();
    this.token.saveUserData();
  }
}
