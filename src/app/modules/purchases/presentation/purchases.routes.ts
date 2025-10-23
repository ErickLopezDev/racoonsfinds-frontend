import { Route } from "@angular/router";

export const PURCHASES_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./purchases-history/purchases-history.component').then(m => m.PurchasesHistoryComponent)
    }
]
