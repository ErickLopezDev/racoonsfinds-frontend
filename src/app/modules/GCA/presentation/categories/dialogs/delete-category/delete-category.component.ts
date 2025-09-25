import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Category } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-delete-category',
  imports: [Dialog, ButtonModule],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent {
  visible: boolean = false;

  id: number = 0;
  @Output() successCallback: EventEmitter<void> = new EventEmitter<void>();


  private CategoryService = inject(CategoryService)

  constructor() {

  }

  save() {

  }

  categoria: Category | null = null;

  showDialog(category: Category) {
    this.categoria = category;
    this.visible = true;
  }

  delete() {
    if (this.categoria != null) {
      this.CategoryService.delete(this.categoria.id).subscribe({
        next: (data) => {
          this.successCallback.emit();
          this.visible = false;
        }
      });
    }
  }

}
