import { Component, inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-account',
  imports: [FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, InputOtp],
  templateUrl: './auth-account.component.html',
  styleUrl: './auth-account.component.css'
})
export class AuthAccountComponent implements OnInit {

  private _fb: FormBuilder = inject(FormBuilder);
  private AuthService: AuthService = inject(AuthService);
  private toast: ToastStateService = inject(ToastStateService);
  private userStateService: UserStateService = inject(UserStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  correo: string = '';
  codeForm!: FormGroup;

  enviado: boolean = false;

  // Variables para el contador
  countdown = 0;
  isCountdownActive = false;
  private countdownInterval: any;

  constructor() {
    this.codeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    })
  }

  sendCode() {
    this.enviado = true;
    if (!this.isCountdownActive && this.correo != '') {
      this.startCountdown();
      this.AuthService.resendCode({ email: this.correo }).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.setToast({ severity: 'success', summary: 'Exito', detail: 'Codigo reenviado', life: 3000 });
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.correo = params['email'] || '';
    });
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
    if (this.correo != '' && this.codeForm.valid) {
      const body: IVerifyReq = {
        email: this.correo,
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
      this.codeForm.markAllAsTouched();
    }


  };
}

