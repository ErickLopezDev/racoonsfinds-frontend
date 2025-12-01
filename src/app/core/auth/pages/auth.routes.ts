import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthAccountComponent } from "./auth-account/auth-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SendCodeComponent } from "./send-code/send-code.component";
import { loginGuard } from "../config/guards/login.guard";

export const AUTH_ROUTES: Route[] = [
    { path: '', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [loginGuard] },
    { path: 'auth-account', component: AuthAccountComponent, canActivate: [loginGuard] },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'recover', component: SendCodeComponent, canActivate: [loginGuard] }
]