import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../config/services/auth.service';
import { ILoginReq } from '../../config/services/auth.model';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../../../shared/services/user-state.service';


@Component({
  selector: 'app-login',
  imports: [CardModule, FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, PasswordModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private _fb: FormBuilder = inject(FormBuilder);
  private AuthService: AuthService = inject(AuthService);
  private toast: ToastStateService = inject(ToastStateService);
  private router: Router = inject(Router)
  private userStateService: UserStateService = inject(UserStateService);

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {

    if (this.form.valid) {
      const formValue = this.form.value;

      const req: ILoginReq = {
        email: formValue.correo,
        password: formValue.password
      }

      this.AuthService.login(req).subscribe({
        next: (response) => {
          if (response.success) {
            this.userStateService.setToken(response.data.accessToken);
            this.userStateService.setUser(response.data.userId);
            this.toast.setToast({ severity: 'success', summary: 'Exito', detail: 'Has ingresado', life: 3000 });
            this.router.navigate(['/dash/user']);
          } else {
            this.toast.setToast({ severity: 'warn', summary: 'Error', detail: response.message, life: 3000 });
          }
        }

      });
    }
  }

}
