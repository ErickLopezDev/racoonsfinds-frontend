import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IPurcharse } from '../../../purchases/models/purchases.model';
import { PurchasesService } from '../../../purchases/services/purchases.service';

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
  private readonly _purchaseService = inject(PurchasesService);
  expandedRows: { [key: number]: boolean } = {};

  sales: IPurcharse[] = [];

  constructor() {
    this.loadSales();
  }


  loadSales() {
    this._purchaseService.getMysales().subscribe({
      next: (response) => {
        this.sales = response.data;
      }
    });
  }

  onRowExpand(_event: TableRowExpandEvent) {}

  onRowCollapse(_event: TableRowCollapseEvent) {}

  expandAll() {
    this.expandedRows = this.visibleSales.reduce(
      (acc, s) => {
        acc[s.id] = true;
        return acc;
      },
      {} as { [key: number]: boolean }
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }

  visibleCount = 3;
  get visibleSales(): IPurcharse[] {
    return this.sales.slice(0, this.visibleCount);
  }

  showMore() {
    const next = this.visibleCount + 3;
    this.visibleCount = Math.min(next, this.sales.length);
  }
}
