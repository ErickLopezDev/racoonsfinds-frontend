import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

interface PurchaseDetail {
  id: number;
  productId: number;
  productName: string;
  monto: number; 
  amount: number; 
}

interface Purchase {
  id: number;
  date: string; 
  monto: number;
  description: string;
  userId: number;
  details: PurchaseDetail[];
}

@Component({
  selector: 'app-purchases-history',
  standalone: true,
  imports: [CardModule, Breadcrumb, ButtonModule, TableModule, CommonModule],
  templateUrl: './purchases-history.component.html',
  styleUrl: './purchases-history.component.css'
})
export class PurchasesHistoryComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Historial de Compras', icon: 'pi pi-history' },
  ];

  expandedRows: { [key: number]: boolean } = {};

  purchases: Purchase[] = [
    {
      id: 201,
      date: '2025-10-21',
      monto: 129.99 * 2 + 9.99 * 1,
      description: 'Compra de accesorios de seguridad',
      userId: 301,
      details: [
        { id: 1, productId: 10, productName: 'Cámara de Seguridad IP', monto: 129.99, amount: 2 },
        { id: 2, productId: 11, productName: 'Limpiaparabrisas', monto: 9.99, amount: 1 },
      ],
    },
    {
      id: 202,
      date: '2025-10-18',
      monto: 59.99,
      description: 'Compra de foco LED',
      userId: 301,
      details: [
        { id: 3, productId: 12, productName: 'Foco LED', monto: 59.99, amount: 1 },
      ],
    },
    {
      id: 203,
      date: '2025-10-10',
      monto: 89.97,
      description: 'Compra de cables HDMI',
      userId: 301,
      details: [
        { id: 4, productId: 13, productName: 'Cable HDMI 4K', monto: 29.99, amount: 3 },
      ],
    },
    {
      id: 204,
      date: '2025-10-05',
      monto: 249.5,
      description: 'Compra de router WiFi 6',
      userId: 301,
      details: [
        { id: 5, productId: 14, productName: 'Router WiFi 6', monto: 249.5, amount: 1 },
      ],
    },
    {
      id: 205,
      date: '2025-09-28',
      monto: 75,
      description: 'Compra de memorias USB',
      userId: 301,
      details: [
        { id: 6, productId: 15, productName: 'Memoria USB 32GB', monto: 15, amount: 5 },
      ],
    },
    {
      id: 206,
      date: '2025-09-20',
      monto: 310,
      description: 'Compra de disco SSD',
      userId: 301,
      details: [
        { id: 7, productId: 16, productName: 'SSD 1TB NVMe', monto: 310, amount: 1 },
      ],
    },
  ];

  visibleCount = 3;
  get visiblePurchases(): Purchase[] {
    return this.purchases.slice(0, this.visibleCount);
  }

  expandAll() {
    this.expandedRows = this.visiblePurchases.reduce((acc, p) => {
      acc[p.id] = true;
      return acc;
    }, {} as { [key: number]: boolean });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(_event: TableRowExpandEvent) {}
  onRowCollapse(_event: TableRowCollapseEvent) {}

  showMore() {
    const next = this.visibleCount + 3;
    this.visibleCount = next > this.purchases.length ? this.purchases.length : next;
  }
}

