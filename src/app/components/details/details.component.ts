import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
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
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  ngOnInit(): void {
    let id: string | null = '';

    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        id = response.get('id');
      },
    });

    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res.data;
      },
    });
  }
}
