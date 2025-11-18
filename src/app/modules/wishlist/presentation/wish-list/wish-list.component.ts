import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb} from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { CartService } from '../../../cart/services/cart.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { IWishlist } from '../../models/wishlist.model';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  imports: [Breadcrumb, Card, Button],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Lista de Deseados', icon: 'pi pi-star-fill' },
  ];
  private readonly _cartService = inject(CartService)
  private readonly _toastState = inject(ToastStateService);
  private readonly _wishlistService = inject(WishlistService)

  products = signal<IWishlist[]>([]);

  loadWIshList() {
    this._wishlistService.getAll().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.products.set(response.data);
        }
      }
    });

  }

  constructor() {
    this.loadWIshList();
  }

  deleteWishList(product: IWishlist) {
    this._wishlistService.delete({ body: { productId: product.productId } }).subscribe({
      next: (response) => {
        if (response.success) {
          this._toastState.setToast({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto eliminado de la lista de deseados.'
          });
          this.loadWIshList();
        }
      }
    });
  }

  onAgregarCarrito(product: IWishlist) {

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


  }

}
