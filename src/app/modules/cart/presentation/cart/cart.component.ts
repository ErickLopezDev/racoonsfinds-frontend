import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICart } from '../../models/cart.model';
import { PRODUCT_API_ROUTES } from '../../services/cart-api.routing';

@Component({
  selector: 'app-cart',
  imports: [Card, Breadcrumb, InputNumber, ButtonModule, FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart' },
  ];

  items: ICart[] = [
    {
      id: 1,
      userId: 100,
      productId: 501,
      productName: 'Zapatillas Urban Runner',
      productImage: 'assets/image-not-found.svg',
      productPrice: 159.9,
      amount: 1,
    },
    {
      id: 2,
      userId: 100,
      productId: 502,
      productName: 'Mochila Travel Pro',
      productImage: 'assets/image-not-found.svg',
      productPrice: 89.5,
      amount: 2,
    },
    {
      id: 3,
      userId: 100,
      productId: 503,
      productName: 'Gorra Classic Fit',
      productImage: 'assets/image-not-found.svg',
      productPrice: 39.99,
      amount: 1,
    },
  ];

  onDelete(item: ICart) {
    const url = PRODUCT_API_ROUTES.deleteById.replace('{id}', String(item.id));
    console.log('DELETE', url, { productId: item.productId });
    this.items = this.items.filter(i => i.id !== item.id);
  }

  onDeleteAll() {
    const url = PRODUCT_API_ROUTES.deleteAll;
    console.log('DELETE', url);
    this.items = [];
  }

  get total(): number {
    return this.items.reduce((acc, it) => acc + it.productPrice * it.amount, 0);
  }
}
