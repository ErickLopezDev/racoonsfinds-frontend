import { Component, inject, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICart } from '../../models/cart.model';
import { CART_API_ROUTES } from '../../services/cart-api.routing';
import { CartService } from '../../services/cart.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { DialogComponent } from "@components/dialog/dialog.component";
import { PurchasesService } from '../../../purchases/services/purchases.service';

@Component({
  selector: 'app-cart',
  imports: [Card, Breadcrumb, InputNumber, ButtonModule, FormsModule, CommonModule, DialogComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  @ViewChild(DialogComponent) dialogComponent!: DialogComponent;

  breadCrumb: MenuItem[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart' },
  ];
  private _purchaseService = inject(PurchasesService);
  private _cartService = inject(CartService);
  items: ICart[] = [];
  private _toastService = inject(ToastStateService);

  constructor() {
    this.getCart();
  }

  getCart() {
    this._cartService.getAll().subscribe({
      next: (data) => {
        if (!data.success) {
          this._toastService.setToast({
            severity: 'error',
            summary: 'Error',
            detail: data.message || 'Error al obtener el carrito'
          })
          return;
        }
        this.items = data.data;
      }
    });
  }

  buy() {
    this.dialogComponent.openDialog({
      tipo: 'success',
      title: 'Confirmar compra',
      message: '¿Estás seguro de que deseas realizar la compra de los productos en el carrito?',
      textAcceptButton: 'Sí, comprar',
      textCancelButton: 'No, cancelar',
      onAccept: () => {
        this._purchaseService.purchase().subscribe({
          next: (data) => {
            if (!data.success) {
              this._toastService.setToast({
                severity: 'error',
                summary: 'Error',
                detail: data.message || 'Error al realizar la compra'
              })
              return;
            }
            this.items = [];
            this._toastService.setToast({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Compra realizada correctamente'
            })
          }
        });

      }
    })
  }

  onDelete(item: ICart) {
    this._cartService.deleteById({ param: { id: item.productId } }).subscribe({
      next: (data) => {
        if (!data.success) {
          this._toastService.setToast({
            severity: 'error',
            summary: 'Error',
            detail: data.message || 'Error al eliminar el producto del carrito'
          })
          return;
        }
        this.items = this.items.filter(it => it.productId !== item.productId);

        this._toastService.setToast({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado del carrito correctamente'
        })
      }
    });

  }

  onDeleteAll() {
    this._cartService.deleteAll().subscribe({
      next: (data) => {
        if (!data.success) {
          this._toastService.setToast({
            severity: 'error',
            summary: 'Error',
            detail: data.message || 'Error al vaciar el carrito'
          })
          return;
        }
        this.items = [];
        this._toastService.setToast({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Carrito vaciado correctamente'
        })
      }
    });
  }

  get total(): number {
    return this.items.reduce((acc, it) => acc + it.productPrice * it.amount, 0);
  }
}
