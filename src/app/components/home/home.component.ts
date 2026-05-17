import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { product } from '../../core/interfaces/product';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  allProducts: product[] = [];
  constructor(
    private _Products: ProductsService,
    private token: AuthService,
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
  ngOnInit(): void {
    this.getProducts();
    // this.token.saveUserData();
  }
}
