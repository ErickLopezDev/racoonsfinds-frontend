import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

interface SalesDetails {
  id: number;
  productId: number;
  productName: string;
  monto: number;
  amount: number;
}

interface Sales {
  id: number;
  date: string;
  monto: number;
  description: string;
  userId: number;
  details: SalesDetails[];
}


@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule, Breadcrumb, CardModule, TableModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Mis Ventas', icon: 'pi pi-shop' },
  ];

  expandedRows: { [key: number]: boolean } = {};

  sales: Sales[] = [
    {
      id: 1,
      date: '2025-10-21',
      monto: 129.99 * 2 + 9.99 * 1,
      description: 'Compra de accesorios de seguridad',
      userId: 101,
      details: [
        { id: 1, productId: 10, productName: 'Cámara de Seguridad IP', monto: 129.99, amount: 2 },
        { id: 2, productId: 11, productName: 'Limpiaparabrisas', monto: 9.99, amount: 1 },
      ],
    },
    {
      id: 2,
      date: '2025-10-18',
      monto: 59.99,
      description: 'Compra de foco LED',
      userId: 101,
      details: [
        { id: 3, productId: 12, productName: 'Foco LED', monto: 59.99, amount: 1 },
      ],
    },
  ];

  constructor(private messageService: MessageService) {}

  onRowExpand(event: TableRowExpandEvent) {
    const sale = event.data as Sales;
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    const sale = event.data as Sales;
  }

  expandAll() {
    this.expandedRows = this.visibleSales.reduce((acc, s) => ((acc[s.id] = true), acc), {} as { [key: number]: boolean });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  visibleCount = 3;
  get visibleSales(): Sales[] {
    return this.sales.slice(0, this.visibleCount);
  }

  showMore() {
    const next = this.visibleCount + 3;
    this.visibleCount = next > this.sales.length ? this.sales.length : next;
  }
}
