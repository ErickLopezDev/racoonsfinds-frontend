import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Card } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { DialogComponent } from '@components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-products',
  imports: [PaginatorModule, Breadcrumb, Card, IftaLabelModule, InputTextModule, Select, Button, DialogComponent],
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent {

  private _Route = inject(Router);

  first: number = 0;
  items: MenuItem[] = [
    { label: 'Publicaciones', icon: 'pi pi-bookmark' },
  ];

  rows: number = 12;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  onVender() {
    this._Route.navigate(['/dash/products/sell']);
  }

  onUpdateProduct() {

  }

  openDeleteDialog() {

  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }
}
