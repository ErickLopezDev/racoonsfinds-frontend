import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MenuItem } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { ICart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { IPurchaseCreateFromCartDto } from '../../../purchases/models/purchases.model';
import { PurchasesService } from '../../../purchases/services/purchases.service';

@Component({
  selector: 'app-cart',
  imports: [
    Card,
    Breadcrumb,
    InputNumber,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    MessageModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  breadCrumb: MenuItem[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart' },
  ];
  private readonly _purchaseService = inject(PurchasesService);
  private readonly _cartService = inject(CartService);
  private readonly _toastService = inject(ToastStateService);

  items: ICart[] = [];
  checkoutDialogVisible = false;
  checkoutForm: FormGroup;
  purchasing = false;

  constructor(private readonly _fb: FormBuilder) {
    this.checkoutForm = this._fb.group({
      contactName: ['', [Validators.required, Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      region: ['', [Validators.required, Validators.maxLength(120)]],
      district: ['', [Validators.required, Validators.maxLength(120)]],
      province: ['', [Validators.required, Validators.maxLength(120)]],
      reference: ['', [Validators.required, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/), Validators.minLength(9), Validators.maxLength(9)]],
    });
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
    if (!this.items.length) return;
    this.checkoutForm.reset();
    this.checkoutDialogVisible = true;
  }

  onLoadingCart: boolean = false;

  onSumarCarrito(cart: ICart) {
    this.onLoadingCart = true;
    this._cartService.create({ body: { productId: cart.productId, amount: 1 } })
      .pipe(
        finalize(() => this.onLoadingCart = false)
      )
      .subscribe({
        next: (data) => {
          if (!data.success) {
            this._toastService.setToast({
              severity: 'error',
              summary: 'Error',
              detail: data.message || 'Error al actualizar el carrito'
            })
            return;
          }
          this._toastService.setToast({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Carrito actualizado correctamente'
          })
          cart.amount = cart.amount + 1;
        }
      });
  }
  onRestarCarrito(cart: ICart) {
    this.onLoadingCart = true;
    this._cartService.create({ body: { productId: cart.productId, amount: -1 } })
      .pipe(
        finalize(() => this.onLoadingCart = false)
      )
      .subscribe({
        next: (data) => {
          if (!data.success) {
            this._toastService.setToast({
              severity: 'error',
              summary: 'Error',
              detail: data.message || 'Error al actualizar el carrito'
            })
            return;
          }
          this._toastService.setToast({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Carrito actualizado correctamente'
          })
          cart.amount = cart.amount - 1 <= 0 ? 1 : cart.amount - 1;
        }
      });


  }

  submitPurchase() {
    if (this.checkoutForm.invalid || this.purchasing) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const payload = this.checkoutForm.value as IPurchaseCreateFromCartDto;
    this.purchasing = true;
    this._purchaseService.purchase(payload).pipe(
      finalize(() => this.purchasing = false)
    ).subscribe({
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
        this.checkoutDialogVisible = false;
        this._toastService.setToast({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Compra realizada correctamente'
        })
      },
      error: () => {
        this._toastService.setToast({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo completar la compra'
        })
      }
    });
  }

  closeCheckoutDialog() {
    this.checkoutDialogVisible = false;
    this.checkoutForm.reset();
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
