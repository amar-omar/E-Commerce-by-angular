import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  allCategories: Category[] = [];
  constructor(private _Categories: CategoriesService) {}
  getCategories = () => {
    this._Categories.getCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        
        this.allCategories = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getCategories();
  }
}
