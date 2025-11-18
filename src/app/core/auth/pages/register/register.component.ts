import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../config/services/auth.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { Router, RouterLink } from '@angular/router';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { IRegisterReq } from '../../config/services/auth.model';
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
export class RegisterComponent implements OnInit {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly AuthService: AuthService = inject(AuthService);
  private readonly toast: ToastStateService = inject(ToastStateService);
  private readonly router: Router = inject(Router)
  private readonly userStateService: UserStateService = inject(UserStateService);

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      username: ['', [Validators.required, Validators.maxLength(45)]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(45)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(70)]],
    })
  }

  ngOnInit(): void {
    this.form.get('birthdate')?.valueChanges.subscribe(date => {
      this.validDate(18, date);
    });
  }

  protected validDate(minAge: number, date: string, maxAge: number = 0): void {

    if (date == '' || date == null) {
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

    if (maxAge > 0) {
      if (selectedDate > minAgeDate || selectedDate < maxAgeDate) {
        this.form.get('birthdate')?.setErrors({ invalid: true });
        return;
      }
    } else {
      if (selectedDate > minAgeDate) {
        this.form.get('birthdate')?.setErrors({ invalid: true });
        return;
      }
    }
    this.form.get('birthdate')?.setErrors(null);
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
            this.toast.setToast({ severity: 'success', summary: 'Registro exitoso', detail: 'Se te ha enviado un correo con la clave de activación.', life: 10000 });
            this.router.navigate(['/auth/auth-account'], { queryParams: { email: formValue.email } });
          }
        }
      });
    }
  }
}
