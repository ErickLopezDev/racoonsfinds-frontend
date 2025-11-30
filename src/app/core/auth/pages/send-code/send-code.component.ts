import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../config/services/auth.service';
import { ToastStateService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-send-code',
  imports: [FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly AuthService: AuthService = inject(AuthService);
  private readonly toast: ToastStateService = inject(ToastStateService);

  form!: FormGroup;
  enviado = false;

  constructor() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.AuthService.forgotPassword(this.form.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.enviado = true;
            this.toast.setToast({
              severity: 'success',
              summary: 'Revisa tu correo',
              detail: 'Te enviamos un enlace para restablecer tu contraseña',
              life: 4000
            });
            this.form.disable();
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
