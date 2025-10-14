import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

// Interface para cada fila
interface SaleItem {
  name: string;
  quantity: number;
  price: number;      // valor numérico
  amount: number;     // subtotal numérico (quantity * price)
  priceText?: string; // opcional: formato con moneda para mostrar
  amountText?: string;
}

@Component({
  selector: 'app-sales-history',
  imports: [Breadcrumb, CardModule, TableModule, Button],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Mis Ventas', icon: 'pi pi-shop' },
  ];



  // Datos de ejemplo (coinciden con la imagen)
  sales: SaleItem[] = [
    {
      name: 'Cámara de Seguridad IP',
      quantity: 6,
      price: 129.99,
      amount: 779.94,
      priceText: 'S/129.99',
      amountText: 'S/779.94'
    },
    {
      name: 'Limpiaparabrisas',
      quantity: 2,
      price: 9.99,
      amount: 19.98,
      priceText: 'S/9.99',
      amountText: 'S/19.98'
    },
    {
      name: 'Cámara de Seguridad IP',
      quantity: 1,
      price: 129.99,
      amount: 129.99,
      priceText: 'S/129.99',
      amountText: 'S/129.99'
    }
  ];
}
