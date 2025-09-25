import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  routerLink: string;
  tooltip: string;
  badge?: string;
  isActive?: boolean;
  isVisible?: boolean;
  permission?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarItemsSubject = new BehaviorSubject<SidebarItem[]>([]);
  public sidebarItems$ = this.sidebarItemsSubject.asObservable();

  private defaultItems: SidebarItem[] = [
    {
      id: 'gbo',
      label: 'Gestión de Books',
      icon: 'pi pi-book',
      routerLink: '/GBO/books',
      tooltip: 'Gestión de Libros',
      isVisible: true
    },
    {
      id: 'dashboard',
      label: 'Gestión de Categorias',
      icon: 'pi pi-home',
      routerLink: '/GCA/category',
      tooltip: 'Panel Principal',
      isVisible: true
    },
    {
      id: 'grs',
      label: 'Gestión de Reservas',
      icon: 'pi pi-calendar',
      routerLink: '/GRS/reservation',
      tooltip: 'Gestión de Reservas',
      isVisible: true
    },
    {
      id: 'gsa',
      label: 'Gestión de Ventas',
      icon: 'pi pi-shopping-cart',
      routerLink: '/GSA/sales',
      tooltip: 'Gestión de Ventas',
      isVisible: true
    }
  ];

  constructor() {
    this.initializeItems();
  }

  private initializeItems() {
    this.sidebarItemsSubject.next([...this.defaultItems]);
  }

  getSidebarItems(): SidebarItem[] {
    return this.sidebarItemsSubject.value.filter(item => item.isVisible !== false);
  }

  updateItemBadge(itemId: string, badge?: string) {
    const items = this.sidebarItemsSubject.value;
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], badge };
      this.sidebarItemsSubject.next([...items]);
    }
  }

  setItemVisibility(itemId: string, isVisible: boolean) {
    const items = this.sidebarItemsSubject.value;
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], isVisible };
      this.sidebarItemsSubject.next([...items]);
    }
  }

  addCustomItem(item: SidebarItem) {
    const items = this.sidebarItemsSubject.value;
    const existingIndex = items.findIndex(i => i.id === item.id);

    if (existingIndex === -1) {
      items.push({ ...item, isVisible: true });
      this.sidebarItemsSubject.next([...items]);
    }
  }

  removeItem(itemId: string) {
    const items = this.sidebarItemsSubject.value;
    const filteredItems = items.filter(item => item.id !== itemId);
    this.sidebarItemsSubject.next(filteredItems);
  }

  resetToDefaults() {
    this.initializeItems();
  }
}