import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-change-password',
  imports: [FloatLabelModule, InputIconModule, IftaLabelModule, ReactiveFormsModule, ButtonModule, PasswordModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  private _fb: FormBuilder = inject(FormBuilder);


  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  onSubmit() {

    if (this.form.valid) {
      const formValue = this.form.value;

    }
  }

}
