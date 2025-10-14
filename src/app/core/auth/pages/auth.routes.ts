import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthAccountComponent } from "./auth-account/auth-account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SendCodeComponent } from "./send-code/send-code.component";

export const AUTH_ROUTES: Route[] = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth-account', component: AuthAccountComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'recover', component: SendCodeComponent }
]