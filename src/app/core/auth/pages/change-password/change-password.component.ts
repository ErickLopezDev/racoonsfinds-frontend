import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../config/services/auth.service';
import { ToastStateService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-change-password',
  imports: [FloatLabelModule, InputIconModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, PasswordModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _toast = inject(ToastStateService);
  private readonly _route = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  token = '';

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  ngOnInit(): void {
    this.token = this._route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this._toast.setToast({
        severity: 'warn',
        summary: 'Enlace inválido',
        detail: 'Falta el token de recuperación en el enlace',
        life: 3500
      });
    }
  }

  onSubmit(): void {

    if (!this.form.valid) {
      return;
    }

    const { password, repeatPassword } = this.form.value;
    if (password !== repeatPassword) {
      this._toast.setToast({
        severity: 'warn',
        summary: 'Contraseñas distintas',
        detail: 'Asegúrate de que ambas contraseñas coincidan',
        life: 3000
      });
      return;
    }

    this._authService.changePassword({ newPassword: password }, this.token).subscribe({
      next: (res) => {
        if (res.success) {
          this._toast.setToast({
            severity: 'success',
            summary: 'Contraseña actualizada',
            detail: 'Ya puedes iniciar sesión con tu nueva contraseña',
            life: 3500
          });
          this._router.navigate(['/auth']);
        }
      }
    });
  }

}
