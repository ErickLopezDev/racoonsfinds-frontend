import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './core/auth/pages/auth.routes';
import { PanelLayoutComponent } from './shared/layout/panel-layout/panel-layout.component';
import { GBO_ROUTES } from './modules/GBO/presentation/gbo.routes';
import { GRS_ROUTES } from './modules/GRS/presentation/grs.routes';
import { GSA_ROUTES } from './modules/GSA/presentation/sales.routes';
import { GUS_ROUTES } from './modules/GUS/presentation/gus.routes';
import { GCA_ROUTES } from './modules/GCA/presentation/gca.routes';

export const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'auth' },
{ path: 'auth', children: AUTH_ROUTES },
{
    path: '', component: PanelLayoutComponent, children: [
        { path: 'GBO', children: GBO_ROUTES },
        { path: 'GRS', children: GRS_ROUTES },
        { path: 'GCA', children: GCA_ROUTES },
        { path: 'GSA', children: GSA_ROUTES },
        { path: 'GUS', children: GUS_ROUTES }
    ]
}];
