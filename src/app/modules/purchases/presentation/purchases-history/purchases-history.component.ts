import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { IPurcharse } from '../../models/purchases.model';
import { PurchasesService } from '../../services/purchases.service';

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

  private readonly _purchasesServices = inject(PurchasesService)

  expandedRows: { [key: number]: boolean } = {};

  purchases: IPurcharse[] = [];

  visibleCount = 3;
  get visiblePurchases(): IPurcharse[] {
    return this.purchases.slice(0, this.visibleCount);
  }
  constructor() {
    this.setPurchases();
  }


  setPurchases() {
    this._purchasesServices.getMyPurchases().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.purchases = response.data;
        }
      }
    });
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

  onRowExpand(_event: TableRowExpandEvent) { }
  onRowCollapse(_event: TableRowCollapseEvent) { }

  showMore() {
    const next = this.visibleCount + 3;
    this.visibleCount = next > this.purchases.length ? this.purchases.length : next;
  }
}

