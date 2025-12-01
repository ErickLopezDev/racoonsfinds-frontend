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
import { ReviewProductsComponent } from '../review-products/review-products/review-products.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-public-products',
  imports: [CardModule, Button, Skeleton, ReviewProductsComponent, PaginatorModule],
  templateUrl: './public-products.component.html',
  styleUrl: './public-products.component.css',
})
export class PublicProductsComponent implements OnInit {
  private readonly _categoryState = inject(CategoryStateService);
  category = this._categoryState.categorias;

  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);

  private readonly _userStateService = inject(UserStateService);
  isAuthenticated = this._userStateService.isAuthenticated;

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _toastState = inject(ToastStateService);

  private readonly namesearchQuery = signal<string | null>(null);
  searchName = this.namesearchQuery.asReadonly();
  private readonly categorysearchQuery = signal<number | null>(null);
  categorySelected = this.categorysearchQuery.asReadonly();

  loadingProducts = signal<boolean>(false);

  page = signal<number>(0);
  size: number = 10;
  count: number = 0;
  get totalPages(): number {
    return this.count > 0 ? Math.ceil(this.count / this.size) : 1;
  }

  get showingCount(): number {
    return Math.min((this.page() + 1) * this.size, this.count);
  }

  get startCount(): number {
    if (this.count === 0) return 0;
    return this.page() * this.size + 1;
  }

  get totalRecordsForPager(): number {
    return this.count > 0 ? this.count : this.size;
  }

  private readonly _productService = inject(ProductService);
  products = signal<IProduct[]>([]);
  selectedProduct = signal<IProduct | null>(null);
  showReviews = signal<boolean>(false);

  ngOnInit() {
    this._activatedRoute.queryParamMap.subscribe((params) => {
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
    });
  }

  onPageChange(event: PaginatorState) {
    this.page.set(event.page ?? 0);
  }

  onAgregarCarrito(product: IProduct) {
    if (this.isAuthenticated()) {
      this._cartService
        .create({ body: { productId: product.id, amount: 1 } })
        .subscribe({
          next: (response) => {
            if (response.success) {
              this._toastState.setToast({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto agregado al carrito.',
              });
            }
          },
        });
    } else {
      this._toastState.setToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Debe iniciar sesión para agregar productos al carrito.',
      });
    }
  }

  onAgregarWishList(product: IProduct) {
    if (this.isAuthenticated()) {
      this._wishlistService
        .create({ body: { productId: product.id } })
        .subscribe({
          next: (response) => {
            if (response) {
              this._toastState.setToast({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto agregado a la lista de deseos.',
              });
            }
          },
        });
    } else {
      this._toastState.setToast({
        severity: 'warn',
        summary: 'Advertencia',
        detail:
          'Debe iniciar sesión para agregar productos a la lista de deseos.',
      });
    }
  }

  search() {

    const query: IProductGetQueryRquest = {
      page: this.page(),
      size: this.size,
    };

    if (
      this.namesearchQuery() !== null &&
      this.namesearchQuery() !== undefined &&
      this.namesearchQuery() !== ''
    ) {
      query.search = this.namesearchQuery()!;
      console.log('search', this.namesearchQuery());
    }
    if (
      this.categorysearchQuery() !== null &&
      this.categorysearchQuery() !== undefined &&
      this.categorysearchQuery() !== 0
    ) {
      query.categoryId = this.categorysearchQuery()!;
    }

    this.loadingProducts.set(true);
    this._productService
      .getAll({ query })
      .pipe(finalize(() => this.loadingProducts.set(false)))
      .subscribe({
        next: (response) => {
          const visibleProducts = response.data.content.filter(
            (p) => !p.eliminado
          );

          this.products.set(visibleProducts);

          const eliminatedOnPage =
            response.data.content.length - visibleProducts.length;
          const totalFromApi = response.data.totalItems ?? visibleProducts.length;
          this.count = Math.max(totalFromApi - eliminatedOnPage, visibleProducts.length);
        },
      });
  }

  selectCategory(categoryId: number) {
    this.categorysearchQuery.set(categoryId);
  }

  openReviews(product: IProduct) {
    this.selectedProduct.set(product);
    this.showReviews.set(true);
  }

  closeReviews() {
    this.showReviews.set(false);
  }
}
