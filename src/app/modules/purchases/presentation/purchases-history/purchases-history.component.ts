import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

// Interface para cada fila
interface PurchaseItem {
  name: string;
  quantity: number;
  price: number;      // valor numérico
  amount: number;     // subtotal numérico (quantity * price)
  fecha: string;   // fecha de compra
  priceText?: string; // opcional: formato con moneda para mostrar
  amountText?: string;
}

@Component({
  selector: 'app-purchases-history',
  imports: [CardModule, Breadcrumb, ButtonModule, TableModule, CommonModule],
  templateUrl: './purchases-history.component.html',
  styleUrl: './purchases-history.component.css'
})
export class PurchasesHistoryComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Historial de Compras', icon: 'pi pi-history' },
  ];


  // Datos de ejemplo (coinciden con la imagen)
  purchase: PurchaseItem[] = [
    {
      name: 'Cámara de Seguridad IP',
      quantity: 6,
      price: 129.99,
      amount: 779.94,
      priceText: 'S/129.99',
      amountText: 'S/779.94',
      fecha: '2023-06-15T14:30'
    },
    {
      name: 'Limpiaparabrisas',
      quantity: 2,
      price: 9.99,
      amount: 19.98,
      priceText: 'S/9.99',
      amountText: 'S/19.98',
      fecha: '2023-05-03T09:45'
    },
    {
      name: 'Cámara de Seguridad IP',
      quantity: 1,
      price: 129.99,
      amount: 129.99,
      priceText: 'S/129.99',
      amountText: 'S/129.99',
      fecha: '2023-04-22T16:20'
    }
  ];
}
