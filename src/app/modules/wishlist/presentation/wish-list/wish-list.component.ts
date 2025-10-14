import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb, BreadCrumbStyle } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-wish-list',
  imports: [Breadcrumb, Card, Button],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  breadCrumb: MenuItem[] = [
    { label: 'Lista de Deseados', icon: 'pi pi-star-fill' },
  ];

  onAgregarCarrito() { 
    
  }

}
