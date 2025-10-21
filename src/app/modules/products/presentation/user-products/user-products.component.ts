import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Card } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { DialogComponent } from '@components/dialog/dialog.component';
import { Router } from '@angular/router';
import { IProduct } from '../../models/products.model';
import { ICategory } from '../../../categories/models/categories.model';
import { ProductService } from '../../services/product.service';
import { CategoriesService } from '../../../categories/services/categories.service';

@Component({
  selector: 'app-user-products',
  imports: [PaginatorModule, Breadcrumb, Card, IftaLabelModule, InputTextModule, Select, Button, DialogComponent],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent {

  // Services
  private _categoryService: CategoriesService = inject(CategoriesService);
  private _productService = inject(ProductService);
  private _Route = inject(Router);


  // Variables
  products = signal<IProduct[]>([])
  categories = signal<ICategory[]>([]);
  first: number = 0;
  items: MenuItem[] = [
    { label: 'Publicaciones', icon: 'pi pi-bookmark' },
  ];
  rows: number = 12;
  selectedCity: any | undefined;

  ngOnInit() {
    this._categoryService.getAll().subscribe({
      next: (categories) => {
        if (categories.success) {
          this.categories.set(categories.data);
        }
      }
    });

    this._productService

  }

  onVender() {
    this._Route.navigate(['/dash/products/sell']);
  }

  onUpdateProduct() {

  }

  openDeleteDialog() {

  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
