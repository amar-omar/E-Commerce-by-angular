import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../core/interfaces/product';
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
        // console.log(res.data);
        
        this.allBrands = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getBrands();
  }
}
