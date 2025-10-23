import { Component, effect, inject, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { UserStateService } from '../../../../services/user-state.service';
import { ICategory } from '../../../../../modules/categories/models/categories.model';
import { CategoriesService } from '../../../../../modules/categories/services/categories.service';
import { CategoryStateService } from '../../../../services/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, Menubar, Menu, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderClientComponent {
  items: MenuItem[] | undefined;

  private _formBuilder = inject(FormBuilder);


  private _userState = inject(UserStateService)
  isAuthenticated = this._userState.isAuthenticated;
  user = this._userState.userPerfil;

  itemsAvatar: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash/user' },
    { label: 'Publicaciones', icon: 'pi pi-bookmark', routerLink: '/dash/products' },
    { label: 'Mis ventas', icon: 'pi pi-shop', routerLink: '/dash/sales' },
    { label: 'Historial', icon: 'pi pi-history', routerLink: '/dash/purchases' },
    { label: 'Deseados', icon: 'pi pi-star-fill', routerLink: '/dash/wishlist' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => { this._userState.logout() } }
  ]
  private _route = inject(Router);

  form: FormGroup = this._formBuilder.group({
    search: ['', [Validators.required]]
  })

  goCart() {
    this._route.navigate(['/cart']);
  }

  private _categoryService = inject(CategoryStateService);
  categorias = this._categoryService.categorias;

  ngOnInit() {
    this.loadHeader();
    this._userState.setPerfil();
  }

  constructor() {
    effect(() => {
      this.categorias();
      this.loadHeader();
    })
  }

  goLogin() {
    this._route.navigate(['/auth']);
  }

  goRegister() {
    this._route.navigate(['/auth/register']);
  }

  search() {
    if (this.form.valid) {
      const searchValue = this.form.get('search')?.value;
      this._route.navigate(['/products'], { queryParams: { name: searchValue } });
    }
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
          return { label: cat.name, routerLink: '/products', queryParams: { categoryId: cat.id } }
        }),
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
