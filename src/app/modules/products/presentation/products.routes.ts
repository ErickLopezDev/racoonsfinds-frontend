import { Route } from "@angular/router";
import { SellComponent } from "./sell/sell.component";
import { UserProductsComponent } from "./user-products/user-products.component";

export const PRODUCTS_ROUTES: Route[] = [
    { path: 'sell', component: SellComponent },
    { path: 'sell/:id', component: SellComponent },
    { path: '', component: UserProductsComponent }
]