import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
   allProducts: product[] = [];
   constructor(
     private _Products: ProductsService,
   ) {
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
