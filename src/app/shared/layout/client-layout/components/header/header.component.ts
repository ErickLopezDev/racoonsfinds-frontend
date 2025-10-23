import { Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { UserStateService } from '../../../../services/user-state.service';
import { CategoryStateService } from '../../../../services/category.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationStateService } from '../../../../services/notification-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    Menubar,
    Menu,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderClientComponent {
  items: MenuItem[] = [];
  notificationsMenuItems: MenuItem[] = [];

  private _formBuilder = inject(FormBuilder);
  private _notifcationState = inject(NotificationStateService);
  private _userState = inject(UserStateService);
  private _route = inject(Router);
  private _categoryService = inject(CategoryStateService);

  notifications = this._notifcationState.notifications;
  isAuthenticated = this._userState.isAuthenticated;
  user = this._userState.userPerfil;
  categorias = this._categoryService.categorias;

  itemsAvatar: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash/user' },
    {
      label: 'Publicaciones',
      icon: 'pi pi-bookmark',
      routerLink: '/dash/products',
    },
    { label: 'Mis ventas', icon: 'pi pi-shop', routerLink: '/dash/sales' },
    {
      label: 'Historial',
      icon: 'pi pi-history',
      routerLink: '/dash/purchases',
    },
    {
      label: 'Deseados',
      icon: 'pi pi-star-fill',
      routerLink: '/dash/wishlist',
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this._userState.logout(),
    },
  ];

  form: FormGroup = this._formBuilder.group({
    search: ['', [Validators.required]],
  });

  constructor() {
    // Efecto reactivo con signals
    effect(() => {
      this.categorias();
      this.loadHeader();
      this.buildNotificationMenu();
    });

    // Inicializar notificaciones
    this._notifcationState.setNotifications();
  }

  ngOnInit() {
    this.loadHeader();
    this._userState.setPerfil();
  }

  search() {
    if (this.form.valid) {
      const searchValue = this.form.get('search')?.value;
      this._route.navigate(['/products'], {
        queryParams: { name: searchValue },
      });
    }
  }

  goLogin() {
    this._route.navigate(['/auth']);
  }

  goRegister() {
    this._route.navigate(['/auth/register']);
  }

  goCart() {
    this._route.navigate(['/cart']);
  }

  loadHeader() {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      {
        label: 'Categorias',
        icon: 'pi pi-list',
        items: this.categorias().map((cat) => ({
          label: cat.name,
          routerLink: '/products',
          queryParams: { categoryId: cat.id },
        })),
      },
      {
        label: 'Vender',
        icon: 'pi pi-bookmark',
        routerLink: '/dash/products/sell',
      },
      {
        label: 'Deseados',
        icon: 'pi pi-star-fill',
        routerLink: '/dash/wishlist',
      },
      { label: 'Ayuda', icon: 'pi pi-question-circle' },
    ];
  }

  buildNotificationMenu() {
    this.notificationsMenuItems = this.notifications().map((notif: any) => ({
      label: notif.title || notif.message,
      icon: notif.icon || 'pi pi-info-circle',
      command: notif.command,
    }));
  }
}
