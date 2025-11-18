import { inject, Injectable, signal } from '@angular/core';
import { ICategory } from '../../modules/categories/models/categories.model';
import { CategoriesService } from '../../modules/categories/services/categories.service';


@Injectable()
export class CategoryStateService {
  private readonly _categoryService = inject(CategoriesService);

  private readonly _categorias = signal<ICategory[]>([{
    id: 0,
    name: '',
  }]);
  categorias = this._categorias.asReadonly();

  constructor() {
    this.setCategories();
  }

  setCategories() {
    this._categoryService.getAll().subscribe({
      next: (res) => {
        this._categorias.set(res.data);
      }
    })
  }


}
