import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../config/services/auth.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ILoginReq } from '../../config/services/auth.model';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-register',
  imports: [CardModule, FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, PasswordModule, RouterLink, DatePicker],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  private AuthService: AuthService = inject(AuthService);
  private toast: ToastStateService = inject(ToastStateService);
  private router: Router = inject(Router)
  private userStateService: UserStateService = inject(UserStateService);

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      username: ['admin', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      password: ['admin123', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['admin123', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {

    if (this.form.valid) {
      const formValue = this.form.value;

      const req: ILoginReq = {
        email: formValue.username,
        password: formValue.password
      }

      this.AuthService.login(req).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken);
          this.userStateService.setToken(response.accessToken);
          this.toast.setToast({ severity: 'success', summary: 'Exito', detail: 'Has ingresado', life: 3000 });
          this.router.navigate(['/GBO/books']);
        },

      });
    }
  }
}
