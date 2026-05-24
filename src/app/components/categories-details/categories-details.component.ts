import { Category } from './../../core/interfaces/product';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { categories } from '../../core/interfaces/categories';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.scss'
})
export class CategoriesDetailsComponent {
  Category: categories | null = null; // ✅ Changed to allow null
  isLoading = true;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(CategoriesService);

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getBrandDetails(id);
        }
      },
    });
  }

  getBrandDetails(id: string): void {
    this.isLoading = true;
    this._BrandsService.getCategory(id).subscribe({
      next: (res) => {
        this.Category = res.data; // Assuming the response structure is { data: Brand }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
