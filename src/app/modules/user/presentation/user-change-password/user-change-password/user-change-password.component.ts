import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Breadcrumb } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastStateService } from '../../../../../shared/services/toast.service';
import { AuthService } from '../../../../../core/auth/config/services/auth.service';
import { UserStateService } from '../../../../../shared/services/user-state.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-change-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Breadcrumb,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.css'
})
export class UserChangePasswordComponent {

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _toastService = inject(ToastStateService);
  private readonly _userStateService = inject(UserStateService);

  items: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash/user' },
    { label: 'Cambiar contraseña' },
  ];

  form: FormGroup;
  sendingCode = false;
  resetting = false;
  codeSent = signal<boolean>(false);
  email = signal<string | null>(null);

  countdown = signal<number>(0);
  private countdownInterval: any;

  constructor() {
    this.form = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    effect(() => {
      const perfil = this._userStateService.userPerfil();
      if (perfil?.email) {
        this.email.set(perfil.email);
      }
    });
  }

  sendCode() {
    const emailValue = this.email();
    if (!emailValue || this.sendingCode || this.countdown() > 0) {
      this._toastService.setToast({ severity: 'warn', summary: 'Atención', detail: 'No se encontró el correo del usuario.' });
      return;
    }

    this.sendingCode = true;
    this._authService.forgotPassword({ email: emailValue }).pipe(
      finalize(() => this.sendingCode = false)
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this.codeSent.set(true);
          this.startCountdown();
          this._toastService.setToast({ severity: 'success', summary: 'Enviado', detail: 'Código enviado al correo.' });
        } else {
          this._toastService.setToast({ severity: 'error', summary: 'Error', detail: res.message || 'No se pudo enviar el código.' });
        }
      },
      error: () => {
        this._toastService.setToast({ severity: 'error', summary: 'Error', detail: 'No se pudo enviar el código.' });
      }
    });
  }

  changePassword() {
    if (this.form.invalid || this.resetting) {
      this.form.markAllAsTouched();
      return;
    }
    const confirmControl = this.form.get('confirmPassword');
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      confirmControl?.setErrors({ mismatch: true });
      return;
    } else {
      confirmControl?.setErrors(null);
    }

    const body = {
      code: this.form.value.code,
      newPassword: this.form.value.newPassword,
    };

    this.resetting = true;
    this._authService.resetPassword(body).pipe(
      finalize(() => this.resetting = false)
    ).subscribe({
      next: (res) => {
        if (res.success) {
          this._toastService.setToast({ severity: 'success', summary: 'Listo', detail: 'Contraseña actualizada.' });
          this.form.get('code')?.reset();
          this.form.get('newPassword')?.reset();
          this.form.get('confirmPassword')?.reset();
          this.codeSent.set(false);
        } else {
          this._toastService.setToast({ severity: 'error', summary: 'Error', detail: res.message || 'No se pudo cambiar la contraseña.' });
        }
      },
      error: () => {
        this._toastService.setToast({ severity: 'error', summary: 'Error', detail: 'No se pudo cambiar la contraseña.' });
      }
    });
  }

  private startCountdown() {
    this.countdown.set(60);
    this.clearCountdown();
    this.countdownInterval = setInterval(() => {
      const next = this.countdown() - 1;
      this.countdown.set(next);
      if (next <= 0) {
        this.clearCountdown();
      }
    }, 1000);
  }

  private clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  ngOnDestroy() {
    this.clearCountdown();
  }
}
