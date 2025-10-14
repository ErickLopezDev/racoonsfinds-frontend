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
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: '/dash/user',
      tooltip: 'Inicio',
      isVisible: true
    },
    {
      id: 'dashboard',
      label: 'Publicaciones',
      icon: 'pi pi-bookmark',
      routerLink: '/dash/products',
      tooltip: 'Publicaciones',
      isVisible: true
    },
    {
      id: 'grs',
      label: 'Mis ventas',
      icon: 'pi pi-shop',
      routerLink: '/dash/sales',
      tooltip: 'Mis ventas',
      isVisible: true
    },
    {
      id: 'gsa',
      label: 'Historial',
      icon: 'pi pi-history',
      routerLink: '/dash/purchases',
      tooltip: 'Historial',
      isVisible: true
    },
    {
      id: 'gsa',
      label: 'Deseados',
      icon: 'pi pi-star-fill',
      routerLink: '/dash/wishlist',
      tooltip: 'Deseados',
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