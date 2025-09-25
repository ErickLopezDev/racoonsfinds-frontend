import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

// Services
import { SidebarService, SidebarItem } from '../../services/sidebar.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
  selector: 'app-panel-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    TooltipModule,
    AvatarModule,
    MenuModule,
  ],
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.css']
})
export class PanelLayoutComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private destroy$ = new Subject<void>();
  private UserStateService = inject(UserStateService);

  sidebarItems: SidebarItem[] = [];



  currentUser = {
    name: 'Usuario Demo',
    avatar: 'assets/images/avatar-default.png',
    role: 'Administrador'
  };

  ngOnInit() {
    // Suscribirse a los items del sidebar
    this.sidebarService.sidebarItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.sidebarItems = items;
      });

    // Escuchar cambios de ruta para actualizar estado activo
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // El routerLinkActive se encarga de esto automáticamente
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSidebarItemClick(item: SidebarItem) {
    // Navegar a la ruta - routerLinkActive se encarga del estado activo
    this.router.navigate([item.routerLink]);
  }

  onLogout() {
    // Implementar lógica de logout
    this.UserStateService.logout();
  }

  isRouteActive(routerLink: string): boolean {
    return this.router.url.startsWith(routerLink);
  }

  trackByItemId(index: number, item: SidebarItem): string {
    return item.id;
  }

  // Método para actualizar badges desde otros componentes
  updateItemBadge(itemId: string, badge?: string) {
    this.sidebarService.updateItemBadge(itemId, badge);
  }
}
