import { Component, inject, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { UserStateService } from '../../../../services/user-state.service';
import { ICategory } from '../../../../../modules/categories/models/categories.model';
import { CategoriesService } from '../../../../../modules/categories/services/categories.service';

@Component({
  selector: 'app-header',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, Avatar, ButtonModule, Menubar, Menu, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderClientComponent {
  items: MenuItem[] | undefined;

  private user = inject(UserStateService)
  isAuthenticated = signal(this.user.isAuthenticated());

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

  private _categoryService = inject(CategoriesService);
  private categorias = signal<ICategory[]>([{
    id: 0,
    name: '',
  }]);

  ngOnInit() {

    this._categoryService.getAll().subscribe({
      next: (res) => {
        this.categorias.set(res.data);
        this.loadHeader();
      }
    })
    this.loadHeader();
  }

  goLogin() {
    this._route.navigate(['/auth']);
  }

  goRegister() {
    this._route.navigate(['/auth/register']);
  }

  loadHeader() {

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Categorias',
        icon: 'pi pi-list',
        items: this.categorias().map(cat => {
          return { label: cat.name }
        })
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
