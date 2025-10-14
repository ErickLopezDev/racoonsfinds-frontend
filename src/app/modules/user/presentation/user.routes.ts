import { Route } from "@angular/router";
import { UserHomeComponent } from "./user-home/user-home.component";
import { UserEditComponent } from "./user-edit/user-edit.component";

export const USER_ROUTES: Route[] = [
    { path: '', component: UserHomeComponent },
    { path: 'edit', component: UserEditComponent },
]