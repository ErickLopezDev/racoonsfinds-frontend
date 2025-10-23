import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CategoryStateService } from '../../../../shared/services/category.service';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IProductGetQueryRquest } from '../../models/products.model';
import { ProductService } from '../../services/product.service';
import { finalize } from 'rxjs';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wishlist/services/wishlist.service';

@Component({
  selector: 'app-public-products',
  imports: [CardModule, Button, Skeleton],
  templateUrl: './public-products.component.html',
  styleUrl: './public-products.component.css'
})
export class PublicProductsComponent implements OnInit {

  private _categoryState = inject(CategoryStateService)
  category = this._categoryState.categorias;

  private _cartService = inject(CartService)
  private _wishlistService = inject(WishlistService)

  private _userStateService = inject(UserStateService)
  isAuthenticated = this._userStateService.isAuthenticated();

  private _activatedRoute = inject(ActivatedRoute);
  private _toastState = inject(ToastStateService);

  private namesearchQuery = signal<string | null>(null);
  searchName = this.namesearchQuery.asReadonly();
  private categorysearchQuery = signal<number | null>(null);
  categorySelected = this.categorysearchQuery.asReadonly();

  loadingProducts = signal<boolean>(false);

  page = signal<number>(0);
  size: number = 10
  count: number = 0;

  private _productService = inject(ProductService)
  products = signal<IProduct[]>([]);

  ngOnInit() {
    this._activatedRoute.queryParamMap.subscribe(params => {
      const name = params.get('name');
      const categoryIdStr = params.get('categoryId');
      this.namesearchQuery.set(name);
      let categoryIdNumber: number | null = null;
      if (categoryIdStr !== null && /^\d+$/.test(categoryIdStr)) {
        categoryIdNumber = Number(categoryIdStr);
      }
      this.categorysearchQuery.set(categoryIdNumber);
    });
  }

  constructor() {
    effect(() => {

      this.namesearchQuery();
      this.categorysearchQuery();
      this.page();
      this.search();

    })
  }

  showMore() {
    this.page.set(this.page() + 1);
  }

  onAgregarCarrito(product: IProduct) {
    if (this.isAuthenticated) {

      this._cartService.create({ body: { productId: product.id, amount: 1 } }).subscribe({
        next: (response) => {
          if (response.success) {
            this._toastState.setToast({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto agregado al carrito.'
            });
          }
        }
      });


    } else {
      this._toastState.setToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe iniciar sesión para agregar productos al carrito.'
      });
    }
  }

  onAgregarWishList(product: IProduct) {
    if (this.isAuthenticated) {
      this._wishlistService.create({ body: { productId: product.id } }).subscribe({
        next: (response) => {
          if (response) {
            this._toastState.setToast({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto agregado a la lista de deseos.'
            });
          }

        }
      });
    } else {
      this._toastState.setToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe iniciar sesión para agregar productos a la lista de deseos.'
      });
    }

  }

  search() {
    // Lógica para buscar productos según los valores de namesearchQuery y categorysearchQuery

    const query: IProductGetQueryRquest = {
      page: this.page(),
      size: this.size,
    };

    if (this.namesearchQuery() !== null && this.namesearchQuery() !== undefined && this.namesearchQuery() !== '') {
      query.search = this.namesearchQuery()!;
      console.log('search', this.namesearchQuery());
    }
    if (this.categorysearchQuery() !== null && this.categorysearchQuery() !== undefined && this.categorysearchQuery() !== 0) {
      query.categoryId = this.categorysearchQuery()!;
    }

    this.loadingProducts.set(true);
    this._productService.getAll({ query })
      .pipe(
        finalize(() => this.loadingProducts.set(false))
      )
      .subscribe({
        next: (response) => {
          this.products.set(response.data.content);
          this.count = response.data.totalItems;
        }
      })

  }

  selectCategory(categoryId: number) {
    this.categorysearchQuery.set(categoryId);
  }

}
