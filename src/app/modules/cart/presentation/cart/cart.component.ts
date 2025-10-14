import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-cart',
  imports: [Card, Breadcrumb, InputNumber, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Carrito', icon: 'pi pi-shopping-cart' },
  ];

  onDelete() {

  }

}
