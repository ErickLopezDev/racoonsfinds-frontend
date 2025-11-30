import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './core/auth/pages/auth.routes';
import { PanelLayoutComponent } from './shared/layout/panel-layout/panel-layout.component';
import { AuthLayoutComponent } from './shared/layout/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from './shared/layout/client-layout/client-layout.component';
import { USER_ROUTES } from './modules/user/presentation/user.routes';
import { PRODUCTS_ROUTES } from './modules/products/presentation/products.routes';
import { WISHLIST_ROUTES } from './modules/wishlist/presentation/wishlist.routes';
import { PURCHASES_ROUTES } from './modules/purchases/presentation/purchases.routes';
import { SALES_ROUTES } from './modules/sales/presentation/sales.routes';
import { CART_ROUTES } from './modules/cart/presentation/cart.routes';
import { authGuard } from './core/auth/config/guards/auth.guard';
import { PRODUCTS_PUBLIC_ROUTES } from './modules/products/presentation/products-public.routes';
import { LandingComponent } from './modules/landing/presentation/landing/landing.component';
import { loginGuard } from './core/auth/config/guards/login.guard';
import { HelpComponent } from './modules/help/presentation/help/help.component';

export const routes: Routes = [
    { path: 'auth', component: AuthLayoutComponent, children: AUTH_ROUTES, canActivateChild: [loginGuard] },
    {
        path: '', component: ClientLayoutComponent, children: [
            {
                path: 'dash', component: PanelLayoutComponent, canActivateChild: [authGuard], children: [
                    { path: 'user', children: USER_ROUTES },
                    { path: 'products', children: PRODUCTS_ROUTES },
                    { path: 'wishlist', children: WISHLIST_ROUTES },
                    { path: 'purchases', children: PURCHASES_ROUTES },
                    { path: 'sales', children: SALES_ROUTES },
                ]
            },
            { path: 'cart', children: CART_ROUTES, canActivate: [authGuard] },
            { path: 'products', children: PRODUCTS_PUBLIC_ROUTES },
            { path: 'help', component: HelpComponent },
            { path: '', component: LandingComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
