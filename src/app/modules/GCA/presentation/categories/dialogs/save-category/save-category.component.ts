import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CategoryPostReq } from '../../../../models/category.model';
import { CategoryService } from '../../../../services/category.service';
import { ToastStateService } from '../../../../../../shared/services/toast.service';

@Component({
  selector: 'app-save-category',
  imports: [Dialog, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './save-category.component.html',
  styleUrl: './save-category.component.css'
})
export class SaveCategoryComponent {

  @Output() successCallback: EventEmitter<void> = new EventEmitter<void>();

  visible: boolean = false;

  form!: FormGroup

  private CategoryService = inject(CategoryService);
  private ToastService = inject(ToastStateService);
  private _fb = inject(FormBuilder);

  constructor() {

    this.form = this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

  }

  save() {

    if (this.form.valid) {

      if (this.categoria == null) {

        const req: CategoryPostReq = {
          name: this.form.value.name,
          description: this.form.value.description,
          active: true
        }

        this.CategoryService.create(req).subscribe({
          next: (data) => {
            this.visible = false;
            this.successCallback.emit();
            this.ToastService.setToast({ severity: 'success', summary: 'Categoria creada', detail: 'La categoria ha sido creada exitosamente.', life: 3000 });
            this.form.reset();
          }
        });

      } else {

        const req: CategoryPostReq = {
          name: this.form.value.name,
          description: this.form.value.description,
          active: true
        }

        this.CategoryService.update(this.categoria.id, req).subscribe({
          next: (data) => {
            this.visible = false;
            this.successCallback.emit();
            this.ToastService.setToast({ severity: 'success', summary: 'Categoria actualizada', detail: 'La categoria ha sido actualizada exitosamente.', life: 3000 });
            this.form.reset();
          }
        });

      }

    }

  }

  categoria: Category | null = null;
  showDialog(categoria: Category | null = null) {
    this.visible = true;
    this.form.reset();
    this.categoria = categoria;
    if (categoria != null) {
      this.form.patchValue({
        name: categoria.name,
        description: categoria.description
      });
    }

  }

}
