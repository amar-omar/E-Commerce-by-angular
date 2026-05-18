import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand, product } from '../../core/interfaces/product';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  allBrands: Brand[] = [];
  constructor(private _Brands: BrandsService) {}
  getBrands = () => {
    this._Brands.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getBrands();
    // this.token.saveUserData();
  }
}
