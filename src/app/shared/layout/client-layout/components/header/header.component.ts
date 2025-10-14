import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { UserStateService } from '../../../../services/user-state.service';

@Component({
  selector: 'app-header',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, Avatar, ButtonModule, Menubar, Menu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderClientComponent {
  items: MenuItem[] | undefined;

  private user = inject(UserStateService)

  itemsAvatar: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash/user' },
    { label: 'Publicaciones', icon: 'pi pi-bookmark', routerLink: '/dash/products' },
    { label: 'Mis ventas', icon: 'pi pi-shop', routerLink: '/dash/sales' },
    { label: 'Historial', icon: 'pi pi-history', routerLink: '/dash/purchases' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => { this.user.logout() } }
  ]
  private _route = inject(Router);

  goCart() {
    this._route.navigate(['/cart']);
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Vender',
        icon: 'pi pi-bookmark',
        routerLink: '/dash/products/sell'
      },
      {
        label: 'Deseados',
        icon: 'pi pi-star-fill',
        routerLink: '/dash/wishlist'
      },
      {
        label: 'Ayuda',
        icon: 'pi pi-question-circle'
      }
    ]
  }
}
