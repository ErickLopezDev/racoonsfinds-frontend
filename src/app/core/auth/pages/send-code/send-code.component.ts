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
import { UserStateService } from '../../../../shared/services/user-state.service';
import { InputOtp } from 'primeng/inputotp';
import { IVerifyReq } from '../../config/services/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-code',
  imports: [FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, InputOtp],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly AuthService: AuthService = inject(AuthService);
  private readonly toast: ToastStateService = inject(ToastStateService);
  private readonly userStateService: UserStateService = inject(UserStateService);
  private readonly router = inject(Router);

  form!: FormGroup;
  codeForm!: FormGroup;

  enviado: boolean = false;

  // Variables para el contador
  countdown = 0;
  isCountdownActive = false;
  private countdownInterval: any;

  constructor() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    })

    this.codeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    })
  }

  sendCode() {
    this.enviado = true;
    if (!this.isCountdownActive) {
      this.startCountdown();
      this.AuthService.resendCode(this.form.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.setToast({ severity: 'success', summary: 'Exito', detail: 'Codigo reenviado', life: 3000 });
          }
        }
      });
    }
  }

  private startCountdown() {
    this.countdown = 60;
    this.isCountdownActive = true;

    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.isCountdownActive = false;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }


  onSubmit() {
    this.enviado = !this.enviado;
    if (this.form.valid) {
      const formValue = this.form.value;

      const body: IVerifyReq = {
        email: formValue.email,
        code: this.codeForm.value.code
      };

      this.AuthService.verify(body).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.setToast({ severity: 'success', summary: 'Exito', detail: 'Codigo verificado', life: 3000 });
            this.router.navigate(['/auth']);
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.codeForm.markAllAsTouched();
    }


  };
}


