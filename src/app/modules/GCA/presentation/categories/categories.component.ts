import { Component, inject, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SaveCategoryComponent } from './dialogs/save-category/save-category.component';
import { DeleteCategoryComponent } from "./dialogs/delete-category/delete-category.component";

@Component({
  selector: 'app-categories',
  imports: [CardModule, TableModule, ButtonModule, SaveCategoryComponent, DeleteCategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  @ViewChild(SaveCategoryComponent) saveCategoryDialog!: SaveCategoryComponent;
  @ViewChild(DeleteCategoryComponent) deleteCategoryDialog!: DeleteCategoryComponent;

  private categorySrv: CategoryService = inject(CategoryService)


  categories: Category[] = []

  constructor() {
    this.setCategories();
  }

  openCreate(categoria: Category | null) {
    this.saveCategoryDialog.showDialog(categoria);
  }

  deleteCategory(categoria: Category) {
    this.deleteCategoryDialog.showDialog(categoria);
  }

  setCategories() {
    this.categorySrv.getAll().subscribe({
      next: (data) => {
        this.categories = data.filter(cat => cat.active);
      }
    });
  }

}
