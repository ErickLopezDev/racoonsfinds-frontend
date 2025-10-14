import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../config/services/auth.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ILoginReq, IRegisterReq } from '../../config/services/auth.model';
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
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
    })
  }

  onSubmit() {

    if (this.form.valid) {
      const formValue = this.form.value;

      const req: IRegisterReq = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        birthDate: formValue.birthdate.toISOString().split('T')[0]
      }

      this.AuthService.register(req).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.setToast({ severity: 'success', summary: 'Registro exitoso', detail: 'Por favor, verifica tu correo para activar tu cuenta.', life: 3000 });
            this.router.navigate(['/auth']);
          }
        }
      });
    }
  }
}
