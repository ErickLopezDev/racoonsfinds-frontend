import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb, BreadCrumbStyle } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { IProduct } from '../../../products/models/products.model';

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

  products = signal<IProduct[]>([
    {
      id: 1,
      name: 'Laptop HP Pavilion',
      stock: 10,
      image: 'laptop.jpg',
      price: 899.99,
      description: 'Laptop HP Pavilion con procesador Intel Core i5, 8GB RAM, 512GB SSD',
      createdDate: '2023-08-15T10:30:00',
      eliminado: false,
      categoryId: 1,
      categoryName: 'Electrónicos',
      userId: 101,
      userName: 'TechStore',
      imageUrl: 'https://picsum.photos/id/1/300/200'
    },
    {
      id: 2,
      name: 'Smartphone Samsung Galaxy',
      stock: 25,
      image: 'smartphone.jpg',
      price: 599.99,
      description: 'Samsung Galaxy S22 con pantalla AMOLED, 128GB almacenamiento',
      createdDate: '2023-09-05T14:20:00',
      eliminado: false,
      categoryId: 1,
      categoryName: 'Electrónicos',
      userId: 102,
      userName: 'MobileWorld',
      imageUrl: 'https://picsum.photos/id/2/300/200'
    },
    {
      id: 3,
      name: 'Zapatillas Nike Air',
      stock: 50,
      image: 'zapatillas.jpg',
      price: 120.50,
      description: 'Zapatillas Nike Air Max para correr, talla 42',
      createdDate: '2023-07-22T09:15:00',
      eliminado: false,
      categoryId: 2,
      categoryName: 'Ropa y Calzado',
      userId: 101,
      userName: 'TechStore',
      imageUrl: 'https://picsum.photos/id/3/300/200'
    },
    {
      id: 4,
      name: 'Monitor LG UltraWide',
      stock: 8,
      image: 'monitor.jpg',
      price: 349.99,
      description: 'Monitor LG UltraWide 29" IPS Full HD',
      createdDate: '2023-10-01T16:45:00',
      eliminado: false,
      categoryId: 1,
      categoryName: 'Electrónicos',
      userId: 103,
      userName: 'ComputerDeals',
      imageUrl: 'https://picsum.photos/id/4/300/200'
    },
    {
      id: 5,
      name: 'Libro Clean Code',
      stock: 30,
      image: 'libro.jpg',
      price: 35.99,
      description: 'Clean Code: A Handbook of Agile Software Craftsmanship por Robert C. Martin',
      createdDate: '2023-06-10T11:20:00',
      eliminado: false,
      categoryId: 3,
      categoryName: 'Libros',
      userId: 104,
      userName: 'BookHaven',
      imageUrl: 'https://picsum.photos/id/5/300/200'
    },
  ]);

  onAgregarCarrito() {

  }

}
