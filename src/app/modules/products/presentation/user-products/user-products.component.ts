import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
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
import { IProduct, IProductGetQueryRquest } from '../../models/products.model';
import { ICategory } from '../../../categories/models/categories.model';
import { ProductService } from '../../services/product.service';
import { CategoriesService } from '../../../categories/services/categories.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { ReviewProductsComponent } from "../review-products/review-products/review-products.component";
import { UserStateService } from '../../../../shared/services/user-state.service';

@Component({
  selector: 'app-user-products',
  imports: [
    PaginatorModule,
    Breadcrumb,
    Card,
    IftaLabelModule,
    InputTextModule,
    Select,
    Button,
    DialogComponent,
    ReactiveFormsModule,
    ReviewProductsComponent
  ],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css',
})
export class UserProductsComponent implements OnInit {
  @ViewChild(DialogComponent) dialog!: DialogComponent;

  // Services
  private readonly _categoryService: CategoriesService = inject(CategoriesService);
  private readonly _productService = inject(ProductService);
  private readonly _Route = inject(Router);
  private readonly _toastService = inject(ToastStateService);
  private readonly _formBuilder = inject(FormBuilder);

  // Variables
  products = signal<IProduct[]>([]);
  categories = signal<ICategory[]>([]);
  first: number = 0;
  items: MenuItem[] = [{ label: 'Publicaciones', icon: 'pi pi-bookmark' }];
  rows: number = 12;
  selectedProduct = signal<IProduct | null>(null);
  showReviews = signal<boolean>(false);

  private readonly _userStateService = inject(UserStateService);
  isAuthenticated = this._userStateService.isAuthenticated;

  form: FormGroup = this._formBuilder.group({
    categoryId: [null, [Validators.required]],
    search: [null, [Validators.minLength(3), Validators.required]],
  });

  ngOnInit() {
    this._categoryService.getAll().subscribe({
      next: (categories) => {
        if (categories.success) {
          this.categories.set(categories.data);
        }
      },
    });

    this.getProducts();
  }

  getProducts() {
    const query: IProductGetQueryRquest = {
      page: 0,
      size: 12,
    };

    if (this.form.controls['categoryId'].valid) {
      query.categoryId = this.form.controls['categoryId'].value;
    }
    if (this.form.controls['search'].valid) {
      query.search = this.form.controls['search'].value;
    }
    this._productService.getByUser({ query }).subscribe({
      next: (products) => {
        if (products.success) {
          if (products.data.content.length == 0) {
            this._toastService.setToast({
              severity: 'info',
              summary: 'Información',
              detail:
                'No se encontraron productos con los criterios especificados.',
              life: 6000,
            });
          } else {
            this.products.set(
              products.data.content.filter((p) => !p.eliminado)
            );
          }
        }
      },
    });
  }

  onVender() {
    this._Route.navigate(['/dash/products/sell']);
  }

  closeReviews() {
    this.showReviews.set(false);
  }

    openReviews(product: IProduct) {
    this.selectedProduct.set(product);
    this.showReviews.set(true);
  }

  onUpdateProduct(id: number) {
    this._Route.navigate([`/dash/products/sell/${id}`]);
  }

  openDeleteDialog(product: IProduct) {
    this.dialog.openDialog({
      title: 'Eliminar Producto',
      message: `¿Estás seguro de que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`,
      textAcceptButton: 'Eliminar',
      textCancelButton: 'Cancelar',
      onAccept: () => {
        this._productService.delete({ param: { id: product.id } }).subscribe({
          next: (response) => {
            if (response.success) {
              this.getProducts();
              this._toastService.setToast({
                severity: 'success',
                summary: 'Éxito',
                detail: `Producto ${product.name} eliminado correctamente.`,
                life: 6000,
              });
            }
          },
        });
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
