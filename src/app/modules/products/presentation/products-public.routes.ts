import { Route } from "@angular/router";
import { PublicProductsComponent } from "./public-products/public-products.component";
import { PublicDetailProductComponent } from "./public-detail-product/public-detail-product.component";

export const PRODUCTS_PUBLIC_ROUTES: Route[] = [
    { path: '', component: PublicProductsComponent },
    { path: ':id', component: PublicDetailProductComponent }
]