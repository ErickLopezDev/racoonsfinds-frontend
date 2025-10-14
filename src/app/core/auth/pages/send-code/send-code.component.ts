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

@Component({
  selector: 'app-send-code',
  imports: [FloatLabelModule, InputIconModule, IconFieldModule, InputTextModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, InputOtp],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent {

  private _fb: FormBuilder = inject(FormBuilder);
  private AuthService: AuthService = inject(AuthService);
  private toast: ToastStateService = inject(ToastStateService);
  private userStateService: UserStateService = inject(UserStateService);

  form!: FormGroup;
  codeForm!: FormGroup;

  enviado: boolean = false;

  // Variables para el contador
  countdown = 0;
  isCountdownActive = false;
  private countdownInterval: any;

  constructor() {
    this.form = this._fb.group({
      email: ['admin@admin.com', [Validators.required, Validators.email]],
    })

    this.codeForm = this._fb.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    })
  }

  sendCode() {
    this.enviado = true;
    if (!this.isCountdownActive) {
      console.log('Reenviando código...');
      this.startCountdown();
      // Aquí va tu lógica de reenvío
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


    };
  }
}


