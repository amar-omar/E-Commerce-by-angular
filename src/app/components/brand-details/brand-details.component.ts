import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../core/interfaces/brand';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss',
})
export class BrandDetailsComponent {
  brand: Brand | null = null; // ✅ Changed to allow null
  isLoading = true;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);

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
    this._BrandsService.getBrand(id).subscribe({
      next: (res) => {
        this.brand = res.data; // Assuming the response structure is { data: Brand }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
}
